import { useEffect, useState } from "react";
import { ChevronDown, Search, Filter, Calendar, Eye } from "lucide-react";
import apiClient from "../../services/apiClient";
import {
  ErrorDisplay,
  LoadingSpinner,
  EmptyState,
} from "../common/ErrorBoundary";

/**
 * News Component - Pagina Notizie
 *
 * Componente per la visualizzazione delle notizie integrato con API backend
 *
 * Features:
 * - Caricamento da API backend
 * - Filtri per categoria
 * - Ricerca per titolo/descrizione
 * - Ordinamento (recente, visualizzazioni)
 * - Statistiche in tempo reale
 * - Loading e error states
 */
/* - Design professionale con colori app (blu, bianco, nero)
 *
 * State:
 * @state {Array} news - Tutte le notizie dal backend/mock
 * @state {Array} displayedNews - Notizie attualmente visualizzate
 * @state {boolean} loading - Stato caricamento
 * @state {number} displayCount - Numero di notizie da visualizzare (incrementa di 5)
 * @state {boolean} hasMore - Se ci sono più notizie da caricare
 */
const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredNews, setFilteredNews] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("recente");
  const [showFilters, setShowFilters] = useState(false);

  // Carica notizie dall'API
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const data = await apiClient.getNews({ limit: 50 });
        setNews(data.data?.news || data.news || []);
        setError(null);
      } catch (err) {
        console.error("Errore nel caricamento delle notizie:", err);
        setError(err.message);
        setNews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // Estrai categorie uniche
  const categories = [
    ...new Set(news.filter((n) => n.category).map((n) => n.category)),
  ].sort();

  // Filtra e ordina
  useEffect(() => {
    let filtered = news.filter((item) => {
      const matchSearch =
        !searchTerm ||
        item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchCategory =
        !selectedCategory || item.category === selectedCategory;

      return matchSearch && matchCategory;
    });

    // Ordinamento
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "recente":
          return (
            new Date(b.createdAt || b.publishedAt) -
            new Date(a.createdAt || a.publishedAt)
          );
        case "anziana":
          return (
            new Date(a.createdAt || a.publishedAt) -
            new Date(b.createdAt || b.publishedAt)
          );
        case "visualizzazioni":
          return (b.views || 0) - (a.views || 0);
        default:
          return 0;
      }
    });

    setFilteredNews(filtered);
  }, [news, searchTerm, selectedCategory, sortBy]);

  const hasActiveFilters = searchTerm || selectedCategory;

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            📰 Ultime Notizie
          </h1>
          <p className="text-xl text-gray-600">
            Rimani aggiornato sulle novità della comunità SDA Italia
          </p>
        </div>

        {/* Errore */}
        {error && (
          <ErrorDisplay
            error={error}
            onRetry={() => window.location.reload()}
            customMessage="Impossibile caricare le notizie. Assicurati che il server sia avviato."
          />
        )}

        {/* Loading */}
        {loading && <LoadingSpinner message="Caricamento notizie..." />}

        {/* Contenuto Principale */}
        {!loading && !error && (
          <>
            {/* Barra di Ricerca */}
            <div className="mb-8 bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <Search className="text-blue-600" size={28} />
                <input
                  type="text"
                  placeholder="Cerca per titolo o descrizione..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                />
              </div>

              {/* Filtri */}
              <div className="flex flex-wrap items-center gap-3 justify-between">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-950 text-white rounded-lg font-semibold hover:bg-blue-900 transition"
                >
                  <Filter size={18} />
                  Filtri
                  {hasActiveFilters && " (1)"}
                  <ChevronDown size={18} />
                </button>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none font-semibold"
                >
                  <option value="recente">Più Recente</option>
                  <option value="anziana">Meno Recente</option>
                  <option value="visualizzazioni">Più Visualizzazioni</option>
                </select>
              </div>

              {/* Filtro Categoria */}
              {showFilters && categories.length > 0 && (
                <div className="mt-6 pt-6 border-t-2 border-gray-300">
                  <h4 className="font-semibold text-gray-800 mb-4">
                    Categoria
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        value=""
                        checked={!selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-4 h-4"
                      />
                      <span className="text-gray-700">
                        Tutte ({news.length})
                      </span>
                    </label>
                    {categories.map((cat) => (
                      <label
                        key={cat}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="category"
                          value={cat}
                          checked={selectedCategory === cat}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="w-4 h-4"
                        />
                        <span className="text-gray-700">
                          {cat} ({news.filter((n) => n.category === cat).length}
                          )
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Statistiche */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Totale Notizie</p>
                    <p className="text-3xl font-bold text-blue-600">
                      {news.length}
                    </p>
                  </div>
                  <Calendar className="text-blue-600" size={32} />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Categorie</p>
                    <p className="text-3xl font-bold text-green-600">
                      {categories.length}
                    </p>
                  </div>
                  <Filter className="text-green-600" size={32} />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Visualizzazioni</p>
                    <p className="text-3xl font-bold text-orange-600">
                      {news.reduce((sum, n) => sum + (n.views || 0), 0)}
                    </p>
                  </div>
                  <Eye className="text-orange-600" size={32} />
                </div>
              </div>
            </div>

            {/* Griglia Notizie */}
            {filteredNews.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredNews.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                  >
                    {/* Immagine */}
                    <div className="h-48 bg-gray-100 overflow-hidden flex items-center justify-center group">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-50" />
                      )}
                    </div>

                    {/* Contenuto */}
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-bold bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                          {item.category || "Notizia"}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                        {item.title}
                      </h3>

                      <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                        {item.description || item.content}
                      </p>

                      <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-200">
                        <span>
                          📅{" "}
                          {new Date(
                            item.createdAt || item.publishedAt
                          ).toLocaleDateString("it-IT")}
                        </span>
                        <span>👁️ {item.views || 0}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                title="Nessuna notizia trovata"
                message="Prova a modificare i filtri di ricerca"
                actionButton={
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategory("");
                    }}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                  >
                    Resetta Filtri
                  </button>
                }
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default News;
