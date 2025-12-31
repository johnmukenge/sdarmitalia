# 📚 SEZIONE ARTICOLI - DOCUMENTAZIONE APPROFONDITA

## 📖 Indice

1. [Architettura Componenti](#architettura-componenti)
2. [ArticleCard Component](#articlecard-component)
3. [Articles Component](#articles-component)
4. [ArticleDetail Component](#articledetail-component)
5. [Struttura Dati](#struttura-dati)
6. [Immagini Opzionali](#immagini-opzionali)
7. [Integrazioni Backend](#integrazioni-backend)
8. [Best Practices](#best-practices)
9. [Troubleshooting](#troubleshooting)

---

## 🏗️ Architettura Componenti

```
App.jsx
  ├── /articles       → Articles.jsx
  │   └── ArticleCard.jsx (map)
  │
  └── /articles/:id   → ArticleDetail.jsx
      └── Related articles
```

### Flusso Dati

```
mock data (articoli.js)
    ↓
Articles.jsx (filtri, ricerca, ordinamento)
    ↓
ArticleCard.jsx (visualizzazione teaser)
    ↓
Link → ArticleDetail.jsx (visualizzazione completa)
```

---

## 🎴 ArticleCard Component

### Descrizione

Component elegante per visualizzare un articolo in formato "card teaser". L'immagine è **opzionale** e si posiziona **dentro il panel** per un design più elegante.

### Struttura Layout

```
┌─────────────────────────────┐
│ Autore          [Q1 Badge]  │  ← Header con metadata
├─────────────────────────────┤
│  ┌───────────────────────┐  │
│  │   [Immagine]          │  │  ← Immagine (OPZIONALE)
│  │   (h-40, rounded)     │  │
│  └───────────────────────┘  │
├─────────────────────────────┤
│ Titolo Articolo             │  ← Contenuto
│                             │
│ Anteprima breve...          │
│                             │
│ 15 marzo 2024               │
├─────────────────────────────┤
│ [Leggi →]    [Scarica/⊘]    │  ← Azioni
└─────────────────────────────┘
```

### Props

```javascript
{
  article: {
    _id: string,              // ID univoco
    title: string,            // Titolo articolo
    author: string,           // Autore
    image: string | null,     // URL immagine (OPZIONALE)
    excerpt: string,          // Anteprima (max 300 car)
    publishedAt: ISO Date,    // Data pubblicazione
    year: number,             // Anno (2024, 2023, etc)
    quarter: string,          // Q1, Q2, Q3, Q4
    pdfUrl: string | null,    // URL PDF (OPZIONALE)
  }
}
```

### Features Dettagliate

#### 1. **Immagine Opzionale**

```javascript
const hasImage = article.image && typeof article.image === "string";

{
  hasImage && (
    <div className="mx-4 mt-3 rounded-lg overflow-hidden bg-gradient-to-b from-blue-50 to-blue-100 h-40">
      <img src={article.image} alt={article.title} />
    </div>
  );
}
```

- Se `article.image` è null/undefined/falsy → non viene visualizzata
- Se presente → si mostra dentro il panel con border radius
- Altezza fissa: 40 (160px in Tailwind)
- Margini: 4 a sx/dx (mx-4), 12 in alto (mt-3)

#### 2. **Badge Trimestre con Gradient**

```javascript
<div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-1 rounded-full text-xs font-bold">
  {article.quarter}
</div>
```

- Posizionato in alto a destra nell'header
- Gradient da blue-600 a blue-700
- Rounded-full per aspetto pill
- Font bold e maiuscolo

#### 3. **Button States - PDF**

```javascript
{
  article.pdfUrl && article.pdfUrl !== "#" ? (
    // Button download attivo
    <a href={article.pdfUrl} download>
      <Download size={16} />
    </a>
  ) : (
    // Button disabilitato (PDF non disponibile)
    <div title="PDF non disponibile">
      <FileText size={16} />
    </div>
  );
}
```

- Se PDF disponibile (non "#") → pulsante blu interattivo
- Se non disponibile → icona grigia disabilitata
- Tooltip per feedback

#### 4. **Hover Effects**

```javascript
group-hover:scale-105        // Immagine zoom al hover
group-hover:text-blue-600    // Titolo blu al hover
group-hover:shadow-2xl       // Shadow aumentato
hover:scale-105              // Pulsante scale
```

### Classes Tailwind Chiave

| Elemento     | Classes                                         |
| ------------ | ----------------------------------------------- |
| Container    | bg-white rounded-lg shadow-lg hover:shadow-2xl  |
| Header       | px-6 pt-4 flex items-start justify-between      |
| Immagine     | mx-4 mt-3 rounded-lg h-40 group-hover:scale-105 |
| Badge        | bg-gradient-to-r from-blue-600 to-blue-700      |
| Titolo       | text-lg font-bold group-hover:text-blue-600     |
| Button Leggi | bg-gradient-to-r from-blue-600 to-blue-700      |
| Button PDF   | bg-gray-100 border border-gray-200              |

---

## 📰 Articles Component

### Descrizione

Pagina principale per browsare, cercare e filtrare gli articoli. Implementa logica complessa di filtro real-time.

### Stato Component

```javascript
const [articles, setArticles] = useState([]);           // Tutti articoli
const [filteredArticles, setFilteredArticles] = useState([]); // Filtrati
const [loading, setLoading] = useState(true);           // Loading state
const [selectedYear, setSelectedYear] = useState("");   // Filtro anno
const [selectedQuarter, setSelectedQuarter] = useState(""): // Filtro trimestre
const [searchTerm, setSearchTerm] = useState("");        // Ricerca
```

### Logica Filtri

#### 1. **Caricamento Dati**

```javascript
useEffect(() => {
  // Backend ready: Sostituisci con axios.get()
  setArticles(articoli); // Mock data per ora
  setFilteredArticles(articoli);
  setLoading(false);
}, []);
```

#### 2. **Filtro Real-Time**

```javascript
useEffect(() => {
  let filtered = articles;

  // 1. Filtro anno
  if (selectedYear) {
    filtered = filtered.filter(
      (article) => article.year.toString() === selectedYear
    );
  }

  // 2. Filtro trimestre
  if (selectedQuarter) {
    filtered = filtered.filter(
      (article) => article.quarter === selectedQuarter
    );
  }

  // 3. Ricerca testo
  if (searchTerm) {
    const lowerSearch = searchTerm.toLowerCase();
    filtered = filtered.filter(
      (article) =>
        article.title.toLowerCase().includes(lowerSearch) ||
        article.author.toLowerCase().includes(lowerSearch) ||
        article.excerpt.toLowerCase().includes(lowerSearch)
    );
  }

  // 4. Ordinamento
  filtered.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

  setFilteredArticles(filtered);
}, [articles, selectedYear, selectedQuarter, searchTerm]);
```

**Ordine di elaborazione:**

1. Applica filtro anno
2. Applica filtro trimestre
3. Applica ricerca testo
4. Ordina per data (decrescente)

#### 3. **Reset Filtri**

```javascript
const resetFilters = () => {
  setSelectedYear("");
  setSelectedQuarter("");
  setSearchTerm("");
};

const hasActiveFilters = selectedYear || selectedQuarter || searchTerm;
```

### UI Sections

#### 1. **Header**

```javascript
<h1 className="text-4xl md:text-5xl font-bold">
  Leggi i Nostri Articoli
</h1>
<p className="text-gray-600 text-lg">
  Scopri una raccolta di articoli...
</p>
```

#### 2. **Filter Panel**

```javascript
<div className="bg-white rounded-lg shadow-md p-6">
  {/* Search input */}
  <div className="relative lg:col-span-2">
    <Search className="absolute left-3 top-3" />
    <input
      type="text"
      placeholder="Cerca per titolo o autore..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  </div>

  {/* Year filter */}
  <select
    value={selectedYear}
    onChange={(e) => setSelectedYear(e.target.value)}
  >
    <option value="">Tutti gli anni</option>
    {years.map((year) => (
      <option key={year} value={year}>
        {year}
      </option>
    ))}
  </select>

  {/* Quarter filter */}
  <select
    value={selectedQuarter}
    onChange={(e) => setSelectedQuarter(e.target.value)}
  >
    <option value="">Tutti i trimestri</option>
    {["Q1", "Q2", "Q3", "Q4"].map((q) => (
      <option key={q} value={q}>
        {q}
      </option>
    ))}
  </select>
</div>
```

#### 3. **Results Grid**

```javascript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {filteredArticles.map((article) => (
    <ArticleCard key={article._id} article={article} />
  ))}
</div>
```

**Responsive Breakpoints:**

- Mobile: 1 colonna
- Tablet (md): 2 colonne
- Desktop (lg): 3 colonne

#### 4. **Empty State**

```javascript
{
  filteredArticles.length === 0 && (
    <div className="text-center py-12">
      <p className="text-gray-600">Nessun articolo trovato...</p>
      <button onClick={resetFilters}>Azzera filtri</button>
    </div>
  );
}
```

---

## 📄 ArticleDetail Component

### Descrizione

Pagina di visualizzazione completa di un singolo articolo con sidebar articoli correlati.

### Layout

```
┌──────────────────────────────────────────┐
│         HERO SECTION (Immagine)          │
└──────────────────────────────────────────┘

┌─────────────────────────────┬─────────────┐
│                             │             │
│   [← Torna]                 │ Correlati   │
│                             │             │
│   Q1 2024                   │ ┌─────────┐ │
│   Titolo                    │ │ Art. 1  │ │
│   Autore | Data             │ └─────────┘ │
│                             │             │
│   ─────────────────────     │ ┌─────────┐ │
│                             │ │ Art. 2  │ │
│   [Anteprima]               │ └─────────┘ │
│                             │             │
│   [Contenuto completo...]   │ ┌─────────┐ │
│                             │ │ Contatti│ │
│                             │ └─────────┘ │
│                             │             │
│   [⬇ Scarica PDF]           │             │
│                             │             │
└─────────────────────────────┴─────────────┘
```

### Props (da Route Params)

```javascript
const { id } = useParams(); // ID articolo da URL

// http://localhost:5173/articles/1
//                                  ↑ id
```

### State

```javascript
const [article, setArticle] = useState(null); // Articolo dettaglio
const [relatedArticles, setRelatedArticles] = useState([]); // Articoli correlati
const [loading, setLoading] = useState(true); // Loading state
```

### Features

#### 1. **Hero Section con Immagine**

```javascript
{
  article.image && (
    <div className="relative h-96 overflow-hidden bg-gradient-to-b from-blue-600 to-blue-800">
      <img src={article.image} className="opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-transparent"></div>
    </div>
  );
}
```

#### 2. **Articoli Correlati**

Mostra articoli dello **stesso anno** (massimo 5):

```javascript
const related = articoli.filter(
  (a) => a._id !== id && a.year === foundArticle.year
);
setRelatedArticles(related);
```

#### 3. **Gestione Non Trovato**

```javascript
if (!article) {
  return (
    <div>
      <h2>Articolo non trovato</h2>
      <button onClick={() => navigate("/articles")}>Torna agli articoli</button>
    </div>
  );
}
```

#### 4. **Download PDF**

```javascript
<a href={article.pdfUrl} download className="...">
  <Download size={20} />
  Scarica questo articolo (PDF)
</a>
```

---

## 📊 Struttura Dati

### Schema Completo

```javascript
{
  // Identificazione
  _id: "1",                              // String univoco (numero o UUID)

  // Contenuto
  title: "Titolo Articolo",              // String (max 200 char)
  author: "Nome Autore",                 // String (max 100 char)
  excerpt: "Breve anteprima...",         // String (max 300 char)
  content: "Contenuto completo...",      // String (min 50 char)

  // Metadata
  publishedAt: "2024-03-15",             // ISO Date string
  year: 2024,                            // Number (intero)
  quarter: "Q1",                         // String enum: Q1|Q2|Q3|Q4

  // Media
  image: "URL della immagine",           // String URL (OPZIONALE)
  pdfUrl: "URL del PDF",                 // String URL (OPZIONALE)
}
```

### Validazione Dati

```javascript
// Valori obbligatori
if (!article._id || !article.title || !article.author) {
  throw new Error("Campi obbligatori mancanti");
}

// Valori opzionali
article.image = article.image || null; // Default null
article.pdfUrl = article.pdfUrl || null; // Default null

// Validazione trimestre
if (!["Q1", "Q2", "Q3", "Q4"].includes(article.quarter)) {
  throw new Error("Trimestre non valido");
}
```

---

## 🖼️ Immagini Opzionali

### Come Funziona

#### Articolo CON immagine

```javascript
{
  _id: "1",
  title: "...",
  image: "https://example.com/image.jpg",  // Presente
  // ... rest
}

// Risultato: Immagine visibile dentro il panel
```

#### Articolo SENZA immagine

```javascript
{
  _id: "2",
  title: "...",
  image: null,                            // Assente
  // ... rest
}

// Risultato: Card senza immagine, solo testo
```

### Validazione Immagine nel Component

```javascript
const hasImage = article.image && typeof article.image === "string";
//                 ↑ null check    ↑ type check

{
  hasImage && (
    <div className="...">
      <img src={article.image} />
    </div>
  );
}
```

**Controlli:**

1. `article.image` esiste?
2. È una stringa (non array, object, etc.)?
3. Solo se TRUE: renderizza immagine

### Best Practices

✅ **Sempre opzionale**

```javascript
image: "url.jpg"; // Se disponibile
image: null; // Se non disponibile
image: undefined; // Se non definito
```

❌ **Evita di forzare**

```javascript
// Cattivo: Mostra errore se image manca
<img src={article.image} />;

// Buono: Mostra solo se disponibile
{
  article.image && <img src={article.image} />;
}
```

---

## 🔌 Integrazioni Backend

### API Endpoints da Implementare

#### 1. GET /api/v1/articles

Recupera lista articoli con paginazione e filtri

**Request:**

```bash
GET http://localhost:5000/api/v1/articles?
  page=1
  &limit=12
  &year=2024
  &quarter=Q1
  &search=nuovo
```

**Response:**

```json
{
  "success": true,
  "data": {
    "articles": [
      {
        "_id": "1",
        "title": "...",
        "author": "...",
        "image": "https://...",
        "excerpt": "...",
        "publishedAt": "2024-03-15",
        "year": 2024,
        "quarter": "Q1",
        "pdfUrl": "https://..."
      }
    ],
    "total": 45,
    "pages": 4,
    "currentPage": 1
  }
}
```

#### 2. GET /api/v1/articles/:id

Recupera singolo articolo

**Request:**

```bash
GET http://localhost:5000/api/v1/articles/1
```

**Response:**

```json
{
  "success": true,
  "data": {
    "_id": "1",
    "title": "...",
    "content": "..."
    // ... rest fields
  }
}
```

#### 3. GET /api/v1/articles/:id/related

Recupera articoli correlati

**Request:**

```bash
GET http://localhost:5000/api/v1/articles/1/related?limit=5
```

**Response:**

```json
{
  "success": true,
  "data": {
    "articles": [...]
  }
}
```

### Implementazione nel Frontend

#### Paso 1: Crea hook useArticles

```javascript
// src/hooks/useArticles.js
import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/v1";

export const useArticles = (filters = {}) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/articles`, {
          params: filters,
        });
        setArticles(response.data.data.articles);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [JSON.stringify(filters)]);

  return { articles, loading, error };
};

export const useArticleDetail = (id) => {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchArticle = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/articles/${id}`);
        setArticle(response.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  return { article, loading, error };
};
```

#### Paso 2: Usa hook in Articles.jsx

```javascript
import { useArticles } from "../../hooks/useArticles";

const Articles = () => {
  const [filters, setFilters] = useState({
    page: 1,
    limit: 12,
    year: "",
    quarter: "",
    search: "",
  });

  const { articles, loading, error } = useArticles(filters);

  // Aggiorna filtri
  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  // Rest del componente...
};
```

#### Paso 3: Usa hook in ArticleDetail.jsx

```javascript
import { useArticleDetail } from "../../hooks/useArticles";

const ArticleDetail = () => {
  const { id } = useParams();
  const { article, loading, error } = useArticleDetail(id);

  // Rest del componente...
};
```

---

## 🎯 Best Practices

### 1. **Componenti**

✅ Components sono piccoli e focalizzati
✅ Props ben documentate con JSDoc
✅ State locale quando possibile
✅ Separazione responsabilità

### 2. **Performance**

✅ Immagini lazy loadable (pronte per lo schema)
✅ Filtri non generano API calls multipli
✅ Grid responsivo con gap
✅ Tailwind classes ottimizzate

### 3. **Accessibilità**

✅ Semantic HTML (article, section)
✅ Alt text per immagini
✅ Keyboard navigation ready
✅ Focus states visibili

### 4. **UX**

✅ Loading states
✅ Empty states
✅ Error handling
✅ Feedback visivo (hover, active)

### 5. **Documentazione**

✅ JSDoc comments
✅ Inline documentation
✅ README esaustivi
✅ Esempi di utilizzo

---

## 🔧 Troubleshooting

### Immagine non appare

**Problema:** `article.image` è null o undefined

**Soluzione:**

```javascript
// Controllare in console
console.log(article.image);

// Verificare in src/data/articoli.js
const articles = [
  {
    image: importedImage, // Deve essere definito
    // o
    image: null, // OK se intenzionale
  },
];
```

### Filtri non funzionano

**Problema:** Input cambia ma filtri non si aggiornano

**Soluzione:**

```javascript
// Verificare dependency array
useEffect(() => {
  // Filtering logic
}, [articles, selectedYear, selectedQuarter, searchTerm]); // ← Check these
```

### Link a dettaglio non funziona

**Problema:** Link `/articles/:id` non naviga

**Soluzione:**

```javascript
// Verificare App.jsx routing
<Route path="/articles/:id" element={<ArticleDetail />} />

// Verificare path in Link
<Link to={`/articles/${article._id}`}>  // Deve matchare
```

### PDF download non funziona

**Problema:** Click scarica non fa nulla

**Soluzione:**

```javascript
// Verificare pdfUrl è URL valido
article.pdfUrl = "https://example.com/file.pdf"; // Must be URL

// Non "#"
article.pdfUrl = "#"; // Questo disabilita il download
```

---

## 📋 Checklist Implementazione

- [ ] ArticleCard mostra correttamente senza immagine
- [ ] ArticleCard mostra correttamente con immagine
- [ ] Articoli caricano in Articles.jsx
- [ ] Filtro anno funziona
- [ ] Filtro trimestre funziona
- [ ] Ricerca funziona
- [ ] Reset filtri funziona
- [ ] Click leggi naviga a dettaglio
- [ ] Pagina dettaglio carica articolo
- [ ] Articoli correlati compaiono
- [ ] PDF download funziona (se disponibile)
- [ ] PDF disabilitato appare grigio (se non disponibile)
- [ ] Responsive su mobile
- [ ] No console errors

---

**Ultimo Aggiornamento**: Dicembre 2025
**Version**: 2.0 - Immagini Opzionali
**Status**: ✅ Documentazione Completa
