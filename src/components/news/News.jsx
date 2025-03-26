import Navbar from "../navbar/Navbar"
import { useEffect, useState } from "react";

const News = () => {

  const [news, setNews] = useState([]);

  useEffect(() => {
  fetch("http://localhost:8080/api/v1/news", {
    method: "GET",
    credentials: "include",  // 🔥 Importante per autenticazione/sessioni
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(response => response.json())
    .then(data => console.log("✅ News data:", data))
    .catch(error => console.error("❌ Errore nel fetch delle news:", error));
}, []);

  return (
    <div>
      <Navbar />
      <section className="container mx-auto p-8 grid grid-cols-3 gap-8">
        {/* Colonne principali */}
        <div className="col-span-2 grid grid-cols-2 gap-6">
          {news.map((article) => (
          <div key={article._id} className="bg-white p-4 shadow rounded">
            <img src={article.image} alt={article.title} className="w-full h-48 object-cover rounded" />
            <h2 className="text-xl font-bold mt-2">{article.title}</h2>
            <p className="text-gray-600 mt-2">{article.subtitle}</p>
            <a href="#" className="text-blue-500 mt-2 inline-block">Leggi di più</a>
          </div>
        ))}
        </div>
        
        {/* Sidebar */}
        <aside className="bg-gray-100 p-4 shadow rounded h-fit">
          <h2 className="text-2xl font-bold mb-4">Ultime Notizie</h2>
          {[...Array(3)].map((_, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-lg font-semibold">Titolo Notizia {index + 10}</h3>
              <p className="text-gray-500">Breve descrizione...</p>
              <a href="#" className="text-blue-500">Leggi di più</a>
            </div>
          ))}
        </aside>
      </section>
    </div>
  );
}

export default News;
