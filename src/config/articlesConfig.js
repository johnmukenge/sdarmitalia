/**
 * CONFIGURAZIONE ARTICOLI
 *
 * File centrale per gestire la configurazione della sezione articoli
 * Facilita il passaggio tra mock data e API reali
 */

// ============================================
// CONFIGURAZIONE AMBIENTE
// ============================================

export const config = {
  // API Base URL - Modifica in base all'ambiente
  API_BASE_URL: process.env.REACT_APP_API_URL || "http://localhost:5000",
  API_VERSION: "v1",

  // Flag per usare mock data (true = mock, false = API)
  USE_MOCK_DATA: true, // Cambia a false quando backend è pronto

  // Paginazione
  ITEMS_PER_PAGE: 12,
  ITEMS_PER_PAGE_MOBILE: 6,

  // Timeout API
  API_TIMEOUT: 10000,

  // Cache (in ms)
  CACHE_DURATION: 5 * 60 * 1000, // 5 minuti

  // Feature flags
  FEATURES: {
    SEARCH: true,
    FILTERS: true,
    PAGINATION: true,
    RELATED_ARTICLES: true,
    PDF_DOWNLOAD: true,
    COMMENTS: false, // Pronto per futuri sviluppi
    RATINGS: false, // Pronto per futuri sviluppi
    SHARING: false, // Pronto per futuri sviluppi
  },
};

// ============================================
// ENDPOINT MAPPING
// ============================================

export const endpoints = {
  // API Endpoints
  ARTICLES: `${config.API_BASE_URL}/api/${config.API_VERSION}/articles`,
  ARTICLE_DETAIL: (id) =>
    `${config.API_BASE_URL}/api/${config.API_VERSION}/articles/${id}`,
  ARTICLES_YEARS: `${config.API_BASE_URL}/api/${config.API_VERSION}/articles/filter/years`,
  ARTICLES_RELATED: (id) =>
    `${config.API_BASE_URL}/api/${config.API_VERSION}/articles/${id}/related`,
  ARTICLE_PDF: (id) =>
    `${config.API_BASE_URL}/api/${config.API_VERSION}/articles/${id}/pdf`,
};

// ============================================
// COSTANTI
// ============================================

export const QUARTERS = ["Q1", "Q2", "Q3", "Q4"];

export const FILTER_TYPES = {
  YEAR: "year",
  QUARTER: "quarter",
  SEARCH: "search",
};

export const SORT_OPTIONS = {
  NEWEST: "-publishedAt",
  OLDEST: "publishedAt",
  TITLE_ASC: "title",
  TITLE_DESC: "-title",
};

// ============================================
// MESSAGGI E TESTI LOCALIZATI
// ============================================

export const messages = {
  it: {
    // Headers
    ARTICLES_TITLE: "Leggi i Nostri Articoli",
    ARTICLES_SUBTITLE:
      "Scopri una raccolta di articoli selezionati su temi di fede, spiritualità e vita cristiana.",

    // Buttons
    READ_MORE: "Leggi",
    DOWNLOAD: "Scarica",
    BACK: "Torna agli articoli",
    RESET_FILTERS: "Azzera filtri",
    CONTACT_US: "Contattaci",

    // Filters
    SEARCH_PLACEHOLDER: "Cerca per titolo o autore...",
    FILTER_YEAR: "Tutti gli anni",
    FILTER_QUARTER: "Tutti i trimestri",

    // Messages
    NO_RESULTS: "Nessun articolo trovato corrispondente ai filtri selezionati.",
    LOADING: "Caricamento articoli...",
    ERROR: "Errore nel caricamento degli articoli. Riprova più tardi.",
    NOT_FOUND: "Articolo non trovato",

    // Info
    AUTHOR: "Autore",
    PUBLISHED: "Data di pubblicazione",
    RELATED_ARTICLES: "Articoli dello stesso anno",
    NO_RELATED: "Nessun altro articolo disponibile per questo anno.",

    // Sidebar
    NEED_HELP: "Hai domande su questo articolo?",
    CONTACT_HERE: "Contattaci",

    // Results
    RESULTS: "risultati",
  },
  en: {
    // Headers
    ARTICLES_TITLE: "Read Our Articles",
    ARTICLES_SUBTITLE:
      "Discover a collection of selected articles on faith, spirituality and Christian life.",

    // Buttons
    READ_MORE: "Read",
    DOWNLOAD: "Download",
    BACK: "Back to articles",
    RESET_FILTERS: "Reset filters",
    CONTACT_US: "Contact Us",

    // Filters
    SEARCH_PLACEHOLDER: "Search by title or author...",
    FILTER_YEAR: "All years",
    FILTER_QUARTER: "All quarters",

    // Messages
    NO_RESULTS: "No articles found matching the selected filters.",
    LOADING: "Loading articles...",
    ERROR: "Error loading articles. Please try again later.",
    NOT_FOUND: "Article not found",

    // Info
    AUTHOR: "Author",
    PUBLISHED: "Published",
    RELATED_ARTICLES: "Articles from the same year",
    NO_RELATED: "No other articles available for this year.",

    // Sidebar
    NEED_HELP: "Have questions about this article?",
    CONTACT_HERE: "Contact us",

    // Results
    RESULTS: "results",
  },
};

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Ottiene il messaggio localizzato
 * @param {string} lang - Lingua ('it' o 'en')
 * @param {string} key - Chiave messaggio
 * @returns {string} Messaggio localizzato
 */
