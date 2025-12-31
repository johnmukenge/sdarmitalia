# 🗺️ ARCHITETTURA SEZIONE ARTICOLI

## Diagramma di Flusso Dati

```
┌─────────────────────────────────────────────────────────────────┐
│                         APP.JSX                                  │
│                      (Routing Setup)                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  Route 1: /articoli → Articles.jsx (pagina principale)          │
│  Route 2: /articles/:id → ArticleDetail.jsx (dettaglio)         │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
                                    │
                    ┌───────────────┴───────────────┐
                    │                               │
         ┌──────────▼──────────┐      ┌────────────▼──────────┐
         │  Articles.jsx       │      │  ArticleDetail.jsx    │
         │  (Main Page)        │      │  (Detail Page)        │
         ├─────────────────────┤      ├───────────────────────┤
         │                     │      │                       │
         │ State:              │      │ State:                │
         │ - articles[]        │      │ - article             │
         │ - filtered[]        │      │ - relatedArticles[]   │
         │ - selectedYear      │      │ - loading             │
         │ - selectedQuarter   │      │                       │
         │ - searchTerm        │      │ Route Params:         │
         │ - loading           │      │ - id                  │
         │                     │      │                       │
         │ Effects:            │      │ Effects:              │
         │ - Load data         │      │ - Load article detail │
         │ - Apply filters     │      │ - Load related        │
         │ - Real-time search  │      │                       │
         │                     │      │                       │
         │ Data Source:        │      │ Data Source:          │
         │ ↓ Mock: articoli.js │      │ ↓ Mock: articoli.js   │
         │ ↓ API: /articles    │      │ ↓ API: /articles/:id  │
         │                     │      │                       │
         └──────────┬──────────┘      └────────┬──────────────┘
                    │                          │
                    │ map()                     │ ArticleCard
                    │                          │
         ┌──────────▼──────────────┐           │
         │ ArticleCard.jsx × N     │           │
         ├────────────────────────────────────────┐
         │                                        │
         │ Props:                                 │
         │ - article {                            │
         │     _id, title, author,                │
         │     image, excerpt,                    │
         │     publishedAt, quarter,              │
         │     pdfUrl                             │
         │  }                                     │
         │                                        │
         │ Features:                              │
         │ - Image with hover effect              │
         │ - Quarter badge                        │
         │ - Read button → /articles/:id          │
         │ - Download button → PDF URL            │
         │                                        │
         └────────────────────────────────────────┘
```

---

## Struktur Folder Detail

```
src/
├── components/
│   └── articles/
│       ├── Articles.jsx          ← Main page with filters
│       ├── ArticleCard.jsx       ← Card component (reusable)
│       └── ArticleDetail.jsx     ← Detail page
│
├── data/
│   └── articoli.js              ← Mock data (7 articles)
│
├── config/
│   └── articlesConfig.js        ← Centralized configuration
│       ├── API endpoints
│       ├── Messages (i18n ready)
│       ├── Feature flags
│       └── Themes
│
├── utils/
│   ├── articleHelpers.js        ← 16 utility functions
│   │   ├── formatDate()
│   │   ├── truncateText()
│   │   ├── filterByYear()
│   │   ├── filterByQuarter()
│   │   ├── searchArticles()
│   │   ├── sortByDate()
│   │   ├── paginateArticles()
│   │   └── ... (more)
│   │
│   ├── articlesDemo.js          ← Demo functions
│   │   ├── demonstrateDataStructure()
│   │   ├── demonstrateFilters()
│   │   ├── demonstrateSorting()
│   │   └── runAllDemos()
│   │
│   └── articlesBackendIntegration.js  ← API documentation
│       ├── Endpoint definitions
│       ├── Hook templates
│       ├── API contracts
│       └── Integration guide
│
├── styles/
│   └── articles.css             ← Custom animations (optional)
│       ├── @keyframes fadeIn
│       ├── @keyframes slideIn
│       ├── Article card styling
│       └── Responsive adjustments
│
├── hooks/
│   └── useArticles.js           ← [FUTURE] Custom hooks
│       ├── useArticles(filters)
│       └── useArticleDetail(id)
│
└── App.jsx                      ← Updated with new routes
    ├── <Route path="/articoli" element={<Articles />} />
    └── <Route path="/articles/:id" element={<ArticleDetail />} />
```

---

