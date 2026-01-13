import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, User, Eye, Tag, Share2 } from "lucide-react";
import apiClient from "../../services/apiClient";
import notizie from "../../data/notizie";
import { ErrorDisplay, LoadingSpinner } from "../common/ErrorBoundary";

/**
 * NewsDetails Component - Pagina Dettaglio Singola Notizia
 *
 * Features:
 * - Visualizzazione contenuto completo
 * - Metadata professionali (data, autore, visualizzazioni)
 * - Categoria badge
 * - Immagine hero responsive
 * - Related news suggerite
 * - Bottone torna indietro
 * - Share functionality
 */
const NewsDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [newsItem, setNewsItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);

  // 📊 Le views vengono incrementate automaticamente dal server quando viene caricata la notizia
  // Non è necessario un incremento client-side perché avviene nel getNews() endpoint
  // Il server usa MongoDB $inc operator per un'operazione atomica

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        console.log(`🔍 useParams id: "${id}"`);

        // 1️⃣ Prova a caricare singola notizia da API usando ID
        try {
          console.log(`📄 Caricamento notizia ID: ${id} da API`);
          const data = await apiClient.getNewsByid(id);
          const found = data.data?.news || data.news;

          if (found) {
            console.log(`✅ Notizia trovata:`, found.title);
            setNewsItem(found);
            setError(null);

            // 2️⃣ Carica notizie correlate (stessa categoria)
            try {
              const allNewsData = await apiClient.getNews({ limit: 50 });
              const allNews = allNewsData.data?.news || allNewsData.news || [];
              console.log(`📚 Total news disponibili: ${allNews.length}`);

              const related = allNews
                .filter(
                  (n) =>
                    n.category === found.category &&
                    n._id !== found._id &&
                    n.id !== found.id
                )
                .slice(0, 3);

              console.log(
                `🔗 Notizie correlate trovate: ${related.length}`,
                related.map((r) => r.title)
              );
              setRelatedNews(related);
            } catch (relErr) {
              console.warn(
                "⚠️ Errore caricamento notizie correlate:",
                relErr.message
              );
              // Fallback a notizie locali correlate
              const related = notizie
                .filter(
                  (n) => n.category === found.category && n.id !== found.id
                )
                .slice(0, 3);
              setRelatedNews(related);
            }

            return;
          }
        } catch (apiErr) {
          console.warn(
            "⚠️ API fallback - notizia non trovata da API:",
            apiErr.message
          );
        }

        // 3️⃣ Fallback al file locale
        console.log("📚 Fallback a dati locali");
        const found = notizie.find(
          (item) => item.id === parseInt(id) || item._id === id
        );
        if (found) {
          console.log(`✅ Notizia trovata localmente:`, found.title);
          setNewsItem(found);
          // Trova notizie correlate
          const related = notizie
            .filter((n) => n.category === found.category && n.id !== found.id)
            .slice(0, 3);
          setRelatedNews(related);
          setError(null);
        } else {
          console.error("❌ Notizia non trovata - nè da API nè localmente");
          setError("Notizia non trovata");
          setNewsItem(null);
        }
      } catch (err) {
        console.error("Errore nel caricamento della notizia:", err);
        setError(err.message);
        setNewsItem(null);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [id]);

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("it-IT", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return "Data non disponibile";
    }
  };

  const handleShare = () => {
    if (navigator.share && newsItem) {
      navigator.share({
        title: newsItem.title,
        text: newsItem.description || newsItem.content,
        url: window.location.href,
      });
    }
  };

  if (loading) {
    return <LoadingSpinner message="Caricamento notizia..." />;
  }

  if (error || !newsItem) {
    return (
      <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <ErrorDisplay
            error={error || "Notizia non trovata"}
            onRetry={() => navigate("/news")}
            customMessage="La notizia che cerchi non esiste o è stata rimossa."
          />
          <div className="mt-8 text-center">
            <button
              onClick={() => navigate("/news")}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              <ArrowLeft size={20} />
              Torna alle notizie
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
      {/* Header with back button */}
      <section className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <button
            onClick={() => navigate("/news")}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold transition-colors group"
          >
            <ArrowLeft
              size={20}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Torna alle notizie
          </button>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero Image */}
        {newsItem.image && (
          <div className="mb-8 rounded-xl overflow-hidden shadow-xl h-96">
            <img
              src={newsItem.image}
              alt={newsItem.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Article Content */}
        <article className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-8 md:p-12">
            {/* Category Badge */}
            {newsItem.category && (
              <div className="flex items-center gap-2 mb-4">
                <Tag size={16} className="text-blue-600" />
                <span className="text-xs font-bold bg-blue-100 text-blue-700 px-4 py-2 rounded-full uppercase tracking-wider">
                  {newsItem.category}
                </span>
              </div>
            )}

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              {newsItem.title}
            </h1>

            {/* Subtitle */}
            {newsItem.sottoTitolo && (
              <p className="text-xl text-gray-600 mb-8 italic border-l-4 border-blue-600 pl-4">
                {newsItem.sottoTitolo}
              </p>
            )}

            {/* Metadata */}
            <div className="mb-8 pb-8 border-b-2 border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
                {/* Date */}
                <div className="flex items-start gap-3">
                  <Calendar
                    className="text-blue-600 mt-1 flex-shrink-0"
                    size={18}
                  />
                  <div>
                    <p className="text-gray-500 font-medium">Pubblicato</p>
                    <p className="text-gray-800 font-semibold">
                      {formatDate(newsItem.publishedAt || newsItem.createdAt)}
                    </p>
                  </div>
                </div>

                {/* Author */}
                {newsItem.autore && (
                  <div className="flex items-start gap-3">
                    <User
                      className="text-blue-600 mt-1 flex-shrink-0"
                      size={18}
                    />
                    <div>
                      <p className="text-gray-500 font-medium">Autore</p>
                      <p className="text-gray-800 font-semibold">
                        {newsItem.autore}
                      </p>
                    </div>
                  </div>
                )}

                {/* Views */}
                <div className="flex items-start gap-3">
                  <Eye
                    className="text-orange-600 mt-1 flex-shrink-0"
                    size={18}
                  />
                  <div>
                    <p className="text-gray-500 font-medium">Visualizzazioni</p>
                    <p className="text-gray-800 font-semibold">
                      {newsItem.views || 0}
                    </p>
                  </div>
                </div>

                {/* Share */}
                <div className="flex items-start gap-3">
                  <button
                    onClick={handleShare}
                    className="text-blue-600 hover:text-blue-800 transition-colors mt-1 flex-shrink-0"
                    title="Condividi"
                  >
                    <Share2 size={18} />
                  </button>
                  <div>
                    <p className="text-gray-500 font-medium">Condividi</p>
                    <p className="text-gray-800 font-semibold">
                      Questo articolo
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="prose prose-lg max-w-none mb-8">
              <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {newsItem.content}
              </div>
            </div>
          </div>
        </article>

        {/* Related News */}
        {relatedNews.length > 0 && (
          <section className="mt-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              Notizie Correlate
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedNews.map((news) => (
                <div
                  key={news._id || news.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer group"
                  onClick={() => navigate(`/news/${news.id || news._id}`)}
                >
                  {/* Image */}
                  {news.image && (
                    <div className="h-40 bg-gray-100 overflow-hidden">
                      <img
                        src={news.image}
                        alt={news.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-4">
                    {news.category && (
                      <span className="text-xs font-bold bg-blue-100 text-blue-700 px-2 py-1 rounded mb-2 inline-block">
                        {news.category}
                      </span>
                    )}
                    <h3 className="text-sm font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {news.title}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {formatDate(news.publishedAt || news.createdAt)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Back to News */}
        <div className="mt-16 text-center">
          <button
            onClick={() => navigate("/news")}
            className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
          >
            <ArrowLeft size={20} />
            Torna alle notizie
          </button>
        </div>
      </section>
    </div>
  );
};

export default NewsDetails;
