# Guida Completa - Sezione Articoli

## 🎨 UI/UX Layout

### Pagina Principale Articoli (`/articoli`)

```
┌─────────────────────────────────────────────────────┐
│                      NAVBAR                          │
├─────────────────────────────────────────────────────┤
│                                                       │
│  Leggi i Nostri Articoli                             │
│  Scopri una raccolta di articoli selezionati...     │
│                                                       │
│  ┌──────────────────────────────────────────────┐   │
│  │ 🔍 Cerca per titolo o autore... │ Anno: ▼   │   │
│  │ Trimestre: ▼                     [Azzera]    │   │
│  └──────────────────────────────────────────────┘   │
│                                                       │
│  ┌─────────────────┐ ┌─────────────────┐ ┌────────┐ │
│  │   [IMG]   Q1    │ │   [IMG]   Q1    │ │ [IMG]  │ │
│  │ Titolo 1        │ │ Titolo 2        │ │ Q2     │ │
│  │ Autore A        │ │ Autore B        │ │ Titolo │ │
│  │ Anteprima...    │ │ Anteprima...    │ │ Autor. │ │
│  │ 15 mar 2024     │ │ 10 feb 2024     │ │ Antep. │ │
│  │ [Leggi →] [⬇]  │ │ [Leggi →] [⬇]  │ │ [Leggi │ │
│  └─────────────────┘ └─────────────────┘ └────────┘ │
│                                                       │
│  ... (altre card)                                    │
└─────────────────────────────────────────────────────┘
```

### Pagina Dettaglio Articoli (`/articles/:id`)

```
┌─────────────────────────────────────────────────────┐
│                      NAVBAR                          │
├─────────────────────────────────────────────────────┤
│                                                       │
│  [← Torna agli articoli]                             │
│                                                       │
│  ┌────────────────────────────┐  ┌────────────────┐ │
│  │      [HERO SECTION]         │  │  Articoli     │ │
│  │      [Large Image]          │  │  dello        │ │
│  │                             │  │  stesso       │ │
│  └────────────────────────────┘  │  anno          │ │
│                                   │                │ │
│  Q1 2024                          │ ┌────────────┐ │ │
│  Titolo Articolo                  │ │ Articolo 1 │ │ │
│                                   │ │ Q1         │ │ │
│  Autore: Nome                     │ └────────────┘ │ │
│  Data: 15 marzo 2024              │ ┌────────────┐ │ │
│  ─────────────────────────────    │ │ Articolo 2 │ │ │
│                                   │ │ Q2         │ │ │
│  [Anteprima articolo...]          │ └────────────┘ │ │
│                                   │                │ │
│  [Contenuto completo del          │ ┌────────────┐ │ │
│   articolo con paragrafi...]      │ │ Contattaci │ │ │
│                                   │ │ per info   │ │ │
│                                   │ └────────────┘ │ │
│  [⬇ Scarica questo articolo]      │                │ │
│                                   └────────────────┘ │
└─────────────────────────────────────────────────────┘
```

## 🎯 Componenti Dettagliati

### 1. Articles.jsx (Pagina Principale)

**Props**: Nessuno (uso dati da hook o context)

**State**:

```javascript
- articles: Array<Article>        // Tutti gli articoli
- filteredArticles: Array<Article> // Articoli filtrati
- loading: boolean                 // Stato caricamento
- selectedYear: string             // Anno selezionato
- selectedQuarter: string          // Trimestre selezionato
- searchTerm: string               // Termine ricerca
```

**Funzioni**:

- `resetFilters()` - Azzera tutti i filtri
- `useEffect()` - Carica articoli al mount

### 2. ArticleCard.jsx (Card Singolo Articolo)

**Props**:

```javascript
{
  article: {
    _id: string,
    title: string,
    author: string,
    image: string (URL),
    excerpt: string,
    publishedAt: ISO Date,
    year: number,
    quarter: string,
    pdfUrl: string
  }
}
```

**Features**:

- Immagine con hover effect
- Badge trimestre
- Anteprima testo
- Data formattata
- Pulsante Leggi (naviga a dettaglio)
- Pulsante Download (scarica PDF)

### 3. ArticleDetail.jsx (Pagina Dettaglio)

**Route Params**:

