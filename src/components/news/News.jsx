import Navbar from "../navbar/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";

const News = () => {

  const [news, setNews] = useState([]);
  const [empLoading, setNewsLoading] = useState(false);
  const [filteredNews, setFilteredNews] = useState([]);

  useEffect(() => {
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
  }, []);

  return (
    <div>
      <Navbar />
      <section className="container mx-auto p-8 space-y-8">
        {/* Colonne principali */}
          {filteredNews.map((notizia) => (
            console.log("Notizia", notizia),
            <div key={notizia._id} className="mb-8 p-4 border rounded shadow">
              <h2 className="text-2xl font-bold">{notizia.title}</h2>
              <h3 className="text-xl font-semibold text-gray-700">{notizia.subtitle}</h3>
              <span className="text-sm text-gray-500">
                Pubblicato il {new Date(notizia.publishedAt).toLocaleDateString()}
              </span>
              <div className="mt-2">
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 mr-2">Condividi su Facebook</a>
                <a href={`https://wa.me/?text=${window.location.href}`} target="_blank" rel="noopener noreferrer" className="text-green-500 mr-2">Condividi su WhatsApp</a>
                <a href={`https://twitter.com/intent/tweet?url=${window.location.href}`} target="_blank" rel="noopener noreferrer" className="text-blue-400">Condividi su Twitter</a>
              </div>
              <p className="text-gray-800 mt-2">{notizia.content}</p>
              <h5 className="text-lg font-medium mt-4">Autore: {notizia.author}</h5>
            </div>
          ))}
      </section>
    </div>
  );
}

export default News;
