// Fallback handler for images
const handleImgError = (e) => {
  e.target.src = "https://via.placeholder.com/400x250?text=Immagine+non+disponibile";
  e.target.alt = "Immagine non disponibile";
};

import { Link } from "react-router-dom";
import sabbathLesson from "../../assets/sabbathLesson22026.png";
import sermonImg from "../../assets/sermon.jpg";
import bibleStudyImg from "../../assets/bible-study.jpg";
import articoli from "../../data/articoli";
import Lezionario from "../../documents/Lezionario-2-2026.pdf";
import NewsSlider from "../news/NewsSlider";
import Header from "../header/Header";

// Reusable Card component for articles and sections
const Card = ({ image, alt, title, excerpt, link, linkText, onError }) => (
  <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
    {image && (
      <img
        src={image}
        alt={alt || title}
        className="w-full h-48 object-cover"
        loading="lazy"
        onError={onError}
      />
    )}
    <div className="p-4 flex flex-col flex-grow">
      <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">{title}</h3>
      {excerpt && (
        <p className="text-gray-600 text-sm mb-3 flex-grow line-clamp-2">{excerpt}</p>
      )}
      {link && (
        <Link
          to={link}
          className="inline-flex items-center gap-2 hover:text-blue-800 text-blue-950 font-semibold transition-colors duration-200 group"
        >
          {linkText || "Leggi di più..."}
        </Link>
      )}
    </div>
  </div>
);


