import { Link } from "react-router-dom";
import { Download, ArrowRight, FileText } from "lucide-react";

/**
 * ArticleCard Component
 *
 * Card elegante per visualizzare un articolo in formato teaser.
 * L'immagine è opzionale e si posiziona elegantemente dentro il panel.
 *
 * Props:
 * @param {Object} article - Oggetto articolo con:
 *   - _id: ID univoco
 *   - title: Titolo articolo
 *   - author: Autore
 *   - image: (opzionale) URL immagine
 *   - excerpt: Anteprima breve
 *   - publishedAt: Data pubblicazione ISO
 *   - year: Anno
 *   - quarter: Trimestre (Q1-Q4)
 *   - pdfUrl: (opzionale) URL per download PDF
 *
 * Features:
 * - Immagine opzionale dentro il panel
 * - Responsive design
 * - Hover effects fluidi
 * - Badge trimestre
 * - Pulsanti Leggi e Scarica
 */
const ArticleCard = ({ article }) => {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("it-IT", options);
  };

  // Controlla se l'immagine è disponibile
  const hasImage = article.image && typeof article.image === "string";

  return (
    <div className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden h-full flex flex-col group">
      {/* Intestazione con badge */}
      <div className="px-6 pt-4 flex items-start justify-between">
        <div className="flex-1">
          <p className="text-blue-600 text-xs font-bold uppercase tracking-widest">
            {article.author}
          </p>
        </div>
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-1 rounded-full text-xs font-bold">
          {article.quarter}
        </div>
      </div>

      {/* Immagine opzionale dentro il panel */}
      {hasImage && (
        <div className="mx-4 mt-3 rounded-lg overflow-hidden bg-gradient-to-b from-blue-50 to-blue-100 h-40">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      {/* Contenuto */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Titolo */}
        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {article.title}
        </h3>

        {/* Anteprima */}
        <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-3">
          {article.excerpt}
        </p>

        {/* Data */}
        <p className="text-xs text-gray-400 mb-4">
          {formatDate(article.publishedAt)}
        </p>

        {/* Azioni */}
        <div className="flex gap-2 pt-4 border-t border-gray-200">
          <Link
            to={`/articoli/${article._id}`}
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            Leggi
            <ArrowRight size={16} />
          </Link>

          {article.pdfUrl && article.pdfUrl !== "#" ? (
            <a
              href={article.pdfUrl}
              download
              className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-blue-50 text-gray-700 hover:text-blue-600 font-semibold py-2 px-4 rounded-lg transition-colors duration-200 border border-gray-200"
              title="Scarica PDF"
            >
              <Download size={16} />
            </a>
          ) : (
            <div
              className="flex items-center justify-center gap-2 bg-gray-50 text-gray-400 font-semibold py-2 px-4 rounded-lg border border-gray-200"
              title="PDF non disponibile"
            >
              <FileText size={16} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
