# ⚡ Quick Start - API Integration

## 🚀 In 5 Minuti

### 1️⃣ Backend - Avvio Server (Terminale 1)

```bash
cd C:\projects\personal\sdarmitalia-server

# Avvia il server
npm start

# Output atteso:
# ✓ MongoDB connesso
# ✓ Server su http://localhost:5000
```

**Verifica**:

```bash
# In un'altro terminale, testa:
curl http://localhost:5000/api/v1/libri
```

---

### 2️⃣ Frontend - Avvio Dev Server (Terminale 2)

```bash
cd C:\projects\personal\sdarmitalia

# Installa dipendenze se necessario
npm install

# Avvia dev server
npm run dev

# Output atteso:
# VITE v5.x.x  ready in xxx ms
# ➜  Local:   http://localhost:5173/
```

---

### 3️⃣ Testing nel Browser

**URL**: http://localhost:5173

#### Test Biblioteca 📚

```
1. Naviga a /biblioteca
2. Attendi caricamento (should show 12 libri)
3. Testa filtri:
   - Categoria: seleziona "teologia"
   - Anno: seleziona 2024
4. Ricerca: scrivi "grande"
5. Ordinamento: prova "Rating"
6. TTS: clicca "Ascolta" su un libro
```

#### Test News 📰

```
1. Naviga a /news
2. Attendi caricamento (should show 10 notizie)
3. Testa filtri:
   - Categoria: seleziona categoria
4. Ricerca: scrivi titolo
5. Ordinamento: prova opzioni
```

---

## 🛠️ Troubleshooting Rapido

| Errore                | Soluzione                                       |
| --------------------- | ----------------------------------------------- |
| "Cannot reach server" | Backend non running → `npm start` in server dir |
| CORS error            | Verifica `cors()` in index.js                   |
| Timeout               | Backend lento → aumenta timeout in apiClient.js |
| No data               | Check MongoDB connection string in .env         |
| 404 on routes         | Verify routes are registered in index.js        |

---

## 📁 Struttura File Principale

```
sdarmitalia/
├── .env                              # Configurazione locale
├── src/
│   ├── services/
│   │   └── apiClient.js             # 🆕 Client API centralizzato
│   ├── context/
│   │   └── APIContext.jsx           # 🆕 Context provider
│   ├── hooks/
│   │   └── useFetch.js              # 🆕 Custom hooks
│   ├── components/
│   │   ├── common/
│   │   │   └── ErrorBoundary.jsx    # 🆕 UI componenti error/loading
│   │   ├── biblioteca/
│   │   │   └── Biblioteca.jsx       # ✏️ Integrato con API
│   │   └── news/
│   │       └── News.jsx             # ✏️ Integrato con API
├── API_INTEGRATION.md               # 📝 Documentazione completa
└── IMPROVEMENTS_LOG.md              # 📝 Log miglioramenti
```

---

## 🔌 API Base URL

```javascript
// Tutte le API calls partono da:
http://localhost:5000/api/v1

// Esempi:
GET  http://localhost:5000/api/v1/libri
GET  http://localhost:5000/api/v1/news
GET  http://localhost:5000/api/v1/events
```

---

## 💡 Quick Snippets

### Usare APIClient in un nuovo componente

```jsx
import { useAPI } from "../context/APIContext";

const MyComponent = () => {
  const api = useAPI();

  const loadData = async () => {
    const data = await api.getLibri({ limit: 10 });
    console.log(data);
  };

  return <button onClick={loadData}>Load</button>;
};
```

### Usare useFetch Hook

```jsx
import { useFetch } from "../hooks/useFetch";
import { useAPI } from "../context/APIContext";

const MyComponent = () => {
  const api = useAPI();
  const { data, loading, error, retry } = useFetch(() => api.getLibri(), []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay error={error} onRetry={retry} />;

  return <div>{data?.libri?.length} libri trovati</div>;
};
```

### Usare usePaginatedFetch

```jsx
const { items, page, totalPages, nextPage, prevPage } = usePaginatedFetch(
  (params) => api.getNews(params),
  1, // pagina iniziale
  10 // items per pagina
);
```

---

## ✅ Checklist Pre-Testing

- [ ] Backend `.env` configurato con MongoDB Atlas connection
- [ ] Backend running: `npm start`
- [ ] Frontend `.env` ha `VITE_API_URL=http://localhost:5000/api/v1`
- [ ] Frontend running: `npm run dev`
- [ ] Browser console open (F12) per errori
- [ ] Database seeded: `node seed.js`
- [ ] CORS abilitato nel backend

---

## 📊 Expected Data

Dopo seed, dovresti vedere:

```
📚 Libri: 12 (categoria: teologia, storia, scienze, didattica)
📰 News: 10 (categorie varie)
📅 Events: 8
👥 Contacts: 5
💝 Donations: 5
```

---

## 🎯 Prossimi Step dopo Test ✅

1. **Integrazione Events**

   ```jsx
   // In Events.jsx, aggiungi:
   import apiClient from "../../services/apiClient";
   ```

2. **Integrazione Contact Form**

   ```jsx
   // Aggiungi submit handler:
   await apiClient.sendContact(formData);
   ```

3. **Integrazione Donazioni**
   ```jsx
   // Stripe payment con API call
   await apiClient.createDonazione(paymentData);
   ```

---

## 🔗 Documentazione Completa

Per documentazione approfondita:

- 📖 **API_INTEGRATION.md** - Tutti gli endpoint
- 📖 **IMPROVEMENTS_LOG.md** - Dettagli implementazione

---

## 🆘 Support

**Console Error?**

```javascript
// Apri F12 → Console
// Copia errore completo
// Verifica:
// 1. Backend running?
// 2. Correct API URL?
// 3. MongoDB connected?
```

**Network Error?**

```bash
# Test API directly:
curl -X GET http://localhost:5000/api/v1/libri

# Should return JSON
```

---

**Buon testing!** 🚀

Data: 7 Gennaio 2026  
Version: 2.0.0
