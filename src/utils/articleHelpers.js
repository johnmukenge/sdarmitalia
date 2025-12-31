/**
 * Helper functions per la gestione degli articoli
 * Utili per formattazione, filtro e ordinamento
 */

/**
 * Formatta una data ISO in formato leggibile italiano
 * @param {string} dateString - Data in formato ISO
 * @returns {string} Data formattata (es: "15 marzo 2024")
 */
export const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("it-IT", options);
};

/**
 * Formatta una data ISO in formato breve italiano
 * @param {string} dateString - Data in formato ISO
 * @returns {string} Data formattata (es: "15/03/2024")
 */
export const formatDateShort = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

/**
 * Tronca il testo a un numero massimo di caratteri
 * @param {string} text - Testo da troncare
 * @param {number} maxLength - Numero massimo di caratteri
 * @returns {string} Testo troncato con "..."
 */
export const truncateText = (text, maxLength = 150) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + "...";
};

/**
 * Estrae gli anni unici dagli articoli
 * @param {Array} articles - Array di articoli
 * @returns {Array} Array di anni ordinati decrescente
 */
export const extractYears = (articles) => {
  return [...new Set(articles.map((a) => a.year))].sort((a, b) => b - a);
};

/**
 * Filtra articoli per anno
 * @param {Array} articles - Array di articoli
 * @param {number} year - Anno per cui filtrare
 * @returns {Array} Articoli filtrati
 */
export const filterByYear = (articles, year) => {
  if (!year) return articles;
  return articles.filter((a) => a.year === parseInt(year));
};

/**
 * Filtra articoli per trimestre
 * @param {Array} articles - Array di articoli
 * @param {string} quarter - Trimestre (Q1, Q2, Q3, Q4)
 * @returns {Array} Articoli filtrati
 */
export const filterByQuarter = (articles, quarter) => {
  if (!quarter) return articles;
  return articles.filter((a) => a.quarter === quarter);
};

/**
 * Cerca articoli per testo
 * @param {Array} articles - Array di articoli
 * @param {string} searchTerm - Termine di ricerca
 * @returns {Array} Articoli che corrispondono alla ricerca
 */
export const searchArticles = (articles, searchTerm) => {
  if (!searchTerm) return articles;

  const lowerSearch = searchTerm.toLowerCase();
  return articles.filter(
    (article) =>
      article.title.toLowerCase().includes(lowerSearch) ||
      article.author.toLowerCase().includes(lowerSearch) ||
      article.excerpt.toLowerCase().includes(lowerSearch) ||
      (article.content && article.content.toLowerCase().includes(lowerSearch))
  );
};

/**
 * Applica tutti i filtri agli articoli
 * @param {Array} articles - Array di articoli
 * @param {Object} filters - Oggetto filtri { year, quarter, search }
 * @returns {Array} Articoli filtrati
 */
export const applyFilters = (articles, filters = {}) => {
  let filtered = articles;

  if (filters.year) {
    filtered = filterByYear(filtered, filters.year);
  }

  if (filters.quarter) {
    filtered = filterByQuarter(filtered, filters.quarter);
  }

  if (filters.search) {
    filtered = searchArticles(filtered, filters.search);
  }

  return filtered;
};

/**
 * Ordina articoli per data
 * @param {Array} articles - Array di articoli
 * @param {string} order - 'asc' per ascendente, 'desc' per discendente (default)
 * @returns {Array} Articoli ordinati
 */
export const sortByDate = (articles, order = "desc") => {
  const sorted = [...articles];
  sorted.sort((a, b) => {
    const dateA = new Date(a.publishedAt);
    const dateB = new Date(b.publishedAt);
    return order === "desc" ? dateB - dateA : dateA - dateB;
  });
  return sorted;
};

/**
 * Raggruppa articoli per anno
 * @param {Array} articles - Array di articoli
 * @returns {Object} Articoli raggruppati per anno
 */
export const groupByYear = (articles) => {
  return articles.reduce((acc, article) => {
    const year = article.year;
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(article);
    return acc;
  }, {});
};

/**
 * Raggruppa articoli per trimestre
 * @param {Array} articles - Array di articoli
 * @returns {Object} Articoli raggruppati per trimestre
 */
export const groupByQuarter = (articles) => {
  return articles.reduce((acc, article) => {
    const quarter = article.quarter;
    if (!acc[quarter]) {
      acc[quarter] = [];
    }
    acc[quarter].push(article);
    return acc;
  }, {});
};

/**
 * Prende i primi N articoli
 * @param {Array} articles - Array di articoli
 * @param {number} limit - Numero di articoli da prendere
 * @returns {Array} Primi N articoli
 */
export const limitArticles = (articles, limit = 6) => {
  return articles.slice(0, limit);
};

/**
 * Pagina gli articoli
 * @param {Array} articles - Array di articoli
 * @param {number} page - Numero della pagina (inizia da 1)
 * @param {number} pageSize - Numero di articoli per pagina
 * @returns {Object} { articles, total, pages, currentPage }
 */
export const paginateArticles = (articles, page = 1, pageSize = 12) => {
  const total = articles.length;
  const pages = Math.ceil(total / pageSize);
  const currentPage = Math.max(1, Math.min(page, pages));
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  return {
    articles: articles.slice(startIndex, endIndex),
    total,
    pages,
    currentPage,
    hasNextPage: currentPage < pages,
    hasPrevPage: currentPage > 1,
    nextPage: currentPage + 1,
    prevPage: currentPage - 1,
  };
};

/**
 * Trova articoli correlati per uno specifico articolo
 * @param {Array} articles - Array di articoli
 * @param {Object} article - Articolo di riferimento
 * @param {number} limit - Numero di articoli correlati da restituire
 * @returns {Array} Articoli correlati
 */
export const getRelatedArticles = (articles, article, limit = 5) => {
  const related = articles.filter(
    (a) =>
      a._id !== article._id &&
      (a.year === article.year || a.quarter === article.quarter)
  );
  return related.slice(0, limit);
};

/**
 * Valida la struttura di un articolo
 * @param {Object} article - Articolo da validare
 * @returns {boolean} True se valido, False altrimenti
 */
export const isValidArticle = (article) => {
  return !!(
    article._id &&
    article.title &&
    article.author &&
    article.publishedAt &&
    article.year &&
    article.quarter &&
    article.excerpt &&
    article.content
  );
};

/**
 * Crea un articolo con valori di default
 * @param {Object} overrides - Proprietà da sovrascrivere
 * @returns {Object} Nuovo articolo
 */
export const createDefaultArticle = (overrides = {}) => {
  return {
    _id: Date.now().toString(),
    title: "Nuovo Articolo",
    author: "Autore",
    image: "",
    excerpt: "",
    content: "",
    publishedAt: new Date().toISOString(),
    year: new Date().getFullYear(),
    quarter: "Q1",
    pdfUrl: "",
    ...overrides,
  };
};

export default {
  formatDate,
  formatDateShort,
  truncateText,
  extractYears,
  filterByYear,
  filterByQuarter,
  searchArticles,
  applyFilters,
  sortByDate,
  groupByYear,
  groupByQuarter,
  limitArticles,
  paginateArticles,
  getRelatedArticles,
  isValidArticle,
  createDefaultArticle,
};
