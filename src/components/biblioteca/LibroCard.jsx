import { Download, Volume2, BookOpen, Star } from "lucide-react";
import { Link } from "react-router-dom";

const LibroCard = ({ libro, onTtsClick }) => {
  const handleDownload = (format) => {
    // Logica di download - usa il percorso del file dal server
    if (libro.filePath) {
      window.open(`http://localhost:5000${libro.filePath}`, "_blank");
    } else {
      alert("File non disponibile per il download");
    }
  };

  // Immagine di placeholder se non disponibile
  const coverImage =
    libro.cover ||
    "https://images.unsplash.com/photo-150784272343-583f20270319?w=300&h=400&fit=crop";

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:scale-105 duration-300">
      {/* Immagine Libro */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-100 to-green-100 h-64">
        <img
          src={coverImage}
          alt={libro.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 left-2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
          {libro.category}
        </div>
        {libro.featured && (
          <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold">
            ⭐ In Evidenza
          </div>
        )}
      </div>

      {/* Contenuto Card */}
      <div className="p-5">
        {/* Titolo */}
        <h3 className="text-lg font-bold text-gray-800 mb-1 line-clamp-2 h-14">
          {libro.title}
        </h3>

        {/* Autore */}
        <p className="text-sm text-gray-600 mb-3">di {libro.author}</p>

        {/* Rating e Download */}
        <div className="flex items-center justify-between mb-3 text-xs text-gray-600">
          <div className="flex items-center gap-1">
            <Star size={16} className="text-yellow-500 fill-yellow-500" />
            <span className="font-semibold">{libro.rating.toFixed(1)}</span>
            <span className="text-gray-500">({libro.ratingCount})</span>
          </div>
          <span>📥 {libro.downloads} download</span>
        </div>

        {/* Descrizione breve */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {libro.description}
        </p>

        {/* Metadati */}
        <div className="grid grid-cols-2 gap-2 mb-4 text-xs text-gray-700 bg-gray-50 p-3 rounded-lg">
          <div>
            <span className="font-semibold">Autore:</span> {libro.author}
          </div>
          <div>
            <span className="font-semibold">Pagine:</span>{" "}
            {libro.pages || "N/A"}
          </div>
          <div>
            <span className="font-semibold">Lingua:</span>{" "}
            {libro.language === "it" ? "Italiano" : libro.language}
          </div>
          <div>
            <span className="font-semibold">ISBN:</span> {libro.isbn || "N/A"}
          </div>
        </div>

        {/* Pulsanti Azioni */}
        <div className="space-y-2">
          {/* Bottone Leggi Online */}
          <Link
            to={`/biblioteca/${libro._id}`}
            className="flex items-center justify-center gap-2 w-full bg-blue-950 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-900 transition text-sm"
          >
            <BookOpen size={18} />
            Leggi Online
          </Link>

          {/* Bottoni Download e TTS */}
          <div className="flex gap-2">
            <button
              onClick={() => onTtsClick(libro)}
              className="flex-1 flex items-center justify-center gap-1 bg-green-100 text-green-700 py-2 px-3 rounded-lg font-semibold hover:bg-green-200 transition text-sm"
              title="Ascolta il libro"
            >
              <Volume2 size={16} />
              Ascolta
            </button>
            <div className="flex-1 relative group">
              <button className="w-full flex items-center justify-center gap-1 bg-gray-200 text-gray-700 py-2 px-3 rounded-lg font-semibold hover:bg-gray-300 transition text-sm">
                <Download size={16} />
                Scarica
              </button>
              {/* Menu Download */}
              <div className="absolute right-0 top-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition z-10">
                <button
                  onClick={() => handleDownload("pdf")}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm font-medium text-gray-700 border-b"
                >
                  📄 PDF
                </button>
                <button
                  onClick={() => handleDownload("epub")}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm font-medium text-gray-700"
                >
                  📖 EPUB
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibroCard;