## State Management Flow

```
┌──────────────────────────────────┐
│    ARTICLES.JSX STATE            │
├──────────────────────────────────┤
│                                  │
│  articles[] (from data)          │
│    ↓                             │
│  Apply filterByYear()            │
│    ↓                             │
│  Apply filterByQuarter()         │
│    ↓                             │
│  Apply searchArticles()          │
│    ↓                             │
│  Apply sortByDate()              │
│    ↓                             │
│  filteredArticles[]              │
│    ↓                             │
│  Map to <ArticleCard />          │
│    ↓                             │
│  Render UI                       │
│                                  │
└──────────────────────────────────┘
```

---

## User Journey Map

```
USER JOURNEY - PAGINA ARTICOLI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. LANDING
   ↓
   User navigates to /articoli
   ↓
   Articles.jsx loads
   ↓
   useEffect() → Load articles from mock data
   ↓
   All 7 articles displayed in grid

2. FILTERING
   ↓
   User selects Year dropdown
   ↓
   setSelectedYear() → triggers useEffect
   ↓
   applyFilters() runs
   ↓
   filteredArticles updates
   ↓
   Grid updates (smooth animation)

3. READING
   ↓
   User clicks "Leggi" button on card
   ↓
   navigate("/articles/1")
   ↓
   ArticleDetail.jsx loads with id=1
   ↓
   useEffect() → Load article & related
   ↓
   Display full article with sidebar

4. DOWNLOADING
   ↓
   User clicks "Scarica" button
   ↓
   <a href={article.pdfUrl} download />
   ↓
   Browser downloads PDF

5. GOING BACK
   ↓
   User clicks "Torna agli articoli"
   ↓
   navigate("/articoli")
   ↓
   Back to Articles.jsx with filters reset
```

---

## Component Props Flow

```
App.jsx
   │
   ├─→ Articles.jsx
   │      │
   │      ├─→ ArticleCard (props)
   │      │      article: {
   │      │        _id, title, author,
   │      │        image, excerpt,
   │      │        publishedAt, year,
   │      │        quarter, pdfUrl
   │      │      }
   │      │
   │      └─→ (onClick) → navigate("/articles/:id")
   │
   └─→ ArticleDetail.jsx
          useParams() → id
          └─→ Load article from id
```

---

## Data Structure Relationships

```
┌─────────────────────────────────────┐
│       ARTICOLO OBJECT               │
├─────────────────────────────────────┤
│                                     │
│  _id: "1"                           │
│  title: "Titolo"                    │
│  author: "Nome"                     │
│  image: "URL"                       │
│  excerpt: "Breve"                   │
│  content: "Lungo"                   │
│  publishedAt: "2024-03-15"          │
│  year: 2024        ◄── Used for    │
│  quarter: "Q1"     ◄── Filtering   │
│  pdfUrl: "URL"                      │
│                                     │
└─────────────────────────────────────┘
         │
         ├─→ ArticleCard display
         ├─→ Filter by year
         ├─→ Filter by quarter
         ├─→ Search in title/author
         ├─→ Related articles
         └─→ Detail page display
```

---

## Configuration Hierarchy

```
┌────────────────────────────────────────┐
│    src/config/articlesConfig.js        │
├────────────────────────────────────────┤
│                                        │
│  config (environment settings)         │
│    ├── API_BASE_URL                    │
│    ├── USE_MOCK_DATA                   │
│    ├── ITEMS_PER_PAGE                  │
│    └── FEATURES (feature flags)        │
│                                        │
│  endpoints (API URL mapping)           │
│    ├── ARTICLES                        │
│    ├── ARTICLE_DETAIL(id)              │
│    ├── ARTICLES_YEARS                  │
│    └── ARTICLES_RELATED(id)            │
│                                        │
│  messages (i18n strings)               │
│    ├── it (Italian)                    │
│    └── en (English)                    │
│                                        │
│  QUARTERS, SORT_OPTIONS, etc.          │
│                                        │
└────────────────────────────────────────┘
         │
         ├─→ Used in Articles.jsx
         ├─→ Used in ArticleDetail.jsx
         ├─→ Used in ArticleCard.jsx
         └─→ Future: Change here = global effect
```

---

## Utility Functions Dependency Map

