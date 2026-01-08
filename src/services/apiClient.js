/**
 * @file apiClient.js
 * @description Client centralizzato per tutte le API calls
 * @version 1.0
 * @author SDA Italia Dev Team
 *
 * Gestisce tutte le comunicazioni con il backend
 * Include error handling, retry logic, e timeout
 */

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

// Configurazione timeout
const REQUEST_TIMEOUT = 30000; // 30 secondi
const RETRY_ATTEMPTS = 3;
const RETRY_DELAY = 1000; // 1 secondo

/**
 * Wrapper per fetch con timeout, retry e error handling
 * @async
 * @param {string} url - URL completo o relativo
 * @param {Object} options - Opzioni fetch
 * @returns {Promise<Object>} Risposta JSON
 */
const fetchWithRetry = async (url, options = {}, attempt = 1) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);

    // Retry se non è un errore di validazione
    if (attempt < RETRY_ATTEMPTS && error.name !== "AbortError") {
      await new Promise((resolve) =>
        setTimeout(resolve, RETRY_DELAY * attempt)
      );
      return fetchWithRetry(url, options, attempt + 1);
    }

    throw error;
  }
};

/**
 * Classe APIClient per gestire tutti gli endpoint
 */
class APIClient {
  constructor(baseURL = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  /**
   * Costruisce l'URL completo
   * @private
   */
  _buildURL(endpoint, params = {}) {
    let url = `${this.baseURL}${endpoint}`;
    const queryParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        queryParams.append(key, value);
      }
    });

    if (queryParams.toString()) {
      url += `?${queryParams.toString()}`;
    }

    return url;
  }

  /**
   * GET request
   * @async
   */
  async get(endpoint, params = {}) {
    const url = this._buildURL(endpoint, params);
    return fetchWithRetry(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  /**
   * POST request
   * @async
   */
  async post(endpoint, data = {}, params = {}) {
    const url = this._buildURL(endpoint, params);
    return fetchWithRetry(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }

  /**
   * PATCH request
   * @async
   */
  async patch(endpoint, data = {}) {
    const url = this._buildURL(endpoint);
    return fetchWithRetry(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }

  /**
   * DELETE request
   * @async
   */
  async delete(endpoint) {
    const url = this._buildURL(endpoint);
    return fetchWithRetry(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  // ===== LIBRI =====
  /**
   * Recupera tutti i libri
   * @async
   * @param {Object} params - Parametri di filtro (page, limit, category, sort)
   */
  async getLibri(params = {}) {
    return this.get("/libri", params);
  }

  /**
   * Recupera un singolo libro
   * @async
   */
  async getLibro(id) {
    return this.get(`/libri/${id}`);
  }

  /**
   * Ricerca libri
   * @async
   */
  async searchLibri(q) {
    return this.get("/libri/search", { q });
  }

  /**
   * Recupera libri per categoria
   * @async
   */
  async getLibriByCategory(category) {
    return this.get(`/libri/category/${category}`);
  }

  /**
   * Recupera libri consigliati
   * @async
   */
  async getLibriConsigliati() {
    return this.get("/libri/consigliati");
  }

  /**
   * Incrementa download di un libro
   * @async
   */
  async downloadLibro(id) {
    return this.post(`/libri/${id}/download`);
  }

  // ===== NEWS =====
  /**
   * Recupera tutte le notizie
   * @async
   */
  async getNews(params = {}) {
    return this.get("/news", params);
  }

  /**
   * Recupera una singola notizia
   * @async
   */
  async getNewsByid(id) {
    return this.get(`/news/${id}`);
  }

  // ===== EVENTI =====
  /**
   * Recupera tutti gli eventi
   * @async
   */
  async getEvents(params = {}) {
    return this.get("/events", params);
  }

  /**
   * Recupera un singolo evento
   * @async
   */
  async getEvent(id) {
    return this.get(`/events/${id}`);
  }

  // ===== CONTATTI =====
  /**
   * Invia un messaggio di contatto
   * @async
   */
  async sendContact(data) {
    return this.post("/contact", data);
  }

  /**
   * Recupera contatti (admin)
   * @async
   */
  async getContacts(params = {}) {
    return this.get("/contact", params);
  }

  // ===== DONAZIONI =====
  /**
   * Recupera le donazioni
   * @async
   */
  async getDonazioni(params = {}) {
    return this.get("/donazioni", params);
  }

  /**
   * Crea una donazione
   * @async
   */
  async createDonazione(data) {
    return this.post("/donazioni", data);
  }

  // ===== FASI PROGETTO (PROJECT PHASES) =====
  /**
   * Recupera statistiche complessive del progetto
   * @async
   * @returns {Promise<Object>} Statistiche: totalProgress, completedPhases, inProgressPhases, etc.
   */
  async getProjectStats() {
    return this.get("/project-phases/stats");
  }

  /**
   * Recupera tutte le fasi del progetto con progresso totale
   * @async
   * @param {Object} params - Parametri di filtro (page, limit, sort)
   */
  async getProjectPhases(params = {}) {
    return this.get("/project-phases", params);
  }

  /**
   * Recupera una fase del progetto per numero (1-4)
   * @async
   * @param {number} phaseNumber - Numero della fase (1-4)
   */
  async getPhaseByNumber(phaseNumber) {
    return this.get(`/project-phases/number/${phaseNumber}`);
  }

  /**
   * Recupera i media (gallery) di una fase del progetto
   * @async
   * @param {number} phaseNumber - Numero della fase (1-4)
   */
  async getPhaseMedia(phaseNumber) {
    return this.get(`/project-phases/number/${phaseNumber}/media`);
  }

  /**
   * Recupera i milestone di una fase del progetto
   * @async
   * @param {number} phaseNumber - Numero della fase (1-4)
   */
  async getPhaseMilestones(phaseNumber) {
    return this.get(`/project-phases/number/${phaseNumber}/milestones`);
  }

  /**
   * Aggiorna il progresso percentuale di una fase
   * @async
   * @param {number} phaseNumber - Numero della fase (1-4)
   * @param {number} percentage - Percentuale (0-100)
   */
  async updatePhaseProgress(phaseNumber, percentage) {
    return this.patch(`/project-phases/number/${phaseNumber}/progress`, {
      percentage,
    });
  }

  /**
   * Aggiunge un media a una fase del progetto
   * @async
   * @param {number} phaseNumber - Numero della fase (1-4)
   * @param {Object} mediaData - Dati del media (type, url, title, description)
   */
  async addPhaseMedia(phaseNumber, mediaData) {
    return this.post(`/project-phases/number/${phaseNumber}/media`, mediaData);
  }

  /**
   * Recupera una fase del progetto per ID MongoDB
   * @async
   * @param {string} id - ID MongoDB della fase
   */
  async getPhaseById(id) {
    return this.get(`/project-phases/${id}`);
  }
}

// Esporta un'istanza singleton
export default new APIClient();
