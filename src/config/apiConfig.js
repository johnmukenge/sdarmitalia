/**
 * @file src/config/api.js
 * @description Configurazione API centralizata per Vite
 *
 * Usa automaticamente gli endpoint corretti in base all'ambiente:
 * - Development (npm run dev): http://localhost:5000/api/v1
 * - Production (npm run build): https://adsgmdr.it/api/v1
 */

// API base URL - Vite sostituisce automaticamente in base all'ambiente
export const API_BASE_URL = import.meta.env.VITE_API_URL || "/api/v1";

// Versione API
export const API_VERSION = "v1";

// Endpoints
export const API_ENDPOINTS = {
  // Articoli
  ARTICLES: `${API_BASE_URL}/articoli`,
  ARTICLES_BY_ID: (id) => `${API_BASE_URL}/articoli/${id}`,
  ARTICLES_YEARS: `${API_BASE_URL}/articoli/filter/years`,
  ARTICLES_RELATED: (id) => `${API_BASE_URL}/articoli/${id}/related`,

  // News
  NEWS: `${API_BASE_URL}/news`,
  NEWS_BY_ID: (id) => `${API_BASE_URL}/news/${id}`,

  // Donazioni
  DONATIONS_STATS: "/api/donazioni/stats",
  DONATIONS_RECENT: "/api/donazioni/recent",
  DONATIONS_BENEFICIARY: "/api/donazioni/beneficiary",
  DONATIONS_CREATE_INTENT: "/api/donazioni/create-payment-intent",
  DONATIONS_CONFIRM: "/api/donazioni/confirm-payment",
  DONATIONS_WEBHOOK: "/api/donazioni/webhook",

  // Contact
  CONTACT: `${API_BASE_URL}/contact`,

  // Events
  EVENTS: `${API_BASE_URL}/events`,
};

/**
 * Funzione helper per fare richieste API
 * @param {string} url - URL dell'endpoint
 * @param {object} options - Opzioni fetch
 * @returns {Promise}
 */
export async function fetchAPI(url, options = {}) {
  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const config = { ...defaultOptions, ...options };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

// Log dell'ambiente al caricamento
if (typeof window !== "undefined") {
  console.log("🔧 API Configuration");
  console.log(`   Environment: ${import.meta.env.MODE}`);
  console.log(`   API URL: ${API_BASE_URL}`);
}
