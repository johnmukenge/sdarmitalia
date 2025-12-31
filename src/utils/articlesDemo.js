/**
 * DEMO E TESTING UTILITIES
 *
 * Questo file mostra come usare i componenti e le utility helper
 * Utile per sviluppare senza il backend
 */

import articoli from "../data/articoli.js";
import {
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
} from "./articleHelpers.js";

// ============================================
// DEMO DELLA STRUTTURA DATI
// ============================================

export const demonstrateDataStructure = () => {
  console.log("=== DEMO STRUTTURA DATI ===");
  console.log("Primo articolo:", articoli[0]);
  console.log("Numero totale articoli:", articoli.length);
};

// ============================================
// DEMO DEI FILTRI
// ============================================

export const demonstrateFilters = () => {
  console.log("\n=== DEMO FILTRI ===");

  // Filtro per anno
  const articles2024 = filterByYear(articoli, 2024);
  console.log("Articoli del 2024:", articles2024.length);

  // Filtro per trimestre
  const articlesQ1 = filterByQuarter(articoli, "Q1");
  console.log("Articoli del Q1:", articlesQ1.length);

  // Ricerca
  const searchResults = searchArticles(articoli, "Nuovo");
  console.log('Risultati ricerca "Nuovo":', searchResults.length);

  // Filtri combinati
  const combined = applyFilters(articoli, {
    year: 2024,
    quarter: "Q1",
    search: "Presidente",
  });
  console.log(
    'Filtri combinati (anno 2024, Q1, "Presidente"):',
    combined.length
  );
};

// ============================================
// DEMO DELL'ORDINAMENTO
// ============================================

export const demonstrateSorting = () => {
  console.log("\n=== DEMO ORDINAMENTO ===");

  const sorted = sortByDate(articoli, "desc");
  console.log("Articoli ordinati per data (più recente):", sorted[0].title);
  console.log("Data:", formatDate(sorted[0].publishedAt));
};

// ============================================
// DEMO DEL RAGGRUPPAMENTO
// ============================================

export const demonstrateGrouping = () => {
  console.log("\n=== DEMO RAGGRUPPAMENTO ===");

  const byYear = groupByYear(articoli);
  console.log("Articoli raggruppati per anno:", byYear);

  const byQuarter = groupByQuarter(articoli);
  console.log("Articoli raggruppati per trimestre:", byQuarter);
};

// ============================================
// DEMO DELLA PAGINAZIONE
// ============================================

export const demonstratePagination = () => {
  console.log("\n=== DEMO PAGINAZIONE ===");

  const page1 = paginateArticles(articoli, 1, 3);
  console.log("Pagina 1 (3 articoli per pagina):", {
    count: page1.articles.length,
    total: page1.total,
    pages: page1.pages,
    currentPage: page1.currentPage,
    hasNextPage: page1.hasNextPage,
  });

  console.log(
    "Articoli pagina 1:",
    page1.articles.map((a) => a.title)
  );
};

// ============================================
// DEMO DEGLI ARTICOLI CORRELATI
// ============================================

export const demonstrateRelatedArticles = () => {
  console.log("\n=== DEMO ARTICOLI CORRELATI ===");

  const firstArticle = articoli[0];
  const related = getRelatedArticles(articoli, firstArticle, 3);

  console.log(`Articoli correlati a "${firstArticle.title}":`, related.length);
  related.forEach((a) => console.log(`- ${a.title}`));
};

// ============================================
// DEMO DELLE UTILITY DI FORMATTAZIONE
// ============================================

export const demonstrateFormatting = () => {
  console.log("\n=== DEMO FORMATTAZIONE ===");

  const date = articoli[0].publishedAt;
  console.log("Data originale:", date);
  console.log("Formato completo:", formatDate(date));
  console.log("Formato breve:", formatDateShort(date));

  const longText =
    articoli[0].excerpt +
    " Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod.";
  console.log("Testo originale:", longText);
  console.log("Testo troncato (80 car):", truncateText(longText, 80));
};

// ============================================
// DEMO DEI DATI DISPONIBILI
// ============================================

export const demonstrateAvailableData = () => {
  console.log("\n=== DATI DISPONIBILI ===");

  const years = extractYears(articoli);
  console.log("Anni disponibili:", years);

  console.log("\nDettagli per anno:");
  years.forEach((year) => {
    const byYear = filterByYear(articoli, year);
    console.log(`- ${year}: ${byYear.length} articoli`);
  });

  console.log("\nDettagli per trimestre:");
  ["Q1", "Q2", "Q3", "Q4"].forEach((quarter) => {
    const byQuarter = filterByQuarter(articoli, quarter);
    console.log(`- ${quarter}: ${byQuarter.length} articoli`);
  });
};

// ============================================
// ESEGUIRE TUTTE LE DEMO
// ============================================

export const runAllDemos = () => {
  demonstrateDataStructure();
  demonstrateFilters();
  demonstrateSorting();
  demonstrateGrouping();
  demonstratePagination();
  demonstrateRelatedArticles();
  demonstrateFormatting();
  demonstrateAvailableData();

  console.log("\n=== DEMO COMPLETATE ===");
  console.log("Apri la console del browser per vedere i risultati");
};

// Uncomment per eseguire le demo
// runAllDemos();

export default {
  demonstrateDataStructure,
  demonstrateFilters,
  demonstrateSorting,
  demonstrateGrouping,
  demonstratePagination,
  demonstrateRelatedArticles,
  demonstrateFormatting,
  demonstrateAvailableData,
  runAllDemos,
};
