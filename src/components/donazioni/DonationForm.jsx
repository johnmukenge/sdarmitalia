import { useState } from "react";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { Loader, AlertCircle } from "lucide-react";

const DonationForm = ({ amount, onSuccess, onCancel }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    country: "IT",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!stripe || !elements) {
      setError("Stripe non è ancora caricato. Riprova tra un momento.");
      return;
    }

    setIsProcessing(true);

    try {
      // Crea il payment intent sul backend
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: Math.round(amount * 100), // Converti in centesimi
          email: formData.email,
          name: formData.name,
        }),
      });

      const { clientSecret } = await response.json();

      if (!clientSecret) {
        throw new Error("Errore nella creazione del pagamento");
      }

      // Conferma il pagamento
      const { error: stripeError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardNumberElement),
            billing_details: {
              name: formData.name,
              email: formData.email,
            },
          },
        });

      if (stripeError) {
        setError(stripeError.message);
      } else if (paymentIntent.status === "succeeded") {
        onSuccess();
      } else {
        setError("Pagamento non completato. Riprova.");
      }
    } catch (err) {
      setError(err.message || "Si è verificato un errore. Riprova.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="border-t pt-8">
      <h3 className="text-xl font-bold text-gray-900 mb-6">
        Dettagli Pagamento
      </h3>

      {/* Amount Summary */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <p className="text-sm text-gray-600">Importo da donare</p>
        <p className="text-3xl font-bold text-blue-600">€{amount.toFixed(2)}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Nome Completo *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Mario Rossi"
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="mario@example.com"
          />
        </div>

        {/* Card Fields */}
        <div className="space-y-4">
          {/* Card Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Numero Carta *
            </label>
            <div className="bg-white border-2 border-gray-300 rounded-lg p-4 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-200 transition-all">
              <CardNumberElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#1f2937",
                      fontFamily: '"Segoe UI", Roboto, sans-serif',
                      "::placeholder": {
                        color: "#9ca3af",
                      },
                      lineHeight: "40px",
                    },
                    invalid: {
                      color: "#ef4444",
                    },
                  },
                }}
              />
            </div>
          </div>

          {/* Expiry and CVC */}
          <div className="grid grid-cols-2 gap-4">
            {/* Expiry Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Scadenza (MM/YY) *
              </label>
              <div className="bg-white border-2 border-gray-300 rounded-lg p-4 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-200 transition-all">
                <CardExpiryElement
                  options={{
                    style: {
                      base: {
                        fontSize: "16px",
                        color: "#1f2937",
                        fontFamily: '"Segoe UI", Roboto, sans-serif',
                        "::placeholder": {
                          color: "#9ca3af",
                        },
                        lineHeight: "40px",
                      },
                      invalid: {
                        color: "#ef4444",
                      },
                    },
                  }}
                />
              </div>
            </div>

            {/* CVC */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CVC *
              </label>
              <div className="bg-white border-2 border-gray-300 rounded-lg p-4 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-200 transition-all">
                <CardCvcElement
                  options={{
                    style: {
                      base: {
                        fontSize: "16px",
                        color: "#1f2937",
                        fontFamily: '"Segoe UI", Roboto, sans-serif',
                        "::placeholder": {
                          color: "#9ca3af",
                        },
                        lineHeight: "40px",
                      },
                      invalid: {
                        color: "#ef4444",
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            type="button"
            onClick={onCancel}
            disabled={isProcessing}
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors duration-200"
          >
            Annulla
          </button>
          <button
            type="submit"
            disabled={isProcessing || !stripe}
            className="flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                Elaborazione...
              </>
            ) : (
              `Dona €${amount.toFixed(2)}`
            )}
          </button>
        </div>

        {/* Security Info */}
        <p className="text-xs text-gray-500 text-center">
          🔒 Il tuo pagamento è protetto da Stripe. Non salvamo i tuoi dati
          della carta.
        </p>
      </form>
    </div>
  );
};

export default DonationForm;
