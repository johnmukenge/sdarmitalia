# 🚀 Integrazione API Backend - SDA Italia

## 📋 Overview

Questo documento descrive l'integrazione completa tra il frontend React e il backend Node.js con MongoDB.

**Data**: 7 Gennaio 2026  
**Status**: ✅ Implementazione Completata

---

## 🎯 Architettura API

### Client-Centralized API Service

Il progetto utilizza un **APIClient centralizzato** per gestire tutte le comunicazioni con il backend:

```
src/
├── services/
│   └── apiClient.js       # Client API centralizzato con retry logic
├── context/
│   └── APIContext.jsx     # Context API per condivisione del client
├── hooks/
│   └── useFetch.js        # Custom hooks per fetch con loading/error
└── components/
    └── common/
        └── ErrorBoundary.jsx  # Componenti UI per error handling
```

---

## 🔌 Configurazione API

### File di Configurazione

**`.env.example`** - Template per variabili di ambiente
**`.env`** - Variabili di ambiente locali (NON commitare)

```env
# API Configuration
VITE_API_URL=http://localhost:3000/api/v1

# Feature Flags
VITE_ENABLE_TTS=true
VITE_ENABLE_DONATIONS=true
VITE_ENABLE_ANALYTICS=false

# App Configuration
VITE_APP_NAME=SDA Italia
VITE_APP_VERSION=2.0.0
```

### URL Base API

- **Sviluppo**: `http://localhost:5000/api/v1`
- **Produzione**: Configurare tramite `.env`

---

## 📡 Endpoint API Implementati

### Libri (Biblioteca)

| Metodo | Endpoint                    | Descrizione                                     |
| ------ | --------------------------- | ----------------------------------------------- |
| GET    | `/libri`                    | Recupera tutti i libri con filtri e paginazione |
| GET    | `/libri/consigliati`        | Libri in evidenza (featured + rating ≥ 4.5)     |
| GET    | `/libri/top-downloads`      | Libri più scaricati                             |
| GET    | `/libri/stats`              | Statistiche collezione                          |
| GET    | `/libri/search?q=query`     | Ricerca full-text                               |
| GET    | `/libri/category/:category` | Filtra per categoria                            |
| GET    | `/libri/:id`                | Singolo libro                                   |
| POST   | `/libri`                    | Crea nuovo libro                                |
| PATCH  | `/libri/:id`                | Aggiorna libro                                  |
| POST   | `/libri/:id/download`       | Registra download                               |
| DELETE | `/libri/:id`                | Elimina libro                                   |

### News (Notizie)

| Metodo | Endpoint    | Descrizione                 |
| ------ | ----------- | --------------------------- |
| GET    | `/news`     | Tutte le notizie con filtri |
| GET    | `/news/:id` | Singola notizia             |

### Events (Eventi)

| Metodo | Endpoint      | Descrizione      |
| ------ | ------------- | ---------------- |
| GET    | `/events`     | Tutti gli eventi |
| GET    | `/events/:id` | Singolo evento   |

### Contact (Contatti)

| Metodo | Endpoint   | Descrizione                 |
| ------ | ---------- | --------------------------- |
| GET    | `/contact` | Tutti i contatti            |
| POST   | `/contact` | Invia messaggio di contatto |

### Donazioni

| Metodo | Endpoint     | Descrizione        |
| ------ | ------------ | ------------------ |
| GET    | `/donazioni` | Tutte le donazioni |
| POST   | `/donazioni` | Crea donazione     |

---

## 🎨 Componenti UI per API Integration

### ErrorDisplay

Visualizza errori con retry button:

```jsx
<ErrorDisplay
  error={error}
  onRetry={() => retry()}
  customMessage="Messaggio personalizzato"
/>
```

### LoadingSpinner

Spinner di caricamento:

```jsx
<LoadingSpinner size="md" message="Caricamento..." />
```

### EmptyState

Stato vuoto con messaggio:

```jsx
<EmptyState
  title="Nessun elemento trovato"
  message="Prova a modificare i filtri"
  icon={SearchIcon}
  actionButton={<button>Azione</button>}
/>
```

---

## 🔄 Custom Hooks per Fetch

### useFetch

Hook per fetch semplice con loading/error:

```jsx
const { data, loading, error, retry } = useFetch(
  () => apiClient.getLibri(),
  []
);
```

### usePaginatedFetch

Hook per fetch paginato:

```jsx
const { items, page, totalPages, loading, goToPage } = usePaginatedFetch(
  (params) => apiClient.getLibri(params),
  1, // pagina iniziale
  10 // items per pagina
);
```

---

## 📦 Funzionalità APIClient

### Retry Logic

- **Tentativi**: 3 per impostazione predefinita
- **Timeout**: 30 secondi
- **Delay tra retry**: 1 secondo \* tentativo

### Gestione Errori

- Automatica conversione JSON
- Validazione status HTTP
- Messaggi di errore dettagliati

### Metodi Disponibili

