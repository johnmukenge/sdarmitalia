import { useState } from "react";
import { Download, Volume2, BookOpen, Star } from "lucide-react";
import { Link } from "react-router-dom";
import apiClient from "../../services/apiClient";

const LibroCard = ({ libro, onTtsClick, onDownloadSuccess }) => {
  const [localDownloads, setLocalDownloads] = useState(libro.downloads || 0);
  const [isDownloading, setIsDownloading] = useState(false);

  // Verifica se il libro è disponibile per il download
  const isLibroDisponibile = Boolean(libro.fileUrl);

  const handleDownload = async () => {
    // Controlla se il libro è disponibile
    if (!libro.fileUrl) {
      alert("📚 Libro non ancora caricato. Riprova più tardi.");
      return;
    }

    if (isDownloading) return;

    try {
      setIsDownloading(true);

      // Metodo 1: Fetch del file come blob (più affidabile)
      try {
        const fileResponse = await fetch(libro.fileUrl);
        if (!fileResponse.ok) throw new Error('File non trovato');
        
        const blob = await fileResponse.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${libro.title.replace(/[^a-z0-9]/gi, '_')}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } catch (fetchError) {
        // Metodo 2: Fallback con link diretto
        console.log('Fallback al metodo di download diretto');
        window.open(libro.fileUrl, "_blank");
      }

      // Incrementa il contatore dei download nel backend
      try {
        await apiClient.downloadLibro(libro._id);
        const newDownloadCount = localDownloads + 1;
        setLocalDownloads(newDownloadCount);
        
        // Notifica il componente padre per aggiornare le statistiche globali
        if (onDownloadSuccess) {
          onDownloadSuccess(newDownloadCount);
        }
      } catch (apiError) {
        console.error("Errore nell'incremento downloads:", apiError);
        // Il download è comunque riuscito, quindi non mostriamo errore all'utente
      }
    } catch (error) {
      console.error("Errore nel download:", error);
      alert("❌ Errore durante il download. Riprova più tardi.");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleLeggiOnline = (e) => {
    if (!libro.fileUrl) {
      e.preventDefault();
      alert("📚 Libro non ancora caricato. Riprova più tardi.");
    }
  };

  // Gestione immagine di copertina con fallback
  const [imgError, setImgError] = useState(false);
  
  const getCoverImage = () => {
    if (imgError) {
      return null; // Mostrerà il fallback con titolo e icona
    }
    
    if (libro.cover) {
      // Se è un path locale che inizia con /src/, usa import.meta.url per Vite
      if (libro.cover.startsWith('/src/assets/')) {
        try {
          const imagePath = libro.cover.replace('/src/', '../../');
          return new URL(imagePath, import.meta.url).href;
        } catch (e) {
          console.error('Errore caricamento immagine locale:', e);
          return null;
        }
      }
      
      // Se è un URL esterno, encode correttamente
      try {
        return libro.cover.replace(/\s+/g, '+');
      } catch (e) {
        return libro.cover;
      }
    }
    
    // Default fallback image
    return "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=300&h=400&fit=crop";
  };

  const handleImageError = () => {
    console.log("Errore caricamento immagine per:", libro.title);
    setImgError(true);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:scale-105 duration-300">
      {/* Immagine Libro */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-100 to-green-100 h-64">
        {!imgError && getCoverImage() && (
          <img
            src={getCoverImage()}
            alt={libro.title}
            className="w-full h-full object-cover"
            onError={handleImageError}
            loading="lazy"
          />
        )}
        {/* Fallback: mostra titolo e icona libro se immagine non disponibile */}
        {imgError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-blue-200 via-purple-200 to-green-200">
            <div className="bg-white/80 backdrop-blur-sm rounded-full p-4 mb-3 shadow-lg">
              <BookOpen size={40} className="text-blue-600" />
            </div>
            <h4 className="text-base font-bold text-gray-900 line-clamp-3 px-2 bg-white/70 backdrop-blur-sm rounded-lg py-2">
              {libro.title}
            </h4>
            <p className="text-xs text-gray-600 mt-2 bg-white/70 backdrop-blur-sm rounded px-3 py-1">
              {libro.author}
            </p>
          </div>
        )}
        <div className="absolute top-2 left-2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
          {libro.category}
        </div>
        {libro.featured && (
          <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold">
            ⭐ In Evidenza
          </div>
        )}
        {!isLibroDisponibile && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
            📦 Non Disponibile
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
          <span>📥 {localDownloads.toLocaleString()} download</span>
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
            to={isLibroDisponibile ? `/biblioteca/${libro._id}` : "#"}
            onClick={handleLeggiOnline}
            className={`flex items-center justify-center gap-2 w-full py-2 px-4 rounded-lg font-semibold transition text-sm ${
              isLibroDisponibile
                ? "bg-blue-950 text-white hover:bg-blue-900"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
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
            <button
              onClick={handleDownload}
              disabled={!isLibroDisponibile || isDownloading}
              className={`flex-1 flex items-center justify-center gap-1 py-2 px-3 rounded-lg font-semibold transition text-sm ${
                !isLibroDisponibile || isDownloading
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              <Download size={16} />
              {isDownloading ? "⏳ Download..." : "Scarica"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibroCard;
