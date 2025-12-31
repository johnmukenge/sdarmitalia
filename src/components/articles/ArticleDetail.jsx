import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft, Download } from "lucide-react";
import articoli from "../../data/articoli";
import Navbar from "../navbar/Navbar";

const ArticleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulazione del caricamento dal backend
    // TODO: Sostituire con chiamata API al backend
    // const fetchArticle = async () => {
    //   try {
    //     const response = await axios.get(`http://localhost:5000/api/v1/articoli/${id}`);
    //     setArticle(response.data.data);
    //     // Carica articoli correlati
    //     const relatedRes = await axios.get(`http://localhost:5000/api/v1/articoli?year=${response.data.data.year}`);
    //     setRelatedArticles(relatedRes.data.data.filter(a => a._id !== id));
    //   } catch (error) {
    //     console.error('Errore nel caricamento articolo:', error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    // Per ora usa i dati mock
    const foundArticle = articoli.find((a) => a._id === id);
    if (foundArticle) {
      setArticle(foundArticle);
      // Articoli correlati dello stesso anno
      const related = articoli.filter(
        (a) => a._id !== id && a.year === foundArticle.year
      );
      setRelatedArticles(related);
    }
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-blue-600 text-lg">Caricamento...</div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div>
        <Navbar />
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Articolo non trovato
            </h2>
            <button
              onClick={() => navigate("/articoli")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg"
            >
              Torna agli articoli
            </button>
          </div>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("it-IT", options);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      {/* Contenuto Principale */}
      <div className="container mx-auto px-4 py-12">
        {/* Pulsante Torna Indietro */}
        <button
          onClick={() => navigate("/articoli")}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          Torna agli articoli
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contenuto Principale */}
          <div className="lg:col-span-2">
            <article className="bg-white rounded-lg shadow-lg p-8">
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    {article.quarter}
                  </span>
                  <span className="text-gray-500 text-sm">{article.year}</span>
                </div>

                <h1 className="text-4xl font-bold text-gray-800 mb-4">
                  {article.title}
                </h1>

                <div className="flex flex-wrap items-center gap-6 text-gray-600 pb-6 border-b border-gray-200">
                  <div>
                    <p className="text-sm text-gray-500">Autore</p>
                    <p className="font-semibold text-blue-600">
                      {article.author}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">
                      Data di pubblicazione
                    </p>
                    <p className="font-semibold text-gray-800">
                      {formatDate(article.publishedAt)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Contenuto Articolo */}
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                <p className="mb-6 text-lg font-semibold text-gray-800">
                  {article.excerpt}
                </p>

                <div className="space-y-6 text-justify">
                  {article.content.split("\n\n").map((paragraph, index) => (
                    <p key={index} className="text-gray-700">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* CTA Download */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <a
                  href={article.pdfUrl}
                  download
                  className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                >
                  <Download size={20} />
                  Scarica questo articolo (PDF)
                </a>
              </div>
            </article>
          </div>

          {/* Sidebar - Articoli Correlati */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-8 sticky top-24">
              <h3 className="text-xl font-bold text-gray-800 mb-6 pb-4 border-b border-gray-200">
                Articoli dello stesso anno
              </h3>

              {relatedArticles.length > 0 ? (
                <div className="space-y-4">
                  {relatedArticles.slice(0, 5).map((relatedArticle) => (
                    <a
                      key={relatedArticle._id}
                      href={`/articoli/${relatedArticle._id}`}
                      className="block p-4 border border-gray-200 rounded-lg hover:border-blue-600 hover:shadow-md transition-all duration-200"
                    >
                      <p className="text-sm text-blue-600 font-semibold mb-2">
                        {relatedArticle.quarter}
                      </p>
                      <p className="text-gray-800 font-semibold text-sm line-clamp-2 hover:text-blue-600">
                        {relatedArticle.title}
                      </p>
                    </a>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">
                  Nessun altro articolo disponibile per questo anno.
                </p>
              )}

              {/* Box Info */}
              <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-gray-800 mb-2">
                  Informazioni
                </h4>
                <p className="text-sm text-gray-600">
                  Hai domande su questo articolo?{" "}
                  <a
                    href="/contact"
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    Contattaci
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
