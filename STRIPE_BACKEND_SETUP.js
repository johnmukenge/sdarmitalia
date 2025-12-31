// Questo file va nel backend (sdarmitalia-server)
// npm install stripe express cors dotenv

import express from "express";
import Stripe from "stripe";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.use(cors());
app.use(express.json());

// Endpoint per creare il payment intent
app.post("/api/create-payment-intent", async (req, res) => {
  try {
    const { amount, email, name } = req.body;

    if (!amount || amount < 50) {
      return res.status(400).json({ error: "Importo minimo: €0.50" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount),
      currency: "eur",
      receipt_email: email,
      metadata: {
        donor_name: name,
      },
      description: `Donazione da ${name}`,
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Errore:", error);
    res.status(500).json({ error: error.message });
  }
});

// Webhook di Stripe (opzionale ma consigliato)
app.post(
  "/webhook/stripe",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];

    try {
      const event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );

      switch (event.type) {
        case "payment_intent.succeeded":
          console.log("✅ Pagamento completato:", event.data.object.id);
          // Salva la donazione nel database
          break;
        case "payment_intent.payment_failed":
          console.log("❌ Pagamento fallito:", event.data.object.id);
          break;
      }

      res.json({ received: true });
    } catch (error) {
      console.error("Errore webhook:", error);
      res.status(400).json({ error: error.message });
    }
  }
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server in ascolto su porta ${PORT}`);
});
