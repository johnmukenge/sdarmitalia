# 🎁 Configurazione Donazioni con Stripe

## ✅ Passaggi di Configurazione

### 1. **Ottenere le chiavi Stripe**

1. Vai su [stripe.com](https://stripe.com) e crea un account
2. Nel dashboard vai a **Developers** → **API Keys**
3. Copia la chiave pubblica (`pk_test_...` o `pk_live_...`)
4. Copia la chiave segreta (`sk_test_...` o `sk_live_...`)

### 2. **Configurare le variabili di ambiente**

**Frontend (sdarmitalia)**

Crea o modifica `.env.local`:

```env
VITE_STRIPE_PUBLIC_KEY=pk_test_YOUR_KEY_HERE
VITE_API_URL=http://localhost:5000
```

**Backend (sdarmitalia-server)**

Crea o modifica `.env`:

```env
STRIPE_SECRET_KEY=sk_test_YOUR_KEY_HERE
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET
PORT=5000
```

### 3. **Installare le dipendenze**

#### Frontend

Già fatto! ✅ Hai già installato:

- `@stripe/stripe-js`
- `@stripe/react-stripe-js`

#### Backend

Nel progetto `sdarmitalia-server`:

```bash
npm install stripe express cors dotenv
```

### 4. **Implementare il backend**

Copia il contenuto da `STRIPE_BACKEND_SETUP.js` nel tuo file `server.js` o crea un nuovo file `routes/donation.js`.

Aggiungi al tuo express server:

```javascript
import stripeRoutes from "./routes/donation.js";
app.use("/", stripeRoutes);
```

### 5. **Configurare il Webhook (opzionale ma consigliato)**

1. Nel dashboard Stripe → **Developers** → **Webhooks**
2. Clicca "Add endpoint"
3. Inserisci l'URL: `https://tuoserver.com/webhook/stripe`
4. Seleziona gli eventi:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Copia il "Signing secret" e aggiungilo a `.env` come `STRIPE_WEBHOOK_SECRET`

### 6. **Testare in modalità Sandbox**

Usa queste carte di test Stripe:

| Tipo              | Numero              | CVC | Data  |
| ----------------- | ------------------- | --- | ----- |
| ✅ Successo       | 4242 4242 4242 4242 | 123 | 12/25 |
| ❌ Declinato      | 4000 0000 0000 0002 | 123 | 12/25 |
| ⚠️ Autenticazione | 4000 2500 0000 3155 | 123 | 12/25 |

### 7. **Passare a Produzione**

Quando sei pronto per accettare veri pagamenti:

1. Vai su **Settings** → **Billing** in Stripe
2. Attiva il tuo account (verifica email, indirizzo, etc.)
3. Sostituisci le chiavi di test con quelle "live":
   - `pk_live_...` nel frontend
   - `sk_live_...` nel backend
4. Aggiorna il webhook endpoint a HTTPS

## 📁 Struttura File

```
src/components/donazioni/
├── Donazioni.jsx          # Componente principale
└── DonationForm.jsx       # Form di pagamento

.env.local                 # Configurazione locale
STRIPE_BACKEND_SETUP.js    # Istruzioni backend
```

## 🔒 Sicurezza

✅ **Non salvare mai i dati della carta**

- Stripe gestisce tutto automaticamente
- Il frontend non vede mai i dati sensibili
- Usa il `clientSecret` per confermare il pagamento

## 📞 Supporto

- **Stripe Docs**: https://stripe.com/docs
- **React Stripe**: https://stripe.com/docs/stripe-js/react
- **Test Mode**: Usa le carte di test sopra

## 💡 Prossimi Passi

1. Implementa il database per tracciare le donazioni
2. Aggiungi conferma email automatica
3. Crea una dashboard per visualizzare i donatori
4. Aggiungi opzioni di donazione ricorrente (sottoscrizioni)

---

**Pronto per il rilascio!** 🚀
