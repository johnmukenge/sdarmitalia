import { Link } from "react-router-dom";
import sabbathLesson from "../../assets/sabbathLesson12026.png";
import sermonImg from "../../assets/sermon.jpg";
import bibleStudyImg from "../../assets/bible-study.jpg";
//import articleImg from "../../assets/article.jpg";
import articoli from "../../data/articoli";
import Lezionario from "../../documents/Lezionario-1-2026.pdf";
import NewsSlider from "../news/NewsSlider";
import Header from "../header/Header";

const Body = () => {
  return (
    <>
      {/* Video di sfondo - Solo nella Home Page */}
      <Header />
      
      <div className="container mx-auto p-8 space-y-16">
      {/* 📰 Sezione Ultime Notizie - NEWS SLIDER DA API */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-3">
              Ultime Notizie
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
            <p className="text-gray-600 mt-4">
              Rimani aggiornato sulle attività della nostra comunità
            </p>
          </div>

          {/* NewsSlider Component - Carica da API */}
          <NewsSlider limit={6} />

          {/* Bottone "Vedi Tutte le Notizie" */}
          <div className="text-center mt-12">
            <Link
              to="/news"
              className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              Vedi Tutte le Notizie
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 📖 Sezione Scuola Sabatica */}
      <section className="flex flex-col bg-gray-100 md:flex-row items-center space-y-8 md:space-y-0 md:space-x-8 rounded-xl p-6">
        {/* Image Section */}
        <div className="flex-shrink-0 mb-8 md:mb-0">
          <img
            src={sabbathLesson}
            alt="sabbathLesson"
            className="rounded-lg shadow-lg w-full md:w-96"
          />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl overflow-y-auto h-130">
          <h2 className="text-3xl font-bold mb-4">
            Lezioni della Scuola del Sabato
          </h2>
          <p className="text-gray-700 mb-4">
            Benché li chiamiamo i “profeti minori”, il loro messaggio non è
            affatto insignificante! Il nome deriva semplicemente dal fatto che i
            libri da loro scritti sono brevi. Eppure questi messaggi pieni di
            potenza sono forti, diretti e altamente rilevanti per i nostri
            giorni. Per questo motivo gli studenti della Scuola del Sabato in
            tutto il mondo si concentreranno, per i prossimi tre mesi, sui Punti
            salienti dai Profeti Minori come un investimento tempestivo nella
            nostra preparazione per la chiusura del tempo di grazia e il ritorno
            di Cristo. I profeti minori non portano messaggi dolci e facili.
            Nient’affatto: essi tagliano come un’ascia posta alla radice
            dell’albero. “Dio non manda messaggeri per adulare il peccatore.
            Egli non consegna alcun messaggio di pace per cullare i non
            santificati in una sicurezza fatale. Egli pone pesanti fardelli
            sulla coscienza di chi fa il male e trafigge l’anima con frecce di
            convinzione”.
          </p>

          <a
            href={Lezionario}
            download
            className="bg-blue-950 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors inline-block"
          >
            Scarica il PDF
          </a>
        </div>
      </section>

      {/* 🏛️ Sezione Trova Chiesa / Sermoni / Studi Biblici */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="group">
          <div className="overflow-hidden rounded-lg shadow-lg">
            <img
              src={bibleStudyImg}
              alt="Trova Chiesa"
              className="w-full rounded-lg transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <Link
            to="/trova-chiesa"
            className="block mt-4 bg-blue-950 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors"
          >
            Trova una Chiesa
          </Link>
        </div>
        <div className="group">
          <div className="overflow-hidden rounded-lg shadow-lg">
            <img
              src={sermonImg}
              alt="Segui un Sermone"
              className="w-full rounded-lg transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          <a
            href="https://www.youtube.com/@adsgmdr"
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-4 bg-blue-950 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors"
          >
            Segui un Sermone
          </a>
        </div>
        <div className="group">
          <div className="overflow-hidden rounded-lg shadow-lg">
            <img
              src={bibleStudyImg}
              alt="Richiedi uno Studio Biblico"
              className="w-full rounded-lg transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <Link
            to="/contact"
            className="block mt-4 bg-blue-950 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors"
          >
            Richiedi uno Studio Biblico
          </Link>
        </div>
      </section>

      {/* 📝 Sezione Articoli */}
      <section className="bg-gray-100 p-8 rounded-xl">
        <h2 className="text-3xl font-bold text-center mb-8">Articoli</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articoli.slice(0, 3).map((article) => {
            const hasImage = article.image && typeof article.image === "string";
            return (
              <div
                key={article._id}
                className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
              >
                {hasImage && (
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 flex-grow line-clamp-2">
                    {article.excerpt}
                  </p>
                  <Link
                    to={`/articoli/${article._id}`}
                    className="inline-flex items-center gap-2 hover:text-blue-800 text-blue-950 font-semibold transition-colors duration-200 group"
                  >
                    Leggi di più...
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
    </>
  );
};

export default Body;
