import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import sabbathLesson from "../../assets/sabbathLesson.jpg";
import sermonImg from "../../assets/sermon.jpg";
import bibleStudyImg from "../../assets/bible-study.jpg";
import articleImg from "../../assets/article.jpg";
import notizie from "../../data/notizie";
import Lezionario from "../../documents/Lezionario1-2025.pdf";

const Body = () => {
  return (
    <div className="container mx-auto p-8 space-y-16">

      {/* 📰 Sezione Ultime Notizie - CAROUSEL */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-8">Ultime Notizie</h2>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
            {notizie.map((notizia, index) => (
                <SwiperSlide key={index} className="p-4">
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <img src={notizia.image} alt="News" className="w-full h-48 object-cover" />
                        <div className="p-4">
                          <p className="text-gray-700">{notizia.title}</p>
                          <p className="text-gray-500">{notizia.sottoTitolo}</p>
                          <Link to={`/news/${notizia.id}`} className="text-blue-600 hover:underline">Leggi di più...</Link>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
          {/*[...Array(6)].map((_, index) => (
            <SwiperSlide key={index} className="p-4">
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img src={newsImg} alt="News" className="w-full h-48 object-cover" />
                <div className="p-4">
                  <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  <Link to="/news" className="text-blue-600 hover:underline">Leggi di più...</Link>
                </div>
              </div>
            </SwiperSlide>
          ))*/}
        </Swiper>
      </section>

      {/* 📖 Sezione Scuola Sabatica */}
      <section className="flex flex-col bg-gray-100 md:flex-row items-center space-y-8 md:space-y-0 md:space-x-8">
        <img src={sabbathLesson} alt="Lezionario Scuola Sabatica" className="w-1/4 rounded-lg" />
        <div className="w-1/2">
          <h2 className="text-3xl font-bold mb-4">Lezioni della Scuola del Sabato</h2>
          <p className="text-gray-700 mb-4">
            Quest’anno studieremo per tre trimestri Il Vangelo secondo Giovanni. Per
            modestia, l’autore del quarto vangelo non si identifica, né fa qualche riferimento a lui stesso come uno dei due discepoli che per prima seguirono Gesù (Giovanni 1:37). Egli allude, piuttosto, ad “un altro discepolo”, “quel discepolo”,
            “il discepolo…che amava,” “il discepolo che Gesù amava,” e “il discepolo che
            rende testimonianza di queste cose” (Giovanni 18:15; 19:26; 21:20,23,24).
            Il fatto che altri importanti discepoli sono citati per nome mentre il nome di
            Giovanni è omesso, sembra indicare che egli deve esser stato l’autore di quel
            vangelo. <br />
            Secondo lo Spirito di Profezia l’autore del quarto vangelo fu Giovanni, “il
            discepolo che Gesù amava.” Egli era uno dei tre discepoli che testimoniarono
            la gloria di Cristo sul monte della trasfigurazione e la Sua agonia nel giardino
            poco prima del Suo arresto. La sua vita è un esempio eccezionale che dimostra
            come la potenza di Dio può trasformare completamente un “figlio del tuono”
            in un uomo di amorevole disposizione e profonda visione spirituale.
          </p>
          <a href={Lezionario} download className="bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-700">
            Scarica il PDF
          </a>
        </div>
      </section>

      {/* 🏛️ Sezione Trova Chiesa / Sermoni / Studi Biblici */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div>
          <img src={bibleStudyImg} alt="Trova Chiesa" className="w-full rounded-lg" />
          <Link to="/trova-chiesa" className="block mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Trova una Chiesa
          </Link>
        </div>
        <div>
          <img src={sermonImg} alt="Segui un Sermone" className="w-full rounded-lg" />
          <a href="https://www.youtube.com/@MovimentoDiRiforma" target="_blank" rel="noopener noreferrer" className="block mt-4 text-blue-600 hover:underline">
            Segui un Sermone
          </a>
        </div>
        <div>
          <img src={bibleStudyImg} alt="Richiedi uno Studio Biblico" className="w-full rounded-lg" />
          <Link to="/contact" className="block mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Richiedi uno Studio Biblico
          </Link>
        </div>
      </section>

      {/* 📝 Sezione Articoli - CAROUSEL */}
      <section className="bg-gray-100 p-8">
        <h2 className="text-3xl font-bold text-center mb-8">Articoli</h2>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {[...Array(4)].map((_, index) => (
            <SwiperSlide key={index} className="p-4">
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img src={articleImg} alt="Articolo" className="w-full h-48 object-cover" />
                <div className="p-4">
                  <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  <Link to="/articoli" className="text-blue-600 hover:underline">Leggi di più...</Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

    </div>
  );
};

export default Body;
