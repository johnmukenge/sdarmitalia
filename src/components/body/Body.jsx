import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import sabbathLesson from "../../assets/sabbathLesson12026.png";
import sermonImg from "../../assets/sermon.jpg";
import bibleStudyImg from "../../assets/bible-study.jpg";
//import articleImg from "../../assets/article.jpg";
import notizie from "../../data/notizie";
import articoli from "../../data/articoli";
import Lezionario from "../../documents/Lezionario-1-2026.pdf";

const Body = () => {
  // State per lo slider delle notizie
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [visibleCards, setVisibleCards] = useState(1);

  // Notizie in ordine inverso
  const notizieReverse = [...notizie].reverse();

  // Calcola il numero di card visibili
  const getVisibleCards = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 1024) return 3;
      if (window.innerWidth >= 768) return 2;
    }
    return 1;
  };

  // Gestione responsive
  useEffect(() => {
    setVisibleCards(getVisibleCards());
    const handleResize = () => setVisibleCards(getVisibleCards());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Autoplay dello slider
  useEffect(() => {
    if (!isAutoPlaying || notizieReverse.length <= visibleCards) return;

    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying, visibleCards, notizieReverse.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => {
      const maxIndex = Math.max(0, notizieReverse.length - visibleCards);
      return prev >= maxIndex ? 0 : prev + 1;
    });
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => {
      const maxIndex = Math.max(0, notizieReverse.length - visibleCards);
      return prev <= 0 ? maxIndex : prev - 1;
    });
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const maxDots = Math.max(1, notizieReverse.length - visibleCards + 1);

  return (
    <div className="container mx-auto p-8 space-y-16">
      {/* 📰 Sezione Ultime Notizie - NUOVO SLIDER MIGLIORATO */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-3">
              Ultime Notizie
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
            <p className="text-gray-600 mt-4">
              Resta aggiornato sulle attività della nostra comunità
            </p>
          </div>

          {notizieReverse.length === 0 ? (
            <p className="text-center text-gray-600">
              Nessuna notizia disponibile al momento.
            </p>
          ) : (
            <div
              className="relative"
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
            >
              {/* Navigation Buttons */}
              {notizieReverse.length > visibleCards && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white hover:bg-blue-600 text-gray-800 hover:text-white p-3 rounded-full shadow-lg transition-all duration-300"
                    aria-label="Notizia precedente"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white hover:bg-blue-600 text-gray-800 hover:text-white p-3 rounded-full shadow-lg transition-all duration-300"
                    aria-label="Prossima notizia"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Cards Grid */}
              <div className="overflow-hidden px-2">
                <div
                  className="flex transition-transform duration-500 ease-in-out gap-6"
                  style={{
                    transform: `translateX(-${
                      currentIndex * (100 / visibleCards)
                    }%)`,
                  }}
                >
                  {notizieReverse.map((notizia) => (
                    <div
                      key={notizia.id}
                      className="flex-shrink-0"
                      style={{
                        width: `calc(${100 / visibleCards}% - ${
                          ((visibleCards - 1) * 24) / visibleCards
                        }px)`,
                      }}
                      onMouseEnter={() => setHoveredCard(notizia.id)}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      <div
                        className={`bg-white rounded-xl shadow-lg overflow-hidden h-full transition-all duration-300 ${
                          hoveredCard === notizia.id
                            ? "shadow-2xl transform -translate-y-2"
                            : ""
                        }`}
                      >
                        {/* Image */}
                        <div className="relative overflow-hidden h-56 bg-gray-50">
                          <img
                            src={notizia.image}
                            alt={notizia.title}
                            className={`w-full h-full object-cover transition-transform duration-500 p-2 ${
                              hoveredCard === notizia.id
                                ? "scale-110"
                                : "scale-100"
                            }`}
                            loading="lazy"
                          />
                          {notizia.categoria && (
                            <div className="absolute top-3 right-3">
                              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                                {notizia.categoria}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="p-6">
                          {/* Date */}
                          {notizia.data && (
                            <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                              <Calendar className="w-4 h-4" />
                              <span>{notizia.data}</span>
                            </div>
                          )}

                          {/* Title */}
                          <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                            {notizia.title}
                          </h3>

                          {/* Subtitle */}
                          <p className="text-gray-600 mb-4 line-clamp-3">
                            {notizia.sottoTitolo}
                          </p>

                          {/* CTA Button */}
                          <Link
                            to={`/news/${notizia.id}`}
                            className="inline-flex items-center gap-2 hover:text-blue-800 text-blue-950 font-semibold transition-colors duration-200 group"
                            aria-label={`Leggi di più su ${notizia.title}`}
                          >
                            Leggi di più
                            <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pagination Dots */}
              {notizieReverse.length > visibleCards && (
                <div className="flex justify-center gap-2 mt-8">
                  {Array.from({ length: maxDots }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`transition-all duration-300 rounded-full ${
                        currentIndex === index
                          ? "w-8 h-3 bg-blue-600"
                          : "w-3 h-3 bg-gray-300 hover:bg-gray-400"
                      }`}
                      aria-label={`Vai alla slide ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
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
            convinzione”. (The Desire of Ages, p. 104). “Dio è sempre stato
            fedele nel punire il male. Egli mandò i Suoi profeti per avvertire i
            colpevoli, denunciare i loro peccati e pronunciare giudizio su di
            loro. Coloro che si chiedono perché la parola di Dio metta così
            chiaramente in evidenza i peccati del Suo popolo, affinché i
            beffardi li scherniscano e i santi ne soffrano, dovrebbero
            considerare che tutto ciò è stato scritto per la loro istruzione,
            affinché possano evitare i mali registrati e imitare soltanto la
            giustizia di coloro che servirono il Signore”. (Testimonies for the
            Church, vol. 4, p. 12).
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
  );
};

export default Body;
