import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Calendar, Eye } from "lucide-react";
import apiClient from "../../services/apiClient";
import notizie from "../../data/notizie";

/**
 * NewsSlider Component - Carousel di notizie per homepage
 *
 * Features:
 * - Carousel automatico
 * - Controlli manuali (prev/next)
 * - Indicators (puntini)
 * - Responsive
 * - "Leggi di più" button
 * - Metadata professionali
 */
const NewsSlider = ({ limit = 5 }) => {
  const navigate = useNavigate();
  const [newsItems, setNewsItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);

        // Prova prima a caricare dalla API del database
        console.log(`📰 Caricamento news da API con limit=${limit}`);
        const data = await apiClient.getNews({ limit });

        // Estrai i dati dalla risposta API
        let items = data.data?.news || data.news || [];

        if (items && items.length > 0) {
          // 🔄 Ordina per data di pubblicazione (più recenti prima)
          items.sort(
            (a, b) =>
              new Date(b.createdAt || b.publishedAt) -
              new Date(a.createdAt || a.publishedAt)
          );

          console.log(`✅ API: ${items.length} notizie caricate dal database`);
          setNewsItems(items);
          setLoading(false);
          return;
        } else {
          throw new Error("Nessuna notizia trovata nell'API");
        }
      } catch (apiErr) {
        // Se API fallisce, usa il fallback locale
        console.warn(
          "⚠️ API fallback - caricamento da dati locali:",
          apiErr.message
        );
        let localNews = notizie.slice(0, limit);
        // 🔄 Ordina per data di pubblicazione (più recenti prima)
        localNews.sort(
          (a, b) =>
            new Date(b.createdAt || b.publishedAt) -
            new Date(a.createdAt || a.publishedAt)
        );
        setNewsItems(localNews);
        setLoading(false);
      }
    };

    fetchNews();
  }, [limit]);

  // Auto-play
  useEffect(() => {
    if (!autoPlay || newsItems.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % newsItems.length);
    }, 5000); // Cambia ogni 5 secondi

    return () => clearInterval(interval);
  }, [autoPlay, newsItems.length]);

  const goToPrevious = () => {
    setAutoPlay(false);
    setCurrentIndex((prev) => (prev === 0 ? newsItems.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setAutoPlay(false);
    setCurrentIndex((prev) => (prev + 1) % newsItems.length);
  };

  const goToSlide = (index) => {
    setAutoPlay(false);
    setCurrentIndex(index);
  };

  if (loading || newsItems.length === 0) {
    return (
      <div className="bg-gradient-to-r from-blue-100 to-blue-50 rounded-xl overflow-hidden">
        <div className="h-96 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 animate-spin mb-4">
              <div className="w-8 h-8 rounded-full bg-blue-100"></div>
            </div>
            <p className="text-gray-600 font-semibold">
              Caricamento notizie...
            </p>
          </div>
        </div>
      </div>
    );
  }

  const currentNews = newsItems[currentIndex];

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("it-IT", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return "";
    }
  };

  return (
    <div
      className="relative rounded-xl overflow-hidden shadow-xl h-96 md:h-[500px] group"
      onMouseEnter={() => setAutoPlay(false)}
      onMouseLeave={() => setAutoPlay(true)}
    >
      {/* Carousel Container */}
      <div className="relative w-full h-full">
        {newsItems.map((news, index) => (
          <div
            key={news._id || news.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Background Image */}
            <div className="absolute inset-0 bg-gray-900">
              {news.image && (
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-full object-cover"
                />
              )}
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
              {/* Category */}
              {news.category && (
                <div className="mb-3">
                  <span className="text-xs font-bold bg-blue-600 px-3 py-1 rounded-full uppercase tracking-wider">
                    {news.category}
                  </span>
                </div>
              )}

              {/* Title */}
              <h2 className="text-2xl md:text-4xl font-bold mb-3 line-clamp-2">
                {news.title}
              </h2>

              {/* Subtitle */}
              {news.sottoTitolo && (
                <p className="text-lg text-gray-200 mb-4 line-clamp-1">
                  {news.sottoTitolo}
                </p>
              )}

              {/* Description */}
              <p className="text-sm md:text-base text-gray-300 mb-6 line-clamp-2">
                {news.description || news.content}
              </p>

              {/* Metadata & Button */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-6 text-xs md:text-sm text-gray-300">
                  <div className="flex items-center gap-1">
                    <Calendar size={16} />
                    <span>
                      {formatDate(news.publishedAt || news.createdAt)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye size={16} />
                    <span>{news.views || 0}</span>
                  </div>
                </div>

                {/* Read More Button */}
                <button
                  onClick={() => navigate(`/news/${news.id || news._id}`)}
                  className="self-start sm:self-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg active:scale-95"
                >
                  Leggi di più →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-all duration-300 backdrop-blur-sm opacity-0 group-hover:opacity-100"
        aria-label="Previous news"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-all duration-300 backdrop-blur-sm opacity-0 group-hover:opacity-100"
        aria-label="Next news"
      >
        <ChevronRight size={24} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {newsItems.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-white w-8"
                : "bg-white/50 w-2 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Counter */}
      <div className="absolute top-4 right-4 z-20 bg-black/40 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold">
        {currentIndex + 1} / {newsItems.length}
      </div>
    </div>
  );
};

export default NewsSlider;
