import { useState, useEffect, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Volume2,
  Download,
  Home,
  Settings,
} from "lucide-react";
import { useParams, Link } from "react-router-dom";
import libri from "../../data/libri";

const LettoreLibro = () => {
  const { id } = useParams();
  const [libro, setLibro] = useState(null);
  const [ttsActive, setTtsActive] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [textSize, setTextSize] = useState("text-base");
  const [darkMode, setDarkMode] = useState(false);
  const [ttsVoice, setTtsVoice] = useState(0);
  const [ttsRate, setTtsRate] = useState(1);
  const contentRef = useRef(null);
  const utteranceRef = useRef(null);

  useEffect(() => {
    // Trova il libro per ID
    const libroSelezionato = libri.find((l) => l._id === id);
    if (libroSelezionato) {
      setLibro(libroSelezionato);
    }
  }, [id]);

  // Gestione Text-to-Speech
  const startTTS = () => {
    if ("speechSynthesis" in window) {
      const text = contentRef.current?.innerText || "";

      // Cancel previous speech if any
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = ttsRate;
      utterance.pitch = 1;
      utterance.volume = 1;

      // Set voice se disponibile
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        // Cerca una voce italiana se disponibile
        const italianVoice = voices.find((voice) => voice.lang.includes("it"));
        if (italianVoice) {
          utterance.voice = italianVoice;
        } else {
          utterance.voice = voices[ttsVoice];
        }
      }

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
      utteranceRef.current = utterance;
    }
  };

  const stopTTS = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const handleDownload = (format) => {
    const url = format === "pdf" ? libro.pdfUrl : libro.epubUrl;
    window.open(url, "_blank");
  };

  if (!libro) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 pt-24 pb-12 flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl text-gray-600 mb-4">Caricamento...</p>
          <Link
            to="/biblioteca"
            className="text-blue-600 hover:text-blue-800 font-semibold"
          >
            Torna alla Biblioteca
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-br from-blue-50 to-green-50"
      } pt-20 pb-12`}
    >
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header Lettore */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-1">
                {libro.titolo}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                di {libro.autore}
              </p>
            </div>
            <Link
              to="/biblioteca"
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
              title="Torna alla biblioteca"
            >
              <Home size={24} className="text-blue-600" />
            </Link>
          </div>

          {/* Info Libro */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 dark:bg-gray-700 p-3 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-300">Pagine</p>
              <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
                {libro.pagine}
              </p>
            </div>
            <div className="bg-green-50 dark:bg-gray-700 p-3 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Capitoli
              </p>
              <p className="text-xl font-bold text-green-600 dark:text-green-400">
                {libro.numeroCapitoli}
              </p>
            </div>
            <div className="bg-purple-50 dark:bg-gray-700 p-3 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-300">Anno</p>
              <p className="text-xl font-bold text-purple-600 dark:text-purple-400">
                {libro.anno}
              </p>
            </div>
            <div className="bg-orange-50 dark:bg-gray-700 p-3 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Categoria
              </p>
              <p className="text-lg font-bold text-orange-600 dark:text-orange-400">
                {libro.categoria}
              </p>
            </div>
          </div>

          {/* Barra di Controllo TTS e Download */}
          <div className="flex flex-wrap gap-3 mb-6">
            <button
              onClick={() => setTtsActive(!ttsActive)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition ${
                ttsActive
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-green-100 text-green-700 hover:bg-green-200"
              }`}
            >
              <Volume2 size={18} />
              {ttsActive ? "Lettura Attiva" : "Abilita Lettura Vocale"}
            </button>

            {ttsActive && (
              <>
                <button
                  onClick={isSpeaking ? stopTTS : startTTS}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition ${
                    isSpeaking
                      ? "bg-red-600 text-white hover:bg-red-700"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  <Volume2 size={18} />
                  {isSpeaking ? "Ferma Lettura" : "Inizia Lettura"}
                </button>

                {/* Controlli TTS */}
                <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-lg">
                  <label className="text-sm text-gray-700 dark:text-gray-300">
                    Velocità:
                  </label>
                  <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.1"
                    value={ttsRate}
                    onChange={(e) => setTtsRate(parseFloat(e.target.value))}
                    className="w-24"
                  />
                  <span className="text-sm font-semibold">
                    {ttsRate.toFixed(1)}x
                  </span>
                </div>
              </>
            )}

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              <Settings size={18} />
              {darkMode ? "Chiaro" : "Scuro"}
            </button>

            <select
              value={textSize}
              onChange={(e) => setTextSize(e.target.value)}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              <option value="text-sm">Piccolo</option>
              <option value="text-base">Normale</option>
              <option value="text-lg">Grande</option>
              <option value="text-xl">Molto Grande</option>
            </select>

            <div className="flex gap-2">
              <button
                onClick={() => handleDownload("pdf")}
                className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-semibold hover:bg-blue-200 transition"
              >
                <Download size={18} />
                PDF
              </button>
              <button
                onClick={() => handleDownload("epub")}
                className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg font-semibold hover:bg-purple-200 transition"
              >
                <Download size={18} />
                EPUB
              </button>
            </div>
          </div>
        </div>

        {/* Contenuto Libro */}
        <div
          className={`${
            darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"
          } rounded-xl shadow-lg p-8 mb-6 min-h-96 leading-relaxed`}
        >
          <div ref={contentRef} className={`${textSize} whitespace-pre-wrap`}>
            {libro.contenuto}
          </div>
        </div>

        {/* Pulsanti Navigazione */}
        <div className="flex gap-4 mb-6">
          <Link
            to="/biblioteca"
            className="flex items-center gap-2 px-6 py-3 bg-blue-950 text-white rounded-lg font-semibold hover:bg-blue-900 transition"
          >
            <ChevronLeft size={20} />
            Torna alla Biblioteca
          </Link>
        </div>

        {/* Descrizione */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
            Descrizione del Libro
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            {libro.descrizione}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-semibold text-gray-600 dark:text-gray-400">
                Autore:
              </span>{" "}
              <p className="text-gray-800 dark:text-white">{libro.autore}</p>
            </div>
            <div>
              <span className="font-semibold text-gray-600 dark:text-gray-400">
                Categoria:
              </span>{" "}
              <p className="text-gray-800 dark:text-white">{libro.categoria}</p>
            </div>
            <div>
              <span className="font-semibold text-gray-600 dark:text-gray-400">
                Lingua:
              </span>{" "}
              <p className="text-gray-800 dark:text-white">{libro.lingua}</p>
            </div>
            {libro.perBambini && (
              <div>
                <span className="font-semibold text-gray-600 dark:text-gray-400">
                  Età Consigliata:
                </span>{" "}
                <p className="text-gray-800 dark:text-white">
                  {libro.etaConsigliata}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LettoreLibro;