```
articoli.js (data)
        │
        ├─→ articleHelpers.js
        │    ├─→ extractYears()
        │    ├─→ filterByYear()
        │    ├─→ filterByQuarter()
        │    ├─→ searchArticles()
        │    ├─→ sortByDate()
        │    ├─→ paginateArticles()
        │    ├─→ getRelatedArticles()
        │    └─→ ... (more)
        │
        ├─→ Articles.jsx (useEffect + filters)
        │
        ├─→ ArticleDetail.jsx (related articles)
        │
        └─→ articlesDemo.js (testing)
             └─→ runAllDemos()
```

---

## Backend Integration Flow (Future)

```
CURRENT STATE (Mock)
┌────────────────┐
│ articoli.js    │
│ (Mock Data)    │
└────────────────┘
        │
        ├─→ Articles.jsx
        └─→ ArticleDetail.jsx

FUTURE STATE (With API)
┌────────────────┐
│ Backend API    │
│  /api/v1/...   │
└────────────────┘
        │
        ├─→ useArticles() hook
        │    │
        │    ├─→ GET /articles
        │    └─→ GET /articles/:id
        │
        ├─→ Articles.jsx
        │    (useArticles(filters))
        │
        └─→ ArticleDetail.jsx
             (useArticleDetail(id))

TRANSITION STEPS:
1. Create src/hooks/useArticles.js
2. Replace mock imports with hook imports
3. Remove articles.js import from components
4. Test with real API
```

---

## Testing Flow

```
┌──────────────────────────────────┐
│   articlesDemo.js                │
│   (runAllDemos)                  │
├──────────────────────────────────┤
│                                  │
│  demonstrateDataStructure()      │
│    ↓ Shows articoli.js structure │
│                                  │
│  demonstrateFilters()            │
│    ↓ Tests filter functions      │
│                                  │
│  demonstrateSorting()            │
│    ↓ Tests sort functions        │
│                                  │
│  demonstratePagination()         │
│    ↓ Tests pagination            │
│                                  │
│  demonstrateRelatedArticles()    │
│    ↓ Tests related logic         │
│                                  │
│  demonstrateFormatting()         │
│    ↓ Tests date/text formatting  │
│                                  │
└──────────────────────────────────┘
        │
        └─→ Open Browser Console
            └─→ See all results
```

---

## Documentation Cross-Reference

```
ARTICOLI_INDEX.md
      │
      ├─→ Quick Start
      │    └─→ ARTICOLI_QUICK_START.md
      │
      ├─→ Setup
      │    └─→ ARTICOLI_SETUP.md
      │
      ├─→ Complete Guide
      │    └─→ ARTICOLI_GUIDA_COMPLETA.md
      │
      ├─→ Full Summary
      │    └─→ ARTICOLI_README.md
      │
      └─→ This Architecture Map
           └─→ This file
```

---

## Performance Optimization Roadmap

```
Current State (v1.0)
├─ Mock data (no API calls)
├─ Client-side filtering
├─ All articles loaded
└─ No pagination

Optimization Phase 1
├─ Add pagination
├─ Lazy load images
├─ Add caching
└─ Minify CSS

Optimization Phase 2
├─ Virtual scrolling
├─ Image compression
├─ API response caching
└─ Service worker

Optimization Phase 3
├─ CDN for images
├─ Database indexing
├─ Analytics
└─ A/B testing
```

---

## Migration Checklist (Mock → API)

```
□ Create API endpoints
  ├─ GET /api/v1/articles
  ├─ GET /api/v1/articles/:id
  └─ GET /api/v1/articles/:id/related

□ Create src/hooks/useArticles.js
  ├─ Export useArticles(filters)
  └─ Export useArticleDetail(id)

□ Update Articles.jsx
  ├─ Remove: import articoli from data
  ├─ Add: import { useArticles } from hooks
  └─ Replace state with hook

□ Update ArticleDetail.jsx
  ├─ Remove: local state logic
  ├─ Add: import { useArticleDetail }
  └─ Use hook for data loading

□ Test everything
  ├─ Unit tests
  ├─ Integration tests
  └─ E2E tests

□ Deploy
  ├─ Production build
  ├─ Monitor errors
  └─ Gather feedback
```

---

**This architecture ensures:**
✅ Clean separation of concerns
✅ Easy testing
✅ Simple migration to API
✅ Scalability
✅ Maintainability

---

**Last Updated**: December 2024
**Version**: 1.0