```javascript
// GET requests
await apiClient.getLibri({ limit: 50, page: 1 });
await apiClient.getLibro(id);
await apiClient.searchLibri("query");

// POST requests
await apiClient.post("/endpoint", { data });

// PATCH requests
await apiClient.patch("/endpoint/:id", { data });

// DELETE requests
await apiClient.delete("/endpoint/:id");
```

---

## 🌟 Componenti Integrati

### ✅ Biblioteca.jsx

- Caricamento da API con `apiClient.getLibri()`
- Filtri per categoria e anno
- Ricerca full-text
- Ordinamento per: Recente, Rating, Scaricamenti, Titolo A-Z/Z-A
- Statistiche in tempo reale
- Text-to-Speech (TTS) integrato
- Loading state e error handling

### ✅ News.jsx

- Caricamento notizie da API
- Filtri per categoria
- Ricerca per titolo/descrizione
- Ordinamento: Recente, Meno Recente, Visualizzazioni
- Statistiche: Total news, Categories, Views
- Grid responsive layout
- Empty state handling

### 🔄 In Progress

- Events.jsx - Integrazione API eventi
- Contact.jsx - Integrazione form contatti
- Donazioni.jsx - Integrazione donazioni

---

## 📊 Dati di Seeding

Il database è pre-popolato con dati di test:

```
📚 Libri: 12 documenti
📰 News: 10 documenti
📅 Events: 8 documenti
👥 Contacts: 5 documenti
💝 Donazioni: 5 documenti
━━━━━━━━━━━━━━━━━━
Total: 40 documenti
```

Per reseedare il database:

```bash
cd sdarmitalia-server
npm install
node seed.js
```

---

## 🚀 Come Iniziare

### 1. Backend Setup

```bash
cd sdarmitalia-server

# Installa dipendenze
npm install

# Configura variabili di ambiente (.env)
# Verifica MongoDB Atlas connection string

# Avvia il server
npm start
# Server su: http://localhost:5000
```

### 2. Frontend Setup

```bash
cd sdarmitalia

# Installa dipendenze
npm install

# Configura variabili di ambiente (.env)
VITE_API_URL=http://localhost:3000/api/v1

# Avvia dev server
npm run dev
# Frontend su: http://localhost:5173 (o simile)
```

### 3. Testing

1. Naviga a `/biblioteca` - Verifica caricamento libri
2. Naviga a `/news` - Verifica caricamento notizie
3. Testa filtri, ricerca, ordinamento
4. Verifica TTS (ascolta)
5. Controlla console per errori

---

## 🛠️ Troubleshooting

### ❌ Errore: "Impossibile raggiungere il server"

**Causa**: Backend non avviato  
**Soluzione**:

```bash
cd sdarmitalia-server
npm start
```

### ❌ Errore: "MongoNetworkError"

**Causa**: Problema connessione MongoDB  
**Soluzione**: Verifica `.env` con connection string corretta

### ❌ CORS Error

**Causa**: Backend non configurato per CORS  
**Soluzione**: Verifica `index.js` backend ha `app.use(cors())`

### ❌ Timeout su fetch

**Causa**: Server risponde lentamente  
**Soluzione**: Aumenta `REQUEST_TIMEOUT` in `apiClient.js`

---

## 📈 Performance Optimizations

1. **Lazy Loading**: Componenti caricate on-demand con React.lazy()
2. **Pagination**: Limita risultati API con parametro `limit`
3. **Caching**: Dati statici cachati nei componenti
4. **Retry Logic**: Automaticamente riprova failed requests
5. **Error Boundaries**: Isola errori in componenti specifici

---

## 🔐 Sicurezza

### Implemented

- ✅ Validazione input nei form
- ✅ Sanitazione dati API
- ✅ Timeout su fetch
- ✅ Error handling senza leak info sensibili

### Future

- 🔒 Authentication JWT
- 🔒 Rate limiting
- 🔒 HTTPS in produzione
- 🔒 API key management

---

## 📝 API Response Format

Tutte le risposte seguono il formato standard:

```javascript
{
  "success": true,
  "message": "Operazione completata",
  "data": {
    "libri": [...],     // O "news", "events", ecc
    "pages": 1,
    "total": 12,
    "currentPage": 1
  }
}
```

---

## 🎓 Prossimi Passi

1. ✅ **COMPLETATO**: Integrazione Biblioteca (libri)
2. ✅ **COMPLETATO**: Integrazione News
3. ⏳ **TODO**: Integrazione Events
4. ⏳ **TODO**: Integrazione Contact Form
5. ⏳ **TODO**: Integrazione Donazioni (Stripe)
6. ⏳ **TODO**: Authentication system
7. ⏳ **TODO**: Admin dashboard

---

## 📞 Support

Per domande o problemi:

1. Controlla i console logs (F12)
2. Verifica variabili di ambiente
3. Riavvia server e frontend
4. Pulisci cache del browser

---

**Ultimo Aggiornamento**: 7 Gennaio 2026  
**Versione**: 2.0.0  
**Sviluppatore**: SDA Italia Dev Team
