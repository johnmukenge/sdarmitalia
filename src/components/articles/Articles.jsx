import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import articoli from "../../data/articoli";
import ArticleCard from "./ArticleCard";
import Navbar from "../navbar/Navbar";

/**
 * Articles Component - Pagina Principale Articoli
 *
 * Pagina principale per la visualizzazione e filtro degli articoli.
 * Permette di ricercare e filtrare articoli per anno, trimestre e testo.
 *
 * Features:
 * - Griglia responsiva (3 colonne desktop, 2 tablet, 1 mobile)
 * - Ricerca real-time per titolo e autore
 * - Filtri per anno (dinamici dai dati)
 * - Filtri per trimestre (Q1-Q4)
 * - Reset filtri
 * - Ordinamento per data decrescente
 * - Messaggi di feedback (nessun risultato)
 * - Loading states
 *
 * State:
 * @state {Array} articles - Tutti gli articoli caricati
 * @state {Array} filteredArticles - Articoli dopo i filtri
 * @state {boolean} loading - Stato caricamento
 * @state {string} selectedYear - Anno selezionato
 * @state {string} selectedQuarter - Trimestre selezionato
 * @state {string} searchTerm - Termine di ricerca
 *
 * Integrazione Backend:
 * TODO: Sostituire caricamento mock con API call a:
 *   - GET /api/v1/articles?year={year}&quarter={quarter}&search={search}
 */
const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedQuarter, setSelectedQuarter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Carica articoli dal backend o dai dati mock
  useEffect(() => {
    // TODO: Sostituire con chiamata API al backend
    // const fetchArticles = async () => {
    //   try {
    //     const response = await axios.get('http://localhost:5000/api/v1/articoli');
    //     setArticles(response.data.data);
    //     setFilteredArticles(response.data.data);
    //   } catch (error) {
    //     console.error('Errore nel caricamento articoli:', error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // fetchArticles();

    // Per ora usa i dati mock
    // Route: /articoli per la lista, /articoli/:id per il dettaglio
    setArticles(articoli);
    setFilteredArticles(articoli);
    setLoading(false);
  }, []);

  // Filtra gli articoli quando i filtri cambiano
  useEffect(() => {
    let filtered = articles;

    // Filtro per anno
    if (selectedYear) {
      filtered = filtered.filter(
        (article) => article.year.toString() === selectedYear
      );
    }

    // Filtro per trimestre
    if (selectedQuarter) {
      filtered = filtered.filter(
        (article) => article.quarter === selectedQuarter
      );
    }

    // Filtro per ricerca
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (article) =>
          article.title.toLowerCase().includes(lowerSearch) ||
          article.author.toLowerCase().includes(lowerSearch) ||
          article.excerpt.toLowerCase().includes(lowerSearch)
      );
    }

    // Ordina per data decrescente
    filtered.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
    setFilteredArticles(filtered);
  }, [articles, selectedYear, selectedQuarter, searchTerm]);

  // Estrae anni unici dagli articoli
  const years = [...new Set(articles.map((a) => a.year))].sort((a, b) => b - a);
  const quarters = ["Q1", "Q2", "Q3", "Q4"];

  const resetFilters = () => {
    setSelectedYear("");
    setSelectedQuarter("");
    setSearchTerm("");
  };

  const hasActiveFilters = selectedYear || selectedQuarter || searchTerm;

  return (
    <div>
      <Navbar />
      <section className="bg-gradient-to-b from-blue-50 to-white min-h-screen py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Leggi i Nostri Articoli
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl">
              Scopri una raccolta di articoli selezionati su temi di fede,
              spiritualità e vita cristiana.
            </p>
          </div>

          {/* Filtri */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              {/* Ricerca */}
              <div className="relative lg:col-span-2">
                <Search
                  className="absolute left-3 top-3 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Cerca per titolo o autore..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition"
                />
              </div>

              {/* Filtro Anno */}
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition"
              >
                <option value="">Tutti gli anni</option>
                {years.map((year) => (
                  <option key={year} value={year.toString()}>
                    {year}
                  </option>
                ))}
              </select>

              {/* Filtro Trimestre */}
              <select
                value={selectedQuarter}
                onChange={(e) => setSelectedQuarter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition"
              >
                <option value="">Tutti i trimestri</option>
                {quarters.map((quarter) => (
                  <option key={quarter} value={quarter}>
                    {quarter}
                  </option>
                ))}
              </select>
            </div>

            {/* Pulsante Reset Filtri */}
            {hasActiveFilters && (
              <div className="flex items-center gap-2">
                <button
                  onClick={resetFilters}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                >
                  <X size={16} />
                  Azzera filtri
                </button>
                <span className="text-gray-500 text-sm">
                  ({filteredArticles.length} risultati)
                </span>
              </div>
            )}
          </div>

          {/* Lista Articoli */}
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-blue-600 text-lg">
                Caricamento articoli...
              </div>
            </div>
          ) : filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <ArticleCard key={article._id} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="inline-block bg-white rounded-lg shadow-md p-8">
                <p className="text-gray-600 text-lg mb-4">
                  Nessun articolo trovato corrispondente ai filtri selezionati.
                </p>
                <button
                  onClick={resetFilters}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                >
                  Azzera filtri
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Articles;
