import { useState } from "react";
import { Heart, Shield, Check } from "lucide-react";
import DonationForm from "./DonationForm";

const Donazioni = () => {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState("");
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const predefinedAmounts = [10, 25, 50, 100, 250, 500];

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount("");
    setShowPaymentForm(true);
    setSuccessMessage("");
  };

  const handleCustomAmount = () => {
    const amount = parseFloat(customAmount);
    if (amount > 0) {
      setSelectedAmount(amount);
      setShowPaymentForm(true);
      setSuccessMessage("");
    }
  };

  const handlePaymentSuccess = () => {
    setSuccessMessage(
      "Grazie per la tua donazione! Il tuo contributo è stato ricevuto con successo."
    );
    setShowPaymentForm(false);
    setSelectedAmount(null);
    setCustomAmount("");
    setTimeout(() => setSuccessMessage(""), 5000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Heart className="w-12 h-12 text-red-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Fai una Donazione
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Sostieni la missione della nostra comunità
          </p>
          <p className="text-gray-500">
            Il tuo contributo ci aiuta a continuare il nostro lavoro di servizio
            e evangelizzazione
          </p>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-8 bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
            <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-green-900">{successMessage}</h3>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column - Amount Selection */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Seleziona Importo
              </h2>

              {/* Predefined Amounts */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                {predefinedAmounts.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => handleAmountSelect(amount)}
                    className={`p-4 rounded-lg font-semibold transition-all duration-200 border-2 ${
                      selectedAmount === amount
                        ? "border-blue-600 bg-blue-50 text-blue-600"
                        : "border-gray-200 bg-white text-gray-700 hover:border-blue-300"
                    }`}
                  >
                    €{amount}
                  </button>
                ))}
              </div>

              {/* Custom Amount */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Altro importo
                </label>
                <div className="flex gap-3">
                  <div className="flex-1 relative">
                    <span className="absolute left-4 top-3 text-gray-500 font-semibold">
                      €
                    </span>
                    <input
                      type="number"
                      min="0.50"
                      step="0.01"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      placeholder="Inserisci importo"
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                  <button
                    onClick={handleCustomAmount}
                    disabled={!customAmount || parseFloat(customAmount) <= 0}
                    className="px-6 py-3 bg-blue-950 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    Continua
                  </button>
                </div>
              </div>

              {/* Payment Form */}
              {showPaymentForm && selectedAmount && (
                <DonationForm
                  amount={selectedAmount}
                  onSuccess={handlePaymentSuccess}
                  onCancel={() => {
                    setShowPaymentForm(false);
                    setSelectedAmount(null);
                  }}
                />
              )}
            </div>
          </div>

          {/* Right Column - Info */}
          <div className="md:col-span-1">
            <div className="bg-blue-50 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-blue-900 mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Pagamenti Sicuri
              </h3>
              <p className="text-sm text-blue-800">
                Usiamo Stripe, il leader mondiale nella sicurezza dei pagamenti.
                I tuoi dati sono completamente protetti.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold text-gray-900 mb-4">
                Domande Frequenti
              </h3>
              <div className="space-y-4 text-sm text-gray-600">
                <div>
                  <p className="font-semibold text-gray-700 mb-1">
                    È possibile annullare una donazione?
                  </p>
                  <p>Contattaci entro 30 giorni per richiedere un rimborso.</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-700 mb-1">
                    Riceverò una ricevuta?
                  </p>
                  <p>Sì, ti invieremo una ricevuta via email.</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-700 mb-1">
                    Come vengono usate le donazioni?
                  </p>
                  <p>
                    Vengono utilizzate per sostenere le attività e il ministero
                    della chiesa.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-12 text-center text-sm text-gray-600">
          <p>
            Per domande su come donare, contattaci a{" "}
            <span className="font-semibold">
              movimentodiriforma.media@gmail.com
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Donazioni;
