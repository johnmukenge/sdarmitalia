import { useNavigate } from "react-router-dom";
import { ChevronRight, Calendar, Eye, Tag } from "lucide-react";

/**
 * NewsCard Component - Card riusabile per singola notizia
 *
 * Features:
 * - Immagine responsive
 * - Badge categoria
 * - Titolo e descrizione
 * - Metadata (data, visualizzazioni)
 * - "Leggi di più" button
 * - Hover effects professionali
 */
const NewsCard = ({ newsItem, onClick }) => {
  const navigate = useNavigate();

  const handleReadMore = (e) => {
    e.preventDefault();
    const newsId = newsItem._id || newsItem.id;
    if (onClick) {
      onClick(newsId);
    } else {
      navigate(`/news/${newsId}`);
    }
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("it-IT", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return "Data non disponibile";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col">
      {/* Image Container */}
      <div className="relative h-48 bg-gradient-to-br from-blue-100 to-blue-50 overflow-hidden group">
        {newsItem.image ? (
          <img
            src={newsItem.image}
            alt={newsItem.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-200 to-blue-100 flex items-center justify-center">
            <span className="text-blue-400 text-4xl">📰</span>
          </div>
        )}

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      {/* Content Container */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Category Badge */}
        {newsItem.category && (
          <div className="flex items-center gap-2 mb-3">
            <Tag size={14} className="text-blue-600" />
            <span className="text-xs font-bold bg-blue-100 text-blue-700 px-3 py-1 rounded-full uppercase tracking-wide">
              {newsItem.category}
            </span>
          </div>
        )}

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 hover:text-blue-700 transition-colors">
          {newsItem.title}
        </h3>

        {/* Subtitle if available */}
        {newsItem.sottoTitolo && (
          <p className="text-sm text-gray-600 mb-3 italic line-clamp-1">
            {newsItem.sottoTitolo}
          </p>
        )}

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-1">
          {newsItem.description || newsItem.content}
        </p>

        {/* Metadata */}
        <div className="border-t border-gray-200 pt-4 mb-4">
          <div className="flex items-center justify-between text-xs text-gray-500 gap-2">
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              <span>{formatDate(newsItem.publishedAt)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye size={14} />
              <span>{newsItem.views || 0} visualizzazioni</span>
            </div>
          </div>
        </div>

        {/* Read More Button */}
        <button
          onClick={handleReadMore}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg active:scale-95"
        >
          Leggi di più
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default NewsCard;
