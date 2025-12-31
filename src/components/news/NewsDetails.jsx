import notizie from "../../data/notizie";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "../navbar/Navbar";

/**
 * NewsDetails Component - Pagina Dettaglio Notizia
 *
 * Visualizza il contenuto completo di una singola notizia.
 *
 * Features:
 * - Visualizzazione completa dell'articolo con immagine
 * - Testi e metadati (autore, data, luogo, periodo, verso)
 * - Bottone per tornare alla lista
 * - Design professionale e responsive
 * - Colori coerenti con l'app (blu, bianco, nero)
 */
const NewsDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const notizia = notizie.find((item) => item.id === parseInt(id));

  if (!notizia) {
    return (
      <div>
        <Navbar />
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Notizia non trovata
            </h2>
            <button
              onClick={() => navigate("/news")}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
            >
              Torna alle notizie
            </button>
          </div>
        </div>
      </div>
    );
  }

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

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <Navbar />

      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-8 px-4">
        <div className="container mx-auto">
          <button
            onClick={() => navigate("/news")}
            className="flex items-center gap-2 text-blue-100 hover:text-white font-semibold mb-6 transition-colors"
          >
            <ArrowLeft size={20} />
            Torna alle notizie
          </button>
          <h1 className="text-4xl md:text-5xl font-bold">{notizia.title}</h1>
          {notizia.subtitle && (
            <p className="text-xl text-blue-100 mt-2">{notizia.subtitle}</p>
          )}
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-12">
        <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Hero Image */}
          {notizia.image && (
            <div className="w-full h-96 overflow-hidden bg-gray-100">
              <img
                src={notizia.image}
                alt={notizia.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Content */}
          <div className="p-8 md:p-12">
            {/* Metadata */}
            <div className="mb-8 pb-8 border-b border-gray-200 space-y-3">
              <div className="flex flex-wrap gap-4 text-gray-600">
                {notizia.autore && (
                  <div>
                    <p className="text-sm text-gray-500">Autore</p>
                    <p className="font-semibold text-gray-800">
                      {notizia.autore}
                    </p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-500">Data di pubblicazione</p>
                  <p className="font-semibold text-gray-800">
                    {formatDate(notizia.publishedAt)}
                  </p>
                </div>
              </div>

              {/* Optional metadata */}
              <div className="flex flex-wrap gap-6 text-sm">
                {notizia.luogo && (
                  <div className="flex items-start gap-2">
                    <span className="text-gray-500">📍</span>
                    <span className="text-gray-700">
                      <strong>Luogo:</strong> {notizia.luogo}
                    </span>
                  </div>
                )}
                {notizia.periodo && (
                  <div className="flex items-start gap-2">
                    <span className="text-gray-500">⏰</span>
                    <span className="text-gray-700">
                      <strong>Periodo:</strong> {notizia.periodo}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Motto and Verse */}
            {(notizia.motto || notizia.verse) && (
              <div className="mb-8 p-6 bg-blue-50 border-l-4 border-blue-600 rounded-lg">
                {notizia.motto && (
                  <p className="text-lg font-semibold text-blue-900 mb-2">
                    💭 {notizia.motto}
                  </p>
                )}
                {notizia.verse && (
                  <p className="text-gray-700 italic">📖 {notizia.verse}</p>
                )}
              </div>
            )}

            {/* Main Content */}
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              {notizia.content.split("\n\n").map((paragraph, idx) => (
                <p key={idx} className="mb-6 text-justify">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Back Button */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <button
                onClick={() => navigate("/news")}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <ArrowLeft size={20} />
                Torna alle notizie
              </button>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
};

export default NewsDetails;