export const getMessage = (lang = "it", key) => {
  return messages[lang]?.[key] || messages["it"][key] || key;
};

/**
 * Ottiene l'URL API completo
 * @param {string} endpoint - Nome endpoint
 * @param {*} params - Parametri (per URL dinamici)
 * @returns {string} URL completo
 */
export const getApiUrl = (endpoint, params = null) => {
  const baseUrl = endpoints[endpoint];
  if (typeof baseUrl === "function") {
    return baseUrl(params);
  }
  return baseUrl;
};

/**
 * Verifica se usare mock data
 * @returns {boolean}
 */
export const shouldUseMockData = () => {
  return config.USE_MOCK_DATA || process.env.NODE_ENV === "development";
};

/**
 * Valida la configurazione
 * @returns {boolean}
 */
export const validateConfig = () => {
  const required = ["API_BASE_URL", "API_VERSION"];
  return required.every((key) => config[key]);
};

// ============================================
// DEFAULT FILTER STATE
// ============================================

export const defaultFilters = {
  year: "",
  quarter: "",
  search: "",
  page: 1,
  limit: config.ITEMS_PER_PAGE,
  sort: SORT_OPTIONS.NEWEST,
};

// ============================================
// ARTICLE SCHEMA (per validazione)
// ============================================

export const articleSchema = {
  _id: { type: "string", required: true },
  title: { type: "string", required: true, minLength: 3, maxLength: 200 },
  author: { type: "string", required: true, minLength: 2, maxLength: 100 },
  image: { type: "string", required: true },
  excerpt: { type: "string", required: true, minLength: 10, maxLength: 300 },
  content: { type: "string", required: true, minLength: 50 },
  publishedAt: { type: "date", required: true },
  year: { type: "number", required: true, min: 2000, max: 2100 },
  quarter: { type: "string", required: true, enum: QUARTERS },
  pdfUrl: { type: "string", required: false },
};

// ============================================
// THEMES (per supporto dark mode futuro)
// ============================================

export const themes = {
  light: {
    primary: "#2563eb", // blue-600
    secondary: "#1d4ed8", // blue-700
    accent: "#f0f9ff", // blue-50
    background: "#ffffff",
    text: "#1f2937",
    border: "#e5e7eb",
  },
  dark: {
    primary: "#3b82f6", // blue-500
    secondary: "#60a5fa", // blue-400
    accent: "#1e3a8a", // blue-900
    background: "#111827",
    text: "#f3f4f6",
    border: "#374151",
  },
};

// ============================================
// EXPORT COMPLETO
// ============================================

export default {
  config,
  endpoints,
  messages,
  QUARTERS,
  FILTER_TYPES,
  SORT_OPTIONS,
  defaultFilters,
  articleSchema,
  themes,
  getMessage,
  getApiUrl,
  shouldUseMockData,
  validateConfig,
};
