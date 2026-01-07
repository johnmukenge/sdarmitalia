/**
 * Componenti Opzionali per Integrazione Biblioteca
 *
 * Questi componenti possono essere usati in altre pagine
 * per promuovere la biblioteca o aggiungere widget
 */

import { Link } from "react-router-dom";
import { BookOpen, Volume2, Download, ArrowRight } from "lucide-react";

/**
 * Widget Promozionale per Biblioteca
 * Uso: <BibliotecaPromo />
 *
 * Mostra:
 * - Mini descrizione
 * - 3 libri random
 * - CTA "Scopri di più"
 */
export const BibliotecaPromo = () => {
  const libriRandom = [
    {
      _id: "1",
      titolo: "I Fondamenti della Fede",
      autore: "Dr. Elena Rossi",
      icona: "📖",
    },
    {
      _id: "2",
      titolo: "Storie Bibliche per Bambini",
      autore: "Paola Benedetti",
      icona: "👶",
    },
    {
      _id: "6",
      titolo: "Avventure di Piccolo Davide",
      autore: "Carla Gattazzo",
      icona: "🎯",
    },
  ];

  return (
    <section className="my-12 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl shadow-lg p-8 text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Testo */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <BookOpen size={32} />
            <h2 className="text-3xl font-bold">Biblioteca Digitale</h2>
          </div>
          <p className="text-blue-100 mb-6 text-lg">
            Scopri la nostra collezione di libri spirituali ed educativi. Leggi
            online, scarica in PDF o EPUB, e goditi la lettura vocale.
          </p>

          {/* Libri Random */}
          <div className="space-y-2 mb-6">
            {libriRandom.map((libro) => (
              <div
                key={libro._id}
                className="flex items-center gap-2 text-blue-100 text-sm"
              >
                <span className="text-lg">{libro.icona}</span>
                <span>
                  "{libro.titolo}" di {libro.autore}
                </span>
              </div>
            ))}
          </div>

          <Link
            to="/biblioteca"
            className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-blue-50 transition"
          >
            Esplora la Biblioteca
            <ArrowRight size={20} />
          </Link>
        </div>

        {/* Features Highlights */}
        <div className="space-y-4">
          <div className="bg-white bg-opacity-20 rounded-lg p-4 backdrop-blur">
            <div className="flex items-center gap-3 mb-2">
              <BookOpen size={24} />
              <h3 className="font-bold text-lg">Lettura Online</h3>
            </div>
            <p className="text-blue-100 text-sm">
              Accedi a tutti i libri direttamente dal browser, con controlli di
              lettura intuitivi.
            </p>
          </div>

          <div className="bg-white bg-opacity-20 rounded-lg p-4 backdrop-blur">
            <div className="flex items-center gap-3 mb-2">
              <Volume2 size={24} />
              <h3 className="font-bold text-lg">Lettura Vocale</h3>
            </div>
            <p className="text-blue-100 text-sm">
              Ascolta i libri con la tecnologia text-to-speech integrata nel
              browser.
            </p>
          </div>

          <div className="bg-white bg-opacity-20 rounded-lg p-4 backdrop-blur">
            <div className="flex items-center gap-3 mb-2">
              <Download size={24} />
              <h3 className="font-bold text-lg">Scarica Offline</h3>
            </div>
            <p className="text-blue-100 text-sm">
              Salva i libri in PDF o EPUB per leggerli offline su qualsiasi
              dispositivo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

/**
 * Mini Card Biblioteca per Dashboard
 * Uso: <BibliotecaMiniCard />
 *
 * Mostra statistiche rapide
 */
export const BibliotecaMiniCard = () => {
  return (
    <Link
      to="/biblioteca"
      className="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg shadow hover:shadow-lg transition p-6 border-l-4 border-blue-600"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <BookOpen size={24} className="text-blue-600" />
          Biblioteca
        </h3>
        <ArrowRight size={20} className="text-green-600" />
      </div>
      <p className="text-gray-600 text-sm mb-4">
        Accedi a 8+ libri spirituali con lettura vocale e download offline.
      </p>
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-2xl font-bold text-blue-600">8</p>
          <p className="text-gray-600">Libri</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-green-600">🔊</p>
          <p className="text-gray-600">TTS Incluso</p>
        </div>
      </div>
    </Link>
  );
};

/**
 * Banner Biblioteca Full Width
 * Uso: <BibliotecaBanner />
 *
 * Mostra come banner hero opzionale
 */
export const BibliotecaBanner = () => {
  return (
    <div className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-green-600 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-pattern"></div>
      </div>

      <div className="relative container mx-auto px-4 py-16 text-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Sezione Testo */}
          <div className="md:col-span-2">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              📚 Scopri la Tua Prossima Lettura Ispiratrice
            </h2>
            <p className="text-xl text-blue-100 mb-6">
              Una collezione curata di libri spirituali, educativi e per
              bambini. Leggi online, ascolta con la lettura vocale, scarica
              offline.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/biblioteca"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-blue-50 transition inline-flex items-center gap-2"
              >
                <BookOpen size={20} />
                Visita la Biblioteca
              </Link>
              <a
                href="#features"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-blue-600 transition"
              >
                Scopri di Più
              </a>
            </div>
          </div>

          {/* Sezione Statistiche */}
          <div className="bg-white bg-opacity-10 backdrop-blur rounded-xl p-6">
            <div className="space-y-4">
              <div>
                <p className="text-4xl font-bold">8+</p>
                <p className="text-blue-100">Libri</p>
              </div>
              <div>
                <p className="text-4xl font-bold">4</p>
                <p className="text-blue-100">Categorie</p>
              </div>
              <div>
                <p className="text-4xl font-bold">9K+</p>
                <p className="text-blue-100">Download</p>
              </div>
              <button className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition">
                Comincia Ora →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * List Item Biblioteca per Sidebar/Menu
 * Uso: <BibliotecaMenuItem />
 */
export const BibliotecaMenuItem = ({ className = "" }) => {
  return (
    <Link
      to="/biblioteca"
      className={`flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-100 dark:hover:bg-gray-700 transition font-semibold text-gray-800 dark:text-white ${className}`}
    >
      <BookOpen size={20} className="text-blue-600" />
      <span>📚 Biblioteca Digitale</span>
      <Volume2 size={16} className="ml-auto text-green-600" />
    </Link>
  );
};

/**
 * Footer Link Biblioteca
 * Uso: Aggiungi al footer component
 */
export const BibliotecaFooterLink = () => {
  return (
    <div className="space-y-3">
      <h4 className="font-bold text-gray-800 dark:text-white">
        📚 Biblioteca Digitale
      </h4>
      <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
        <li>
          <Link to="/biblioteca" className="hover:text-blue-600 transition">
            Catalogo Completo
          </Link>
        </li>
        <li>
          <Link
            to="/biblioteca?type=bambini"
            className="hover:text-blue-600 transition"
          >
            Per Bambini
          </Link>
        </li>
        <li>
          <Link
            to="/biblioteca?category=teologia"
            className="hover:text-blue-600 transition"
          >
            Studi Teologici
          </Link>
        </li>
        <li>
          <a href="#" className="hover:text-blue-600 transition">
            Richiedi un Libro
          </a>
        </li>
      </ul>
    </div>
  );
};

/**
 * Search Box per aggiungere ricerca biblioteca in navbar
 * Uso: <BibliotecaSearch />
 */
export const BibliotecaSearch = () => {
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Naviga alla biblioteca con query parameter
      window.location.href = `/biblioteca?search=${encodeURIComponent(
        searchTerm
      )}`;
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center gap-2 bg-white rounded-lg px-3 py-2"
    >
      <BookOpen size={18} className="text-gray-400" />
      <input
        type="text"
        placeholder="Cerca libro..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="bg-transparent outline-none text-sm w-32"
      />
    </form>
  );
};

export default {
  BibliotecaPromo,
  BibliotecaMiniCard,
  BibliotecaBanner,
  BibliotecaMenuItem,
  BibliotecaFooterLink,
  BibliotecaSearch,
};
