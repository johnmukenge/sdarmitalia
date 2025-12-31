import Navbar from "../navbar/Navbar";
//import axios from "axios";
import { useEffect, useState } from "react";
import NewsData from "../../data/news";
import {
  Instagram,
  Facebook,
  MessageCircle,
  Twitter,
  ChevronDown,
  Download,
} from "lucide-react";

/**
 * News Component - Pagina Notizie
 *
 * Componente per la visualizzazione delle notizie con:
 * - Caricamento progressivo (infinite scroll / load more)
 * - Supporto per immagini e video YouTube
 * - Pulsanti di condivisione social
 * - Layout professionale e responsive
 * - Dati da API backend o mock data
 *
 * Features:
 * - Carica 5 notizie inizialmente
 * - Pulsante "Carica altri" per aggiungere più contenuti
 * - Layout a 3 colonne (immagine + testo)
 * - Supporto YouTube embed
 * - Social share buttons
 * - Loading state durante il caricamento
 * - Design professionale con colori app (blu, bianco, nero)
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
  const [displayedNews, setDisplayedNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [displayCount, setDisplayCount] = useState(5);
  const [hasMore, setHasMore] = useState(true);

  /**
   * Carica tutte le notizie dal backend o dai dati mock
   */
  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        // TODO: Sostituire con chiamata API al backend quando disponibile
        // const response = await axios.get("http://localhost:5000/api/v1/news");
        // if (response.status === 200 && Array.isArray(response.data.data.news)) {
        //   const processedData = response.data.data.news.map((notizia, idx) => ({
        //     ...notizia,
        //     sno: idx + 1
        //   }));
        //   setNews(processedData);
        // }

        // Per ora usa i dati mock
        if (Array.isArray(NewsData)) {
          const processedData = NewsData.map((notizia, idx) => ({
            _id: notizia._id,
            sno: idx + 1,
            title: notizia.title,
            subtitle: notizia.subtitle || "",
            content: notizia.content,
            image: notizia.image,
            author: notizia.author,
            publishedAt: notizia.publishedAt,
            youtubeId: notizia.youtubeId,
            motto: notizia.motto,
            verse: notizia.verse,
            periodo: notizia.periodo,
            luogo: notizia.luogo,
          }));
          setNews(processedData);
        }
      } catch (error) {
        console.error("Errore nel caricamento notizie:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  /**
   * Aggiorna le notizie visualizzate quando displayCount cambia
   */
  useEffect(() => {
    if (news.length > 0) {
      const displayed = news.slice(0, displayCount);
      setDisplayedNews(displayed);
      setHasMore(displayCount < news.length);
    }
  }, [displayCount, news]);

  /**
   * Carica altre 5 notizie
   */
  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + 5);
  };

  /**
   * Formatta la data di pubblicazione
   */
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString.data || dateString);
      return date.toLocaleDateString("it-IT", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return "Data non disponibile";
    }
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <Navbar />

      {/* Header */}
      <div className="container mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Notizie</h1>
        <p className="text-xl md:text-2xl text-black">
          Resta aggiornato sugli ultimi eventi e attività della comunità
        </p>
      </div>

      {/* News Container */}
      <section className="container mx-auto py-12 px-4">
        {loading && displayedNews.length === 0 ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="inline-block animate-spin mb-4">
                <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full"></div>
              </div>
              <p className="text-gray-600 text-lg">Caricamento notizie...</p>
            </div>
          </div>
        ) : displayedNews.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-600 text-lg">
              Nessuna notizia disponibile al momento.
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-8">
              {displayedNews.map((notizia) => (
                <article
                  key={notizia._id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                    {/* Colonna 1: Media (Immagine/Video) */}
                    <div className="md:col-span-1 bg-gray-100 h-80 md:h-auto overflow-hidden flex items-center justify-center group">
                      {notizia.youtubeId ? (
                        <div className="w-full aspect-video">
                          <iframe
                            className="w-full h-full"
                            src={`https://www.youtube.com/embed/${notizia.youtubeId}`}
                            title={notizia.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        </div>
                      ) : notizia.image ? (
                        <img
                          src={notizia.image}
                          alt={notizia.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
                          <span className="text-gray-400 text-center px-4">
                            Nessuna immagine disponibile
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Colonna 2-3: Contenuto */}
                    <div className="md:col-span-2 p-8 md:p-10 flex flex-col">
                      {/* Header con date e categoria */}
                      <div className="mb-4">
                        <div className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                          Notizia
                        </div>
                        <p className="text-sm text-gray-500">
                          📅 {formatDate(notizia.publishedAt)}
                        </p>
                      </div>

                      {/* Titolo */}
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3 line-clamp-2 hover:text-blue-600 transition-colors duration-300">
                        {notizia.title}
                      </h2>

                      {/* Sottotitolo opzionale */}
                      {notizia.subtitle && (
                        <p className="text-lg text-gray-600 mb-4 italic">
                          {notizia.subtitle}
                        </p>
                      )}

                      {/* Metadati opzionali */}
                      <div className="space-y-1 mb-4 text-gray-600">
                        {notizia.motto && (
                          <p className="font-semibold">💭 {notizia.motto}</p>
                        )}
                        {notizia.verse && (
                          <p className="text-sm">📖 {notizia.verse}</p>
                        )}
                        {notizia.periodo && (
                          <p className="text-sm">⏰ {notizia.periodo}</p>
                        )}
                        {notizia.luogo && (
                          <p className="text-sm">📍 {notizia.luogo}</p>
                        )}
                      </div>

                      {/* Contenuto principale */}
                      <p className="text-gray-700 mb-6 flex-grow leading-relaxed line-clamp-3">
                        {notizia.content}
                      </p>

                      {/* Autore */}
                      {notizia.author && (
                        <p className="text-gray-600 font-semibold mb-6 pb-6 border-b border-gray-200">
                          👤{" "}
                          <span className="text-blue-600">
                            {notizia.author}
                          </span>
                        </p>
                      )}

                      {/* Leggi di più Button 
                      <div className="mb-6">
                        <a
                          href={`/news/${notizia._id}`}
                          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                        >
                          Leggi di più
                          <ChevronDown size={18} className="rotate-[-90deg]" />
                        </a>
                      </div>*/}

                      {/* Download Invito - Italiano e Inglese */}
                      <div className="mb-8 pb-8 border-b border-gray-200">
                        <h4 className="text-sm font-bold text-gray-600 uppercase tracking-wider mb-4">
                          Scarica l invito
                        </h4>
                        <div className="flex flex-wrap gap-3">
                          <a
                            href="#"
                            className="inline-flex items-center gap-2 bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                            title="Scarica invito in italiano"
                          >
                            <Download size={16} />
                            Italiano
                          </a>
                          <a
                            href="#"
                            className="inline-flex items-center gap-2 bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                            title="Scarica invito in inglese"
                          >
                            <Download size={16} />
                            English
                          </a>
                        </div>
                      </div>

                      {/* Social Share Buttons */}
                      <div className="flex items-center gap-4">
                        <span className="text-gray-600 font-semibold text-sm">
                          Condividi:
                        </span>

                        {/* Instagram */}
                        <a
                          href={`https://www.instagram.com/?url=${encodeURIComponent(
                            window.location.origin
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:shadow-lg transition-all duration-200 transform hover:scale-110"
                          title="Condividi su Instagram"
                        >
                          <Instagram size={18} />
                        </a>

                        {/* Facebook */}
                        <a
                          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                            window.location.origin
                          )}&quote=${encodeURIComponent(notizia.title)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white hover:shadow-lg transition-all duration-200 transform hover:scale-110"
                          title="Condividi su Facebook"
                        >
                          <Facebook size={18} />
                        </a>

                        {/* WhatsApp */}
                        <a
                          href={`https://wa.me/?text=${encodeURIComponent(
                            `${notizia.title} - ${notizia.content} ${window.location.origin}`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-green-500 text-white hover:shadow-lg transition-all duration-200 transform hover:scale-110"
                          title="Condividi su WhatsApp"
                        >
                          <MessageCircle size={18} />
                        </a>

                        {/* Twitter/X */}
                        <a
                          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                            notizia.title
                          )}&url=${encodeURIComponent(window.location.origin)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-sky-500 text-white hover:shadow-lg transition-all duration-200 transform hover:scale-110"
                          title="Condividi su Twitter"
                        >
                          <Twitter size={18} />
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="mt-12 flex justify-center">
                <button
                  onClick={handleLoadMore}
                  disabled={loading}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-10 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>Carica altri articoli</span>
                  <ChevronDown size={20} />
                </button>
              </div>
            )}

            {/* Fine risultati */}
            {!hasMore && displayedNews.length > 5 && (
              <div className="mt-12 text-center">
                <p className="text-gray-600 text-lg">
                  ✅ Hai visualizzato tutti i {displayedNews.length} articoli
                  disponibili
                </p>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default News;