const Body = () => {
  return (
    <main>
      <Header />
      <div className="container mx-auto p-8 space-y-16">
        {/* 📰 Sezione Ultime Notizie - NEWS SLIDER DA API */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-3">Ultime Notizie</h2>
              <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
              <p className="text-gray-600 mt-4">Rimani aggiornato sulle attività della nostra comunità</p>
            </div>
            <NewsSlider limit={6} />
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
          <div className="flex-shrink-0 mb-8 md:mb-0">
            <img
              src={sabbathLesson}
              alt="sabbathLesson"
              className="rounded-lg shadow-lg w-full md:w-96"
              loading="lazy"
              onError={handleImgError}
            />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl overflow-y-auto h-130">
            <h2 className="text-3xl font-bold mb-4">Lezioni della Scuola del Sabato</h2>
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl overflow-y-auto h-96">
              <p className="text-gray-700 text-justify leading-relaxed">
                La Bibbia è stata scritta e divinamente preservata come guida ispi-
                rata per noi. Le storie che contiene offrono innumerevoli lezioni per la
                nostra vita personale e per i tempi in cui viviamo. Questo resoconto
                dell’opera di Dio attraverso la storia delle nazioni e del Suo popolo ci
                incoraggia e ci assicura del Suo amore. E la sua testimonianza più pre-
                ziosa — il racconto della vita e del messaggio di Gesù — risveglia in noi
                l’amore per Dio, “perché Egli ci ha amati per primo” (1 Giovanni 4:19).
                Uno degli aspetti più affascinanti del nostro Dio, rivelato nella Bib-
                bia, è la Sua prescienza: Egli può vedere “la fine sin dal principio” (Isaia
                46:10). Questo Gli permette di usare il Suo potere infinito per far sì
                che “tutte le cose cooperino al bene di quelli che amano Dio” (Romani
                8:28). Inoltre, di tanto in tanto Egli sceglie di rivelare al Suo popolo “le
                cose che devono avvenire fra breve” (Apocalisse 1:1). Ciò rafforza la
                nostra fiducia nel Suo amore e nella Sua provvidenza, ed è una delle
                prove dell’ispirazione divina della Bibbia. Il fatto che le profezie si si-
                ano costantemente adempiute nelle pagine della storia e negli eventi
                attuali dimostra che la Parola di Dio è ben più di un’invenzione umana.
                La profezia è di vitale importanza per i figli di Dio. La Sua bene-
                dizione è pronunciata su colui “che legge, e su coloro che ascoltano
                le parole di questa profezia e osservano le cose che vi sono scritte”
                (Apocalisse 1:3).
                Tra gli scritti dei profeti, due si distinguono per contenere predi-
                zioni dettagliate e sistematiche sui grandi sviluppi della storia. A Da-
                niele e a Giovanni furono affidati questi messaggi speciali, e i loro
                libri — Daniele e L’Apocalisse — sono il tema dell’edizione di questo
                trimestre del Lezionario della Scuola del Sabato.
                Nei prossimi tre mesi, gli studenti della Scuola del Sabato studie-
                ranno le storie di Daniele e Giovanni, e alcune delle parti fondamen-
                tali delle profezie che essi registrarono. Queste costituiscono una
                struttura di riferimento per comprendere il messaggio avventista e i
                movimenti spirituali e politici del passato e del presente.
                Sebbene in questo trimestre non vi sia spazio sufficiente per trat-
                tare ogni parte di entrambi i libri, si incoraggiano gli studenti ad ap-
                profondirne l’intero contenuto, insieme alle loro relazioni e connes-
                sioni con il resto della Bibbia.
                Una delle migliori risorse a disposizione di studenti e insegnanti
                della Scuola del Sabato per comprendere i dettagli di queste profezie
                è il classico libro di Uriah Smith, Thoughts on Daniel and the Reve-
                lation (Le profezie di Daniele e Le profezie dell’Apocalisse). Lo rac-
                comandiamo vivamente come aiuto allo studio per tutto il trimestre.
                È la nostra preghiera che siate benedetti dal vostro studio di que-
                ste profezie, poiché davvero “il tempo è vicino” (Apocalisse 1:3).
                Il Dipartimento della Scuola del Sabato della Conferenza Generale
              </p>
            </div>
            <br />
            <a
              href={Lezionario}
              download
              className="bg-blue-950 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors inline-block"
            >
              Scarica il PDF
            </a>
          </div>
        </section>

        {/* 🎧 Sezione Podcast - Ultime Puntate */}
        <section className="bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-8 shadow-md">
          <h2 className="text-3xl font-bold text-center mb-8 text-blue-900 flex items-center justify-center gap-2">
            <svg xmlns='http://www.w3.org/2000/svg' className='inline w-8 h-8 text-green-600' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 19V6l12-2v13' /><circle cx='6' cy='18' r='3' /><circle cx='18' cy='18' r='3' /></svg>
            Ultime dal Podcast
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Puntata 1 - YouTube */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col hover:shadow-xl transition-shadow">
              <div className="aspect-w-16 aspect-h-9 w-full">
                <iframe
                  src="https://www.youtube.com/embed/z8mWctoIRt0"
                  title="Podcast - Puntata 1"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">Caduta caduta Babilonia - con Giordano T.</h3>
                <a href="https://www.youtube.com/watch?v=z8mWctoIRt0&t=9s" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline font-medium">Guarda su YouTube</a>
              </div>
            </div>
            {/* Puntata 2 - YouTube */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col hover:shadow-xl transition-shadow">
              <div className="aspect-w-16 aspect-h-9 w-full">
                <iframe
                  src="https://www.youtube.com/embed/Z30VrqhICi0"
                  title="Podcast - Puntata 2"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">Temete Dio e dategli gloria - con Giordano T.</h3>
                <a href="https://www.youtube.com/watch?v=Z30VrqhICi0&t=39s" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline font-medium">Guarda su YouTube</a>
              </div>
            </div>
            {/* Puntata 3 - YouTube + Spotify */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col hover:shadow-xl transition-shadow">
              <div className="aspect-w-16 aspect-h-9 w-full">
                <iframe
                  src="https://www.youtube.com/embed/T7spXp3L4eI"
                  title="Podcast - Puntata 3"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">Chi è Israele oggi - con Dario L.</h3>
                <a href="https://www.youtube.com/watch?v=T7spXp3L4eI&t=78s" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline font-medium mb-2">Guarda su YouTube</a>
                <a href="https://open.spotify.com/episode/4N9X04Lfz99T4MfkEyVMKk?si=xnQK5FGvSo6u4nAeM9DmjQ&nd=1&dlsi=fce0faccbe214cf6" target="_blank" rel="noopener noreferrer" className="text-green-700 hover:underline font-medium flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.243 14.828a1 1 0 01-1.415.002c-2.61-2.59-6.84-2.59-9.45 0a1 1 0 01-1.415-1.415c3.39-3.39 8.89-3.39 12.28 0a1 1 0 01.002 1.413zm2.12-3.535a1 1 0 01-1.414.002c-3.905-3.905-10.237-3.905-14.142 0a1 1 0 01-1.414-1.414c4.686-4.686 12.284-4.686 16.97 0a1 1 0 01.002 1.412zm2.12-3.536a1 1 0 01-1.414.002c-5.2-5.2-13.652-5.2-18.852 0a1 1 0 01-1.414-1.414c6.181-6.181 16.499-6.181 22.68 0a1 1 0 01.002 1.412z"/></svg>
                  Ascolta su Spotify
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 📝 Sezione Articoli */}
        <section className="bg-gray-100 p-8 rounded-xl">
          <h2 className="text-3xl font-bold text-center mb-8">Articoli</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articoli.slice(0, 3).map((article) => {
              const hasImage = article.image && typeof article.image === "string";
              return (
                <Card
                  key={article._id}
                  image={hasImage ? article.image : undefined}
                  alt={article.title}
                  title={article.title}
                  excerpt={article.excerpt}
                  link={`/articoli/${article._id}`}
                  onError={handleImgError}
                />
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Body;
              

