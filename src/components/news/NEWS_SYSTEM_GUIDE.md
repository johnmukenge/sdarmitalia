# 📰 NEWS SYSTEM - Guida Completa

## 🎯 Panoramica

Il sistema di notizie è stato completamente refactorizzato per offrire un'esperienza utente ottimizzata e professionale.

### Componenti

```
src/components/news/
├── News.jsx              ← Pagina lista con filtri e ricerca
├── NewsDetails.jsx       ← Dettaglio singola notizia
├── NewsCard.jsx          ← Componente riusabile card
└── NewsSlider.jsx        ← Carousel per homepage

src/data/
└── notizie.js            ← Dati locali (fallback)
```

---

## 📋 Struttura Dati Notizia

```javascript
{
  id: 1,
  title: "Titolo della notizia",              // Titolo principale
  sottoTitolo: "Sottotitolo",                 // Sottotitolo (opzionale)
  description: "Breve descrizione",           // Per card/lista (max 200 car)
  content: "Contenuto completo...",           // Per pagina dettaglio
  category: "Leadership",                     // Categoria (per filtri)
  image: imageImport,                         // Immagine della notizia
  publishedAt: new Date().toISOString(),      // Data pubblicazione
  autore: "Team media",                       // Autore
  views: 156,                                 // Numero visualizzazioni
}
```

### Categorie Disponibili

- `Leadership` - Notizie di leadership
- `Eventi` - Annunci e dettagli eventi
- `Musica` - Concerti e eventi musicali
- `Spiritualità` - Contenuti spirituali
- (Aggiungere altre secondo necessità)

---

## 📖 Come Usare i Componenti

### 1. Mostra News nella Homepage

**In `Body.jsx` o dove vuoi il carousel:**

```jsx
import NewsSlider from "../news/NewsSlider";

function Body() {
  return (
    <div>
      {/* ... altri contenuti ... */}

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Ultime Notizie</h2>
          <NewsSlider limit={6} />
        </div>
      </section>
    </div>
  );
}
```

**Props di NewsSlider:**

- `limit` (number, default: 5) - Numero di notizie da visualizzare

### 2. Pagina News Completa

Già configurata in `App.jsx`:

```jsx
<Route path="/news" element={<News />} />
```

Funzionalità:

- ✅ Ricerca per titolo/descrizione
- ✅ Filtri per categoria
- ✅ Ordinamento (recente, anziana, visualizzazioni)
- ✅ Griglia responsive
- ✅ Card con "Leggi di più"

### 3. Dettaglio Singola Notizia

Già configurata in `App.jsx`:

```jsx
<Route path="/news/:id" element={<NewsDetails />} />
```

Funzionalità:

- ✅ Visualizzazione completa del contenuto
- ✅ Metadata professionali (data, autore, visualizzazioni)
- ✅ Categoria badge
- ✅ Notizie correlate (stessa categoria)
- ✅ Bottone condividi
- ✅ Navigazione back

### 4. NewsCard Standalone

Se vuoi usare la card singolarmente:

```jsx
import NewsCard from "../news/NewsCard";

function MyComponent() {
  const news = { id: 1, title: "..." /* ... */ };

  return <NewsCard newsItem={news} onClick={(id) => navigate(`/news/${id}`)} />;
}
```

---

## 🎨 Styling & Responsive Design

Tutti i componenti usano Tailwind CSS e sono:

- ✅ Mobile-first responsive
- ✅ Colori coerenti (blu, bianco, nero)
- ✅ Hover effects professionali
- ✅ Transizioni smooth

### Breakpoints usati

```css
sm: 640px   /* Tablet piccolo */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop */
xl: 1280px  /* Desktop grande */
```

---

## 🔄 Flusso di Dati

### Caricamento da API

```
API Backend (/api/v1/news)
    ↓
NewsSlider / News.jsx
    ↓
NewsCard (visualizzazione)
    ↓
Navigate a /news/:id
    ↓
NewsDetails (dettaglio)
```

### Fallback Locale

Se l'API non è disponibile, i componenti usano il file locale `notizie.js`:

```
notizie.js (local data)
    ↓
NewsSlider / News.jsx
    ↓
(stesso flusso)
```

---

## 🔍 Filtri e Ricerca (News.jsx)

### Filtri Disponibili

1. **Ricerca Testo**

   - Titolo
   - Descrizione

2. **Filtro Categoria**

   - Dinamico (estrae dalle notizie)
   - Con conteggio notizie

3. **Ordinamento**
   - Più Recente (default)
   - Meno Recente
   - Più Visualizzazioni

### Uso dei Filtri

```jsx
// Search
setSearchTerm("parola chiave");

// Category Filter
setSelectedCategory("Leadership");

// Sort
setSortBy("visualizzazioni");

// Reset
setSearchTerm("");
setSelectedCategory("");
```

---

## 📱 Features Speciali

### NewsSlider (Homepage)

