import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import sabbathLesson from "../../assets/sabbathLesson2.jpg";
import sermonImg from "../../assets/sermon.jpg";
import bibleStudyImg from "../../assets/bible-study.jpg";
import articleImg from "../../assets/article.jpg";
import notizie from "../../data/notizie";
import Lezionario from "../../documents/Lezionario2-2025.pdf";

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
            Il manoscritto del Vangelo secondo Giovanni è datato più tardi degli altri tre
            vangeli (chiamati i Vangeli Sinottici), ma risale ancora al primo secolo. Nel diciannovesimo
            secolo i critici della Bibbia cercarono di smentire il fatto che esso
            fosse stato scritto prima dell’anno 150 D.C., cercando così di mettere in dubbio
            il fatto che l’apostolo Giovanni ne fosse l’autore. I critici affermarono anche che
            esso rifletteva la filosofia Gnostica e perciò non poteva esser stato scritto prima che
            lo Gnosticismo diventasse una seria minaccia per la fede. (Lo Gnosticismo era un
            sistema filosofico e religioso di un’antica setta che rivendicava la conoscenza piuttosto
            che la fede come la chiave per la salvezza.) Una tale veduta distorta è stata
            rifiutata da tanto tempo. <br />
            Al contrario, l’evidenza esterna afferma l’esistenza del quarto vangelo e la grande
            considerazione nella quale esso era tenuto già nell’anno 115 D.C. Una tale
            evidenza fu acquisita attraverso la scoperta di un piccolo rotolo di papiro, che
            riportava alcuni versetti di Giovanni (capitolo 16, versetti 31-33, 37,38), conosciuto
            come il Papiro Rylands e comunemente designato come P52, che fu datato
            paleograficamente nell’anno 125 D.C. Questo frammento, trovato in Egitto all’inizio
            del secondo secolo, è considerato un’evidenza tangibile della prima ed ampia
            diffusione del quarto vangelo.
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