```javascript
{
  id: string; // ID articolo da params URL
}
```

**State**:

```javascript
- article: Article | null         // Articolo dettaglio
- relatedArticles: Array<Article> // Articoli correlati
- loading: boolean                 // Stato caricamento
```

**Features**:

- Hero section con immagine
- Metadati (autore, data, anno, trimestre)
- Contenuto formattato
- Sidebar articoli correlati
- Box contatti
- Pulsante download PDF
- Pulsante torna indietro

## 📊 Data Flow

```
App.jsx
  ↓
  ├─→ Articles.jsx
  │     ├─→ [useEffect] Carica articoli
  │     ├─→ [Filtri] Applica filtri in real-time
  │     └─→ ArticleCard.jsx (map)
  │           ├─→ onClick "Leggi" → navigate /articles/:id
  │           └─→ onClick "Download" → download PDF
  │
  └─→ ArticleDetail.jsx
        ├─→ [useParams] Estrai ID
        ├─→ [useEffect] Carica articolo + correlati
        └─→ Visualizza articolo completo
```

## 🔄 Integrazione Backend - Timeline

### Fase 1: Ora (Completa)

✅ Componenti UI completati
✅ Dati mock in place
✅ Logica filtro/ricerca funzionante
✅ Routing configurato

### Fase 2: Backend Pronto

- [ ] Creare API endpoints
- [ ] Testare endpoints con Postman/curl
- [ ] Creare hook useArticles

### Fase 3: Connessione Frontend

- [ ] Sostituire mock data con API calls
- [ ] Testare filtri con dati reali
- [ ] Implementare error handling

### Fase 4: Ottimizzazioni (Opzionali)

- [ ] Paginazione
- [ ] Caching
- [ ] Lazy loading immagini
- [ ] SEO

## 🧪 Testing Checklist

### Pagina Principale

- [ ] Carica tutti gli articoli
- [ ] Filtro anno funziona
- [ ] Filtro trimestre funziona
- [ ] Ricerca funziona
- [ ] Filtri combinati funzionano
- [ ] Reset filtri funziona
- [ ] Ordinamento per data funziona
- [ ] Responsive su mobile/tablet
- [ ] Click "Leggi" naviga a dettaglio
- [ ] Click download mostra popover

### Pagina Dettaglio

- [ ] Articolo carica correttamente
- [ ] Immagine hero viene visualizzata
- [ ] Metadati sono corretti
- [ ] Articoli correlati carichi
- [ ] Pulsante torna indietro funziona
- [ ] Download PDF funziona
- [ ] Responsive su mobile

### Edge Cases

- [ ] URL articolo inesistente → 404
- [ ] Nessun risultato ricerca → messaggio
- [ ] Caricamento lento → loading spinner
- [ ] Errore API → error message

## 💻 Codice di Esempio - Hook Personalizzato

Quando il backend è pronto, crea `src/hooks/useArticles.js`:

```javascript
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

## 📝 Note Sviluppo

1. **Colori**: Sono già configurati con Tailwind (blue-600, blue-700, gray-\*, etc.)
2. **Icone**: Usa `lucide-react` (già importato nei componenti)
3. **Date**: Formattate in italiano con `toLocaleDateString('it-IT')`
4. **Responsive**: Usa grid/flex di Tailwind (mobile-first)
5. **Performance**: Considera virtualization per liste molto lunghe

## 🐛 Troubleshooting

| Problema               | Soluzione                                      |
| ---------------------- | ---------------------------------------------- |
| Icone non appaiono     | Verifica import `lucide-react`                 |
| Componenti non trovati | Controlla percorsi import e nomi file          |
| Filtri non funzionano  | Verifica state update in useEffect             |
| Routing non funziona   | Aggiungi rotte in App.jsx (fatto)              |
| Dati non caricano      | Verifica import `articoli` da data/articoli.js |

## 📚 Risorse Utili

- Utility Helper: `src/utils/articleHelpers.js`
- Documentazione Backend: `src/utils/articlesBackendIntegration.js`
- Demo Functions: `src/utils/articlesDemo.js`
- Setup Guide: `ARTICOLI_SETUP.md`

---

**Versione**: 1.0
**Ultimo Aggiornamento**: Dicembre 2024
**Status**: ✅ Pronto per testing