- 🔄 **Auto-play**: Cambia slide ogni 5 secondi
- ⏸️ **Pausa su hover**: Si ferma al passaggio del mouse
- ◀️➡️ **Controlli**: Prev/Next buttons
- 🔘 **Indicators**: Puntini per saltare a uno slide
- 📊 **Counter**: Mostra slide attuale/totale

### News.jsx (Pagina lista)

- 📊 **Statistiche in tempo reale**
  - Totale notizie
  - Numero categorie
  - Totale visualizzazioni
- 🎯 **Filtri intelligenti**
  - Conteggio dinamico
  - Reset rapido
- 📋 **Griglia responsive**
  - 1 colonna (mobile)
  - 2 colonne (tablet)
  - 3 colonne (desktop)

### NewsDetails (Dettaglio)

- 🖼️ **Hero image** responsive
- 📍 **Metadata completo**
  - Data
  - Autore
  - Visualizzazioni
  - Categoria
- 🔗 **Notizie correlate**
  - Stesso category
  - Max 3 suggerimenti
- 📤 **Share button**
  - Web Share API (mobile-friendly)

---

## 🛠️ Integrazione con Backend

### API Endpoint

```
GET /api/v1/news
GET /api/v1/news/:id
```

### Struttura Risposta API

```json
{
  "status": "success",
  "data": {
    "news": [
      {
        "_id": "507f1f77bcf86cd799439011",
        "title": "...",
        "description": "...",
        "content": "...",
        "category": "Leadership",
        "image": "https://...",
        "publishedAt": "2025-01-12T...",
        "autore": "Team media",
        "views": 156,
        "createdAt": "...",
        "updatedAt": "..."
      }
    ]
  }
}
```

### Come aggiungere notizie via API

Nel backend, POST a `/api/v1/news`:

```json
{
  "title": "Titolo",
  "description": "Descrizione breve",
  "content": "Contenuto completo",
  "category": "Leadership",
  "image": "url_immagine",
  "autore": "Autore"
}
```

---

## 🐛 Troubleshooting

### News non appaiono

1. **Check API**:

   ```bash
   curl http://localhost:5000/api/v1/news
   ```

2. **Check Browser Console**: Errori di caricamento?

3. **Fallback Locale**: Se API down, usa `notizie.js`

4. **MongoDB**: Verifica che il database ha documenti nella collection `news`

### Images non caricate

1. **Check URL**: L'URL immagine è valido?
2. **CORS**: Se immagini esterne, server CORS abilitato?
3. **File System**: Se immagini locali, copiate in `public/images/`?

### Filtri non funzionano

1. **Category mancante**: Verifica che notizie hanno `category` field
2. **API response**: Controlla che API ritorna il field `category`
3. **Browser console**: Cerca errori JavaScript

---

## 📈 Performance Tips

1. **Lazy Load Images**

   ```jsx
   <img loading="lazy" src={image} alt={title} />
   ```

2. **Limit News Items**

   ```jsx
   <NewsSlider limit={5} /> // 5 items solo
   ```

3. **Paginate List**

   ```jsx
   const [page, setPage] = useState(1);
   const itemsPerPage = 12;
   ```

4. **Optimize Images**
   - Resize images a max 800x600px
   - Compress con tools come TinyPNG
   - Usa WebP format se possibile

---

## 🎓 Esempi Pratici

### Aggiungere una nuova categoria

1. **Nel file `notizie.js`**, aggiungi:

   ```javascript
   category: "NuovaCategoria";
   ```

2. **Filter automaticamente appare** in News.jsx

### Cambiare colori della card

Edit `NewsCard.jsx`:

```jsx
// Sostituisci il blu
className = "bg-gradient-to-r from-blue-600 to-blue-700";

// Con il tuo colore
className = "bg-gradient-to-r from-purple-600 to-purple-700";
```

### Disabilitare auto-play nel slider

Edit `NewsSlider.jsx`:

```javascript
// Cambia da:
const [autoPlay, setAutoPlay] = useState(true);

// A:
const [autoPlay, setAutoPlay] = useState(false);
```

---

## 📝 Changelog

### v2.0 (Current)

- ✅ Refactored news system with categories
- ✅ Added NewsCard component
- ✅ Added NewsSlider for homepage
- ✅ Improved NewsDetails with related news
- ✅ Professional UI/UX updates
- ✅ API integration with local fallback

### v1.0 (Previous)

- Basic news list and detail pages
- Simple card design
- No filters/search

---

## 🚀 Prossimi Miglioramenti

- [ ] Pagination per liste grandi
- [ ] Advanced search con tags
- [ ] Comments system
- [ ] Social media share (Twitter, Facebook)
- [ ] Newsletter subscription
- [ ] News archiving per data
- [ ] Admin panel per gestire notizie
- [ ] SEO optimization
- [ ] Multi-language support

---

**Last Updated**: January 12, 2025  
**Version**: 2.0.0
