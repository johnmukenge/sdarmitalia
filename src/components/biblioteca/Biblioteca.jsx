import { useState, useEffect } from "react";
import {
  Search,
  X,
  Filter,
  Volume2,
  ChevronDown,
  Calendar,
  BookOpen,
} from "lucide-react";
import LibroCard from "./LibroCard";
import apiClient from "../../services/apiClient";

const Biblioteca = () => {
  const [libri, setLibri] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredLibri, setFilteredLibri] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategoria, setSelectedCategoria] = useState("");
  const [selectedAnno, setSelectedAnno] = useState("");
  const [sortBy, setSortBy] = useState("recente");
  const [showFilters, setShowFilters] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentTts, setCurrentTts] = useState(null);

  // Carica libri dall'API
  useEffect(() => {
    const fetchLibri = async () => {
      try {
        setLoading(true);
        const data = await apiClient.getLibri({ limit: 100 });
        setLibri(data.data?.libri || data.libri || []);
        setError(null);
      } catch (err) {
        console.error("Errore nel caricamento dei libri:", err.message);
        setError(
          err.message.includes("Failed to fetch")
            ? "Impossibile raggiungere il server. Assicurati che il backend sia avviato su http://localhost:5000"
            : "Impossibile caricare i libri. Riprova più tardi."
        );
        setLibri([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLibri();
  }, []);

  // Estrai categorie e anni unici dai libri
  const categorie = [...new Set(libri.map((l) => l.category))].sort();
  const anni = [
    ...new Set(
      libri
        .map((l) =>
          l.publicationDate ? new Date(l.publicationDate).getFullYear() : null
        )
        .filter(Boolean)
    ),
  ].sort((a, b) => b - a);

  // Applicazione filtri
  useEffect(() => {
    let result = [...libri];

    // Filtro per ricerca
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (l) =>
          l.title.toLowerCase().includes(term) ||
          l.author.toLowerCase().includes(term) ||
          l.description.toLowerCase().includes(term)
      );
    }

    // Filtro per categoria
    if (selectedCategoria) {
      result = result.filter((l) => l.category === selectedCategoria);
    }

    // Filtro per anno
    if (selectedAnno) {
      result = result.filter((l) => {
        const year = l.publicationDate
          ? new Date(l.publicationDate).getFullYear()
          : null;
        return year === parseInt(selectedAnno);
      });
    }

    // Ordinamento
    switch (sortBy) {
      case "recente":
        result.sort(
          (a, b) =>
            new Date(b.publicationDate || 0) - new Date(a.publicationDate || 0)
        );
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "titolo-asc":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "titolo-desc":
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "scaricamenti":
        result.sort((a, b) => b.downloads - a.downloads);
        break;
      default:
        break;
    }

    setFilteredLibri(result);
  }, [libri, searchTerm, selectedCategoria, selectedAnno, sortBy]);

  // Gestione TTS
  const handleTtsClick = (libro) => {
    if (isSpeaking && currentTts?._id === libro._id) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setCurrentTts(null);
    } else {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();

        const text = `${libro.title}. Scritto da ${libro.author}. ${libro.description}`;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        utterance.pitch = 1;
        utterance.volume = 1;

        const voices = window.speechSynthesis.getVoices();
        const italianVoice = voices.find((voice) => voice.lang.includes("it"));
        if (italianVoice) {
          utterance.voice = italianVoice;
        }

        utterance.onstart = () => {
          setIsSpeaking(true);
          setCurrentTts(libro);
        };
        utterance.onend = () => {
          setIsSpeaking(false);
          setCurrentTts(null);
        };
        utterance.onerror = () => {
          setIsSpeaking(false);
          setCurrentTts(null);
        };

        window.speechSynthesis.speak(utterance);
      }
    }
  };

  // Reset filtri
  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategoria("");
    setSelectedAnno("");
    setSortBy("recente");
  };

  const hasActiveFilters =
    searchTerm || selectedCategoria || selectedAnno || sortBy !== "recente";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Biblioteca Digitale
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-600 to-green-600 mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Scopri una vasta collezione di libri spirituali, educativi e
            ispiranti. Leggi online con la funzione di lettura vocale.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-flex items-center gap-2">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-lg text-gray-600">
                Caricamento libri...
              </span>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-50 border-2 border-red-300 rounded-lg p-6 mb-8 text-center">
            <p className="text-red-700 font-semibold text-lg">{error}</p>
            <p className="text-red-600 mt-2">
              Controlla che il server sia acceso su http://localhost:5000
            </p>
          </div>
        )}

        {/* Main Content */}
        {!loading && !error && (
          <>
            {/* Barra di Ricerca Principale */}
            <div className="mb-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Search className="text-blue-600" size={28} />
                  <input
                    type="text"
                    placeholder="Cerca per titolo, autore o descrizione..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none text-lg"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="p-2 hover:bg-gray-100 rounded-lg transition"
                    >
                      <X size={24} className="text-gray-600" />
                    </button>
                  )}
                </div>

                {/* Filtri e Ordinamento */}
                <div className="flex flex-wrap items-center gap-3 justify-between">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-950 text-white rounded-lg font-semibold hover:bg-blue-900 transition"
                  >
                    <Filter size={18} />
                    Filtri
                    {hasActiveFilters &&
                      ` (${
                        Object.values({
                          searchTerm,
                          selectedCategoria,
                          selectedAnno,
                        }).filter(Boolean).length
                      })`}
                    <ChevronDown
                      size={18}
                      className={`transition-transform ${
                        showFilters ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 bg-green-100 text-green-700 rounded-lg font-semibold border-0 cursor-pointer hover:bg-green-200 transition"
                  >
                    <option value="recente">Più Recenti</option>
                    <option value="rating">Top Rated</option>
                    <option value="scaricamenti">Più Scaricati</option>
                    <option value="titolo-asc">Titolo (A-Z)</option>
                    <option value="titolo-desc">Titolo (Z-A)</option>
                  </select>

                  {hasActiveFilters && (
                    <button
                      onClick={resetFilters}
                      className="px-4 py-2 bg-blue-950 text-white rounded-lg font-semibold hover:bg-blue-900 transition flex items-center gap-2"
                    >
                      <X size={18} />
                      Resetta Filtri
                    </button>
                  )}
                </div>
              </div>

              {/* Panel Filtri Espandibile */}
              {showFilters && (
                <div className="mt-4 bg-white rounded-xl shadow-lg p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Filtro Categoria */}
                    <div>
                      <label className="flex text-sm font-bold text-gray-700 mb-3 items-center gap-2">
                        <BookOpen size={18} />
                        Categoria
                      </label>
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        <label className="flex items-center gap-2 cursor-pointer hover:text-blue-600">
                          <input
                            type="radio"
                            checked={selectedCategoria === ""}
                            onChange={() => setSelectedCategoria("")}
                            className="w-4 h-4"
                          />
                          <span>Tutte le Categorie</span>
                        </label>
                        {categorie.map((cat) => (
                          <label
                            key={cat}
                            className="flex items-center gap-2 cursor-pointer hover:text-blue-600"
                          >
                            <input
                              type="radio"
                              checked={selectedCategoria === cat}
                              onChange={() => setSelectedCategoria(cat)}
                              className="w-4 h-4"
                            />
                            <span className="capitalize">{cat}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Filtro Anno */}
                    <div>
                      <label className="flex text-sm font-bold text-gray-700 mb-3 items-center gap-2">
                        <Calendar size={18} />
                        Anno Pubblicazione
                      </label>
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        <label className="flex items-center gap-2 cursor-pointer hover:text-blue-600">
                          <input
                            type="radio"
                            checked={selectedAnno === ""}
                            onChange={() => setSelectedAnno("")}
                            className="w-4 h-4"
                          />
                          <span>Tutti gli Anni</span>
                        </label>
                        {anni.map((anno) => (
                          <label
                            key={anno}
                            className="flex items-center gap-2 cursor-pointer hover:text-blue-600"
                          >
                            <input
                              type="radio"
                              checked={selectedAnno === anno.toString()}
                              onChange={() => setSelectedAnno(anno.toString())}
                              className="w-4 h-4"
                            />
                            <span>{anno}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Info Funzioni */}
                    <div>
                      <label className="flex text-sm font-bold text-gray-700 mb-3 items-center gap-2">
                        <Volume2 size={18} />
                        Funzioni Disponibili
                      </label>
                      <div className="space-y-3">
                        <div className="bg-green-50 rounded-lg p-3 text-center">
                          <p className="text-sm font-semibold text-green-700">
                            ✓ Lettura Vocale
                          </p>
                          <p className="text-xs text-green-600">
                            Disponibile su tutti i libri
                          </p>
                        </div>
                        <div className="bg-blue-50 rounded-lg p-3 text-center">
                          <p className="text-sm font-semibold text-blue-700">
                            ✓ Leggi Online
                          </p>
                          <p className="text-xs text-blue-600">
                            Accesso immediato
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Statistiche */}
            {libri.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                <div className="bg-white rounded-lg shadow p-4 text-center">
                  <p className="text-3xl font-bold text-blue-600">
                    {libri.length}
                  </p>
                  <p className="text-gray-600 text-sm font-semibold">
                    Libri Totali
                  </p>
                </div>
                <div className="bg-white rounded-lg shadow p-4 text-center">
                  <p className="text-3xl font-bold text-green-600">
                    {categorie.length}
                  </p>
                  <p className="text-gray-600 text-sm font-semibold">
                    Categorie
                  </p>
                </div>
                <div className="bg-white rounded-lg shadow p-4 text-center">
                  <p className="text-3xl font-bold text-purple-600">
                    {libri
                      .reduce((sum, l) => sum + l.downloads, 0)
                      .toLocaleString()}
                  </p>
                  <p className="text-gray-600 text-sm font-semibold">
                    Download Totali
                  </p>
                </div>
                <div className="bg-white rounded-lg shadow p-4 text-center">
                  <p className="text-3xl font-bold text-orange-600">
                    {libri.filter((l) => l.featured).length}
                  </p>
                  <p className="text-gray-600 text-sm font-semibold">
                    In Evidenza
                  </p>
                </div>
              </div>
            )}

            {/* Griglia Libri */}
            {filteredLibri.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredLibri.map((libro) => (
                  <LibroCard
                    key={libro._id}
                    libro={libro}
                    onTtsClick={handleTtsClick}
                    isSpeaking={isSpeaking && currentTts?._id === libro._id}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <BookOpen size={64} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Nessun Libro Trovato
                </h3>
                <p className="text-gray-600 mb-6">
                  Prova a modificare i filtri o i termini di ricerca.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Resetta Tutti i Filtri
                </button>
              </div>
            )}

            {/* Footer Info */}
            <div className="mt-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl shadow-lg p-8 text-white text-center">
              <h2 className="text-2xl font-bold mb-4">
                Funzioni della Biblioteca
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-lg font-semibold mb-2">📖 Leggi Online</p>
                  <p className="text-blue-100 text-sm">
                    Accedi a tutti i libri direttamente dal browser
                  </p>
                </div>
                <div>
                  <p className="text-lg font-semibold mb-2">
                    🔊 Lettura Vocale
                  </p>
                  <p className="text-blue-100 text-sm">
                    Ascolta i libri con la tecnologia text-to-speech
                  </p>
                </div>
                <div>
                  <p className="text-lg font-semibold mb-2">
                    🔍 Ricerca Avanzata
                  </p>
                  <p className="text-blue-100 text-sm">
                    Filtra per categoria, anno e disponibilità
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Biblioteca;
