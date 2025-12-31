/**
 * BACKEND API INTEGRATION GUIDE - ARTICOLI
 *
 * Questo file contiene la documentazione e gli hook necessari per integrare
 * il frontend con il backend per la gestione degli articoli.
 */

// ============================================
// ENDPOINTS API PREVISTI
// ============================================

/*
  1. GET /api/v1/articoli
     - Descrizione: Recupera tutti gli articoli con paginazione e filtri
     - Query Parameters:
       * page: number (default: 1)
       * limit: number (default: 12)
       * year: number (filtro per anno)
       * quarter: string (filtro per trimestre: Q1, Q2, Q3, Q4)
       * search: string (ricerca per titolo o autore)
       * sort: string (default: '-publishedAt' per data decrescente)
     - Response:
       {
         "success": true,
         "data": {
           "articles": [
             {
               "_id": "string",
               "title": "string",
               "author": "string",
               "image": "string (URL)",
               "excerpt": "string",
               "content": "string",
               "publishedAt": "ISO Date",
               "year": number,
               "quarter": "Q1-Q4",
               "pdfUrl": "string (URL)"
             }
           ],
           "total": number,
           "pages": number,
           "currentPage": number
         }
       }

  2. GET /api/v1/articoli/:id
     - Descrizione: Recupera un articolo specifico
     - Response:
       {
         "success": true,
         "data": {
           "_id": "string",
           "title": "string",
           "author": "string",
           "image": "string",
           "excerpt": "string",
           "content": "string",
           "publishedAt": "ISO Date",
           "year": number,
           "quarter": "Q1-Q4",
           "pdfUrl": "string"
         }
       }

  3. GET /api/v1/articoli/filter/years
     - Descrizione: Recupera gli anni disponibili per gli articoli
     - Response:
       {
         "success": true,
         "data": {
           "years": [2024, 2023, 2022]
         }
       }

  4. GET /api/v1/articoli/:id/related
     - Descrizione: Recupera articoli correlati (stesso anno)
     - Query Parameters:
       * limit: number (default: 5)
     - Response:
       {
         "success": true,
         "data": {
           "articles": [...]
         }
       }

  5. POST /api/v1/articoli
     - Descrizione: Crea un nuovo articolo (solo admin)
     - Auth: Bearer token (JWT)
     - Body:
       {
         "title": "string",
         "author": "string",
         "image": "string (URL)",
         "excerpt": "string",
         "content": "string",
         "publishedAt": "ISO Date",
         "year": number,
         "quarter": "Q1-Q4",
         "pdfUrl": "string (URL)"
       }
     - Response: articolo creato

  6. PUT /api/v1/articoli/:id
     - Descrizione: Aggiorna un articolo (solo admin)
     - Auth: Bearer token (JWT)
     - Body: come POST
     - Response: articolo aggiornato

  7. DELETE /api/v1/articoli/:id
     - Descrizione: Elimina un articolo (solo admin)
     - Auth: Bearer token (JWT)
     - Response: { "success": true, "message": "Articolo eliminato" }
*/

// ============================================
// HOOK PERSONALIZZATI (useArticles)
// ============================================

/*
import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/v1';

export const useArticles = (filters = {}) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    total: 0,
    pages: 0,
    currentPage: 1
  });

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/articoli`, {
          params: {
            page: filters.page || 1,
            limit: filters.limit || 12,
            year: filters.year,
            quarter: filters.quarter,
            search: filters.search,
          }
        });

        if (response.data.success) {
          setArticles(response.data.data.articles);
          setPagination({
            total: response.data.data.total,
            pages: response.data.data.pages,
            currentPage: response.data.data.currentPage
          });
        }
      } catch (err) {
        setError(err.message);
        console.error('Errore nel caricamento articoli:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [filters]);

  return { articles, loading, error, pagination };
};

export const useArticleDetail = (id) => {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/articoli/${id}`);

        if (response.data.success) {
          setArticle(response.data.data);
        }
      } catch (err) {
        setError(err.message);
        console.error('Errore nel caricamento articolo:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchArticle();
    }
  }, [id]);

  return { article, loading, error };
};
*/

// ============================================
// ISTRUZIONI DI INTEGRAZIONE
// ============================================

/*
STEP 1: Quando il backend è pronto, crea il file useArticles.js:
        src/hooks/useArticles.js

STEP 2: In Articles.jsx, sostituisci:
        import { useState, useEffect } from 'react';
        // ... altri import
        const Articles = () => {
          const [articles, setArticles] = useState([]);
          ...
        
        CON:
        import { useArticles } from '../../hooks/useArticles';
        const Articles = () => {
          const [filters, setFilters] = useState({
            page: 1,
            limit: 12,
            year: '',
            quarter: '',
            search: ''
          });
          const { articles, loading, error, pagination } = useArticles(filters);
          ...

STEP 3: In ArticleDetail.jsx, sostituisci:
        const [article, setArticle] = useState(null);
        const [loading, setLoading] = useState(true);
        ...
        
        CON:
        import { useArticleDetail } from '../../hooks/useArticles';
        const { article, loading, error } = useArticleDetail(id);
        ...

STEP 4: Assicurati che il backend ritorni i campi corretti:
        - _id: identificativo univoco
        - title: titolo articolo
        - author: autore
        - image: URL immagine
        - excerpt: anteprima articolo
        - content: contenuto completo
        - publishedAt: data ISO
        - year: anno intero
        - quarter: Q1, Q2, Q3, Q4
        - pdfUrl: URL file PDF

STEP 5: Testa con curl:
        curl http://localhost:5000/api/v1/articoli
        curl http://localhost:5000/api/v1/articoli/1
        curl "http://localhost:5000/api/v1/articoli?year=2024&quarter=Q1"
*/

// ============================================
// STRUTTURA DATI MOCK (RIFERIMENTO)
// ============================================

/*
const articleStructure = {
  _id: "1",
  title: "Titolo Articolo",
  author: "Nome Autore",
  image: "URL immagine",
  excerpt: "Breve anteprima dell'articolo",
  content: "Contenuto completo dell'articolo. Può contenere paragrafi separati da \\n\\n",
  publishedAt: "2024-03-15", // ISO format
  year: 2024,
  quarter: "Q1", // Q1, Q2, Q3, Q4
  pdfUrl: "/path/to/pdf.pdf" // URL relativo o assoluto per il download
};
*/

export default {
  API_BASE_URL: "http://localhost:5000/api/v1",
  ENDPOINTS: {
    ARTICLES: "/articoli",
    ARTICLE_DETAIL: "/articoli/:id",
    ARTICLES_YEARS: "/articoli/filter/years",
    ARTICLES_RELATED: "/articoli/:id/related",
  },
  FILTERS_AVAILABLE: ["year", "quarter", "search", "page", "limit"],
  QUARTERS: ["Q1", "Q2", "Q3", "Q4"],
};
