import Navbar from "../navbar/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import NewsData from "../../data/news";

// Assuming you have a local data file for testing

const News = () => {

  const [news, setNews] = useState([]);
  const [empLoading, setNewsLoading] = useState(false);
  const [filteredNews, setFilteredNews] = useState([]);

  // Replace API fetching with local data for testing
  /*useEffect(() => {
    const fetchNews = async () => {
      setNewsLoading(true);
      try {
          const response = await axios.get("http://localhost:5000/api/v1/news");
          if (response.status === 200) {
            if (Array.isArray(response.data.data.news)) {
              let sno = 1;
              const data = response.data.data.news.map((notizia) => ({
                _id: notizia._id,
                sno: sno++,
                title: notizia.title,
                subtitle: notizia.subtitle,
                content: notizia.content,
                image: notizia.image,
                author: notizia.author,
                publishedAt: notizia.publishedAt,
              }));
              //console.log("Processed Data:", data); // Debugging log
              setNews(data);
              setFilteredNews(data);
            } else {
              console.error("Expected an array but got:", typeof response.data.data.news); // Debugging log
            }
          } else {
            console.log("API Response indicates failure:", response.data); // Debugging log
          }
        } catch (error) {
          console.error("Error fetching news:", error); // Debugging log
          if(error.response && !error.response.data.success){
            alert(error.message);
          }
        } finally {
          setNewsLoading(false);
          console.log("Fetching news completed."); // Debugging log
        }
      };
      fetchNews();
    }, []);*/
  useEffect(() => {
    setNewsLoading(true);
    if (Array.isArray(NewsData)) {
      let sno = 1;
      const data = NewsData.map((notizia) => ({
        _id: notizia._id,
        sno: sno++,
        title: notizia.title,
        subtitle: notizia.subtitle,
        content: notizia.content,
        image: notizia.image,
        author: notizia.author,
        publishedAt: notizia.publishedAt,
      }));
      setNews(data);
      setFilteredNews(data);
    } else {
      setNews([]);
      setFilteredNews([]);
    }
    setNewsLoading(false);
  }, []);

  return (
    <div>
      <Navbar />
      <section className="container mx-auto p-8 space-y-8">
        {/* Colonne principali */}
        {filteredNews.map((notizia) => (
          <div key={notizia._id} className="mb-8 p-4 border rounded shadow grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {/* Colonna 1: Immagine o video */}
            <div className="col-span-1 flex flex-col items-center justify-center">
              {notizia.youtubeId ? (
                <div className="w-full aspect-video mb-4">
                  <iframe
                    className="w-full h-full rounded"
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
                  className="w-full rounded shadow mb-4 object-cover max-h-64"
                />
              ) : (
                <div className="w-full h-40 bg-gray-200 flex items-center justify-center rounded mb-4">
                  <span className="text-gray-400">Nessuna immagine</span>
                </div>
              )}
            </div>
            {/* Colonna 2-3: Testo */}
            <div className="col-span-1 md:col-span-2 flex flex-col">
              <h2 className="text-2xl font-bold">{notizia.title}</h2>
              {notizia.motto && (
                <div className="text-xl font-semibold text-gray-700 mb-1">{notizia.motto}</div>
              )}
              {notizia.verse && (
                <div className="text-lg font-medium text-gray-600 mb-1">{notizia.verse}</div>
              )}
              {notizia.periodo && (
                <div className="text-base font-medium text-gray-500 mb-1">{notizia.periodo}</div>
              )}
              {notizia.luogo && (
                <div className="text-base font-medium text-gray-500 mb-1">{notizia.luogo}</div>
              )}
              <span className="text-sm text-gray-500">
                Pubblicato il {new Date(notizia.publishedAt.data).toLocaleDateString()}
              </span>
              <div className="mt-2 flex items-center space-x-4">
                {/* Instagram does not support direct sharing with content via URL, so we keep the link */}
                <a
                  href={`https://www.instagram.com/?url=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-500 text-2xl"
                  title="Condividi su Instagram"
                >
                  <i className="fab fa-instagram"></i>
                </a>
                {/* Facebook */}
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(notizia.content)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 text-2xl"
                  title="Condividi su Facebook"
                >
                  <i className="fab fa-facebook"></i>
                </a>
                {/* WhatsApp */}
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(notizia.title + " - " + notizia.content + " " + window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-500 text-2xl"
                  title="Condividi su WhatsApp"
                >
                  <i className="fab fa-whatsapp"></i>
                </a>
                {/* Twitter/X */}
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(notizia.title + " - " + notizia.content)}&url=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 text-2xl"
                  title="Condividi su Twitter"
                >
                  <i className="fab fa-twitter"></i>
                </a>
              </div>
              <p className="text-gray-800 mt-2">{notizia.content}</p>
              <h5 className="text-lg font-medium mt-4">Ospite: {notizia.author}</h5>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default News;
