import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  MapPin,
  Calendar,
  Users,
  DollarSign,
  AlertCircle,
  Loader,
  Image as ImageIcon,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import apiClient from "../../services/apiClient";

// Import immagini sede campo
import salaCultoLocale1 from "../../assets/sede_campo/sala culto locale.jpeg";
import salaCultoLocale2 from "../../assets/sede_campo/sala culto locale 2.jpeg";
import salaConferenze1 from "../../assets/sede_campo/sala conferenze.jpeg";
import salaConferenze2 from "../../assets/sede_campo/sala conferenze 2.jpeg";
import salaConferenze3 from "../../assets/sede_campo/sala conferenze 3.jpeg";
import salaConferenze4 from "../../assets/sede_campo/sala conferenze 4.jpeg";
import salaConferenze5 from "../../assets/sede_campo/sala conferenze 5.jpeg";
import salaConferenze6 from "../../assets/sede_campo/sala conferenze 6.jpeg";
import cucina1 from "../../assets/sede_campo/cucina 1.jpeg";
import cucina2 from "../../assets/sede_campo/cucina 2.jpeg";
import cucina3 from "../../assets/sede_campo/cucina 3.jpeg";
import cucina4 from "../../assets/sede_campo/cucina 4.jpeg";
import cucina5 from "../../assets/sede_campo/cucina 5.jpeg";

// Organizzazione galleria per categorie
const galleryCategories = [
  {
    id: "sala-culto",
    name: "Sala Culto Locale",
    description: "Spazio dedicato all'adorazione e alla comunione spirituale",
    icon: "🙏",
    images: [
      { src: salaCultoLocale1, alt: "Sala Culto - Vista principale", caption: "Ambiente accogliente per la preghiera" },
      { src: salaCultoLocale2, alt: "Sala Culto - Vista laterale", caption: "Disposizione dei posti a sedere" },
    ],
  },
  {
    id: "sala-conferenze",
    name: "Sala Conferenze",
    description: "Area polivalente per eventi, conferenze e attività comunitarie",
    icon: "📚",
    images: [
      { src: salaConferenze1, alt: "Sala Conferenze - Panoramica", caption: "Spazio versatile per eventi" },
      { src: salaConferenze2, alt: "Sala Conferenze - Setup 1", caption: "Configurazione per conferenze" },
      { src: salaConferenze3, alt: "Sala Conferenze - Setup 2", caption: "Area presentazioni" },
      { src: salaConferenze4, alt: "Sala Conferenze - Dettagli", caption: "Attrezzature moderne" },
      { src: salaConferenze5, alt: "Sala Conferenze - Vista laterale", caption: "Capienza fino a 100 persone" },
      { src: salaConferenze6, alt: "Sala Conferenze - Allestimento", caption: "Flessibilità degli spazi" },
    ],
  },
  {
    id: "cucina",
    name: "Cucina Comunitaria",
    description: "Cucina attrezzata per preparare pasti e momenti di condivisione",
    icon: "🍽️",
    images: [
      { src: cucina1, alt: "Cucina - Vista generale", caption: "Cucina professionale attrezzata" },
      { src: cucina2, alt: "Cucina - Area cottura", caption: "Piano cottura e attrezzature" },
      { src: cucina3, alt: "Cucina - Zona preparazione", caption: "Ampio spazio di lavoro" },
      { src: cucina4, alt: "Cucina - Elettrodomestici", caption: "Moderne apparecchiature" },
      { src: cucina5, alt: "Cucina - Dettagli", caption: "Materiali di qualità" },
    ],
  },
  {
    id: "vista-esterna",
    name: "Vista Esterna",
    description: "L'edificio e il contesto paesaggistico circostante",
    icon: "🏛️",
    images: [],
    comingSoon: true,
  },
  {
    id: "sala-pranzo",
    name: "Sala Pranzo",
    description: "Spazio conviviale per pasti comunitari e momenti di socialità",
    icon: "🍴",
    images: [],
    comingSoon: true,
  },
  {
    id: "ingresso",
    name: "Ingresso e Reception",
    description: "Area di accoglienza e punto informativo",
    icon: "🚪",
    images: [],
    comingSoon: true,
  },
  {
    id: "sala-consiglio",
    name: "Sala Consiglio",
    description: "Spazio riservato per riunioni amministrative",
    icon: "💼",
    images: [],
    comingSoon: true,
  },
  {
    id: "bagni",
    name: "Servizi Igienici",
    description: "Bagni moderni e accessibili",
    icon: "🚻",
    images: [],
    comingSoon: true,
  },
];

const NewCampus = () => {
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [projectPhases, setProjectPhases] = useState([]);
  const [projectStats, setProjectStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("sala-culto");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);

  // Fetch project phases and statistics
  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch all project phases
        const phasesResponse = await apiClient.getProjectPhases();
        if (phasesResponse.success && phasesResponse.data) {
          setProjectPhases(phasesResponse.data.phases || []);
        }

        // Fetch project statistics
        const statsResponse = await apiClient.getProjectStats();
        if (statsResponse.success && statsResponse.data) {
          setProjectStats(statsResponse.data);
        }

        setCurrentPhaseIndex(0);
      } catch (err) {
        console.error("Error fetching project data:", err);
        setError(
          err.message ||
            "Si è verificato un errore nel caricamento dei dati del progetto"
        );
        // Fallback to default phases if API fails
        setProjectPhases([
          {
            phaseNumber: 1,
            title: "Acquisto del Terreno",
            status: "Completato",
            percentage: 100,
            description: "Studio preliminare e acquisizione della proprietà",
            fullDescription:
              "Acquisizione del terreno strategico con tutte le autorizzazioni",
          },
          {
            phaseNumber: 2,
            title: "Sala Culto Provvisoria",
            status: "Completato",
            percentage: 100,
            description:
              "Realizzazione della sala di culto temporanea per la comunità",
            fullDescription: "Struttura provvisoria completata e in uso",
          },
          {
            phaseNumber: 3,
            title: "Sala Culto Definitiva",
            status: "In corso",
            percentage: 65,
            description: "Costruzione della sala di culto principale",
            fullDescription:
              "La struttura principale è in avanzata fase di realizzazione",
          },
          {
            phaseNumber: 4,
            title: "Inaugurazione",
            status: "In pianificazione",
            percentage: 0,
            description: "Inaugurazione ufficiale della nuova sede",
            fullDescription:
              "Preparazione dell'evento inaugurale e avvio delle attività",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectData();
  }, []);

  const nextPhase = () => {
    setCurrentPhaseIndex((prev) => (prev + 1) % projectPhases.length);
  };

  const prevPhase = () => {
    setCurrentPhaseIndex(
      (prev) => (prev - 1 + projectPhases.length) % projectPhases.length
    );
  };

  const currentPhase =
    projectPhases.length > 0 ? projectPhases[currentPhaseIndex] : null;

  // Funzioni per gestire il lightbox
  const openLightbox = (image) => {
    setLightboxImage(image);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setLightboxImage(null);
  };

  const selectedCategoryData = galleryCategories.find(
    (cat) => cat.id === selectedCategory
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Nuova Sede - Campo
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-600 to-green-600 mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Uniamoci in questa meravigliosa avventura di crescita spirituale e
            comunità. La nostra nuova sede sarà uno spazio dedicato al servizio
            di Dio e alla comunità.
          </p>
        </div>

        {/* Error State */}
        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 text-red-800">
            <AlertCircle size={24} className="text-red-600 flex-shrink-0" />
            <div>
              <p className="font-semibold">Errore nel caricamento</p>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader size={32} className="text-blue-600 animate-spin" />
            <span className="ml-3 text-gray-600">
              Caricamento dati del progetto...
            </span>
          </div>
        ) : (
          <>
            {/* 📊 Sezione Progresso Generale */}
            <section className="mb-16">
              <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
                  <Calendar className="text-blue-600" size={32} />
                  Avanzamento Progetto
                </h2>

                {/* Progress Bar Globale */}
                <div className="mb-12">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-lg font-semibold text-gray-700">
                      Progresso Generale
                    </span>
                    <span className="text-2xl font-bold text-green-600">
                      {projectStats?.totalProgress?.toFixed(1) || "0"}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-600 to-green-600 transition-all duration-500 rounded-full"
                      style={{
                        width: `${projectStats?.totalProgress || 0}%`,
                      }}
                    ></div>
                  </div>
                </div>

                {/* Timeline Visual */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
                  {projectPhases.map((phase, index) => (
                    <div
                      key={phase._id || phase.phaseNumber}
                      className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                        index === currentPhaseIndex
                          ? "bg-blue-100 border-blue-600 shadow-lg"
                          : "bg-gray-50 border-gray-300 hover:border-blue-300"
                      }`}
                      onClick={() => setCurrentPhaseIndex(index)}
                    >
                      <div className="font-bold text-sm text-gray-700 mb-2">
                        Fase {phase.phaseNumber}
                      </div>
                      <div className="text-xs text-gray-600 mb-3 line-clamp-2">
                        {phase.title}
                      </div>
                      <div className="w-full bg-gray-300 rounded-full h-2 mb-2">
                        <div
                          className="h-full bg-green-500 rounded-full transition-all"
                          style={{ width: `${phase.percentage}%` }}
                        ></div>
                      </div>
                      <div className="text-xs font-semibold text-gray-700">
                        {phase.percentage}%
                      </div>
                    </div>
                  ))}
                </div>

                {/* Fase Dettagliata */}
                {currentPhase && (
                  <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-8 mb-8">
                    <div className="flex items-center justify-between mb-4">
                      <button
                        onClick={prevPhase}
                        className="p-2 hover:bg-white rounded-full transition-all shadow-md"
                        aria-label="Fase precedente"
                      >
                        <ChevronLeft size={24} className="text-blue-600" />
                      </button>
                      <div className="flex-1 mx-4">
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">
                          {currentPhase.title}
                        </h3>
                        <p className="text-gray-600 mb-4">
                          {currentPhase.fullDescription ||
                            currentPhase.description}
                        </p>
                        <div className="flex flex-wrap gap-4 mb-4">
                          <span className="inline-block bg-blue-200 text-blue-800 px-4 py-1 rounded-full text-sm font-semibold">
                            {currentPhase.status}
                          </span>
                        </div>
                        <div className="w-full bg-gray-300 rounded-full h-3 mb-2">
                          <div
                            className="h-full bg-gradient-to-r from-blue-600 to-green-600 rounded-full transition-all"
                            style={{ width: `${currentPhase.percentage}%` }}
                          ></div>
                        </div>
                        <div className="text-right text-sm font-semibold text-gray-700">
                          {currentPhase.percentage}% Completato
                        </div>
                      </div>
                      <button
                        onClick={nextPhase}
                        className="p-2 hover:bg-white rounded-full transition-all shadow-md"
                        aria-label="Fase successiva"
                      >
                        <ChevronRight size={24} className="text-blue-600" />
                      </button>
                    </div>

                    {/* Dettagli Fase */}
                    {currentPhase.details &&
                      currentPhase.details.length > 0 && (
                        <div className="mt-8 pt-8 border-t-2 border-white">
                          <h4 className="font-bold text-lg text-gray-800 mb-4">
                            Attività in questa fase:
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {currentPhase.details.map((detail, idx) => (
                              <div key={idx} className="flex items-start gap-3">
                                <CheckCircle
                                  className="text-green-600 flex-shrink-0 mt-1"
                                  size={20}
                                />
                                <span className="text-gray-700">{detail}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                    {/* Objectives */}
                    {currentPhase.objectives &&
                      currentPhase.objectives.length > 0 && (
                        <div className="mt-8 pt-8 border-t-2 border-white">
                          <h4 className="font-bold text-lg text-gray-800 mb-4">
                            Obiettivi:
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {currentPhase.objectives.map((obj, idx) => (
                              <div key={idx} className="flex items-start gap-3">
                                <CheckCircle
                                  className={`flex-shrink-0 mt-1 ${
                                    obj.completed
                                      ? "text-green-600"
                                      : "text-gray-400"
                                  }`}
                                  size={20}
                                />
                                <div className="flex-1">
                                  <p
                                    className={`font-semibold ${
                                      obj.completed
                                        ? "text-gray-800"
                                        : "text-gray-600"
                                    }`}
                                  >
                                    {obj.title || obj.name}
                                  </p>
                                  {obj.description && (
                                    <p className="text-sm text-gray-600 mt-1">
                                      {obj.description}
                                    </p>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                  </div>
                )}
              </div>
            </section>

            {/* �️ Galleria Fotografica Professionale della Sede */}
            <section className="mb-16">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden p-8 md:p-12">
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
                    <ImageIcon size={36} className="text-blue-600" />
                    Galleria Fotografica della Sede
                  </h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Esplora gli spazi della nostra nuova sede attraverso una galleria fotografica dettagliata. 
                    Scopri ogni ambiente e visualizza i progressi della costruzione.
                  </p>
                </div>

                {/* Filtri Categorie */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                  {galleryCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`px-6 py-3 rounded-full font-semibold transition-all flex items-center gap-2 ${
                        selectedCategory === category.id
                          ? "bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-lg scale-105"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <span className="text-xl">{category.icon}</span>
                      <span>{category.name}</span>
                      {category.comingSoon && (
                        <span className="text-xs bg-yellow-400 text-gray-800 px-2 py-0.5 rounded-full ml-1">
                          Prossimamente
                        </span>
                      )}
                    </button>
                  ))}
                </div>

                {/* Descrizione Categoria Selezionata */}
                {selectedCategoryData && (
                  <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 mb-8 text-center">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
                      <span className="text-3xl">{selectedCategoryData.icon}</span>
                      {selectedCategoryData.name}
                    </h3>
                    <p className="text-gray-600 text-lg">
                      {selectedCategoryData.description}
                    </p>
                  </div>
                )}

                {/* Griglia Immagini */}
                {selectedCategoryData && !selectedCategoryData.comingSoon ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {selectedCategoryData.images.map((image, idx) => (
                      <div
                        key={idx}
                        className="group relative aspect-[4/3] overflow-hidden rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer"
                        onClick={() => openLightbox(image)}
                      >
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                          <div className="p-4 text-white w-full">
                            <p className="font-semibold text-lg mb-1">
                              {image.caption}
                            </p>
                            <p className="text-sm text-gray-200">
                              Clicca per ingrandire
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
                    <div className="text-6xl mb-4">📸</div>
                    <h4 className="text-2xl font-bold text-gray-700 mb-2">
                      Foto in Arrivo
                    </h4>
                    <p className="text-gray-600 max-w-md mx-auto">
                      Le immagini di questa sezione saranno disponibili a breve. 
                      Stiamo documentando ogni fase della costruzione!
                    </p>
                  </div>
                )}

                {/* Statistiche Galleria */}
                {selectedCategoryData && !selectedCategoryData.comingSoon && (
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <div className="text-center text-sm text-gray-600">
                      <strong>{selectedCategoryData.images.length}</strong> {selectedCategoryData.images.length === 1 ? 'foto disponibile' : 'foto disponibili'} in questa categoria
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Lightbox per visualizzazione immagini a schermo intero */}
            {lightboxOpen && lightboxImage && (
              <div
                className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 animate-fadeIn"
                onClick={closeLightbox}
              >
                <button
                  onClick={closeLightbox}
                  className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
                  aria-label="Chiudi"
                >
                  <X size={40} />
                </button>
                <div className="max-w-7xl max-h-full w-full h-full flex flex-col items-center justify-center">
                  <img
                    src={lightboxImage.src}
                    alt={lightboxImage.alt}
                    className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                  />
                  <div className="mt-6 text-center text-white max-w-2xl">
                    <p className="text-2xl font-bold mb-2">
                      {lightboxImage.caption}
                    </p>
                    <p className="text-gray-300">
                      {lightboxImage.alt}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 📋 Sezione Dettagli Progetto */}
            <section className="mb-16">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <MapPin className="text-blue-600 mb-4" size={40} />
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    Ubicazione
                  </h3>
                  <p className="text-gray-600 mb-4">
                    La nuova sede si troverà in una posizione strategica,
                    facilmente raggiungibile dalla comunità.
                  </p>
                  <p className="text-sm text-gray-500">
                    📍 Casentino - Toscana, Italia
                  </p>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <Users className="text-green-600 mb-4" size={40} />
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    Comunità
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Un luogo accogliente dove la comunità può riunirsi, adorare
                    e crescere spiritualmente insieme.
                  </p>
                  <p className="text-sm text-gray-500">
                    👥 Spazi per 150+ persone
                  </p>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <Calendar className="text-purple-600 mb-4" size={40} />
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    Timeline
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {currentPhase
                      ? `Fase ${
                          currentPhase.phaseNumber
                        }: ${currentPhase.status.toLowerCase()}`
                      : "Inaugurazione prevista per l agosto 2025. Siamo in linea con i nostri piani."}
                  </p>
                  <p className="text-sm text-gray-500">
                    ⏰ Progresso: {projectStats?.totalProgress?.toFixed(1)}%
                  </p>
                </div>
              </div>
            </section>

            {/* 💝 Sezione Donazioni */}
            <section className="mb-16">
              <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl shadow-xl p-12 text-white">
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
                    <DollarSign size={40} />
                    Sostieni la Nuova Sede
                  </h2>
                  <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                    La vostra generosità è essenziale per realizzare questa
                    visione. Ogni contributo, grande o piccolo, fa una
                    differenza nel nostro cammino di fede.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  <div className="bg-white bg-opacity-20 rounded-lg p-6 text-center">
                    <div className="text-3xl font-bold mb-2">€50</div>
                    <p className="text-blue-100 mb-4">Contributo Base</p>
                    <p className="text-sm text-blue-50">
                      Aiuta con i costi di costruzione quotidiani
                    </p>
                  </div>
                  <div className="bg-white bg-opacity-30 rounded-lg p-6 text-center border-2 border-white">
                    <div className="text-3xl font-bold mb-2">€250</div>
                    <p className="text-blue-100 mb-4">
                      Contributo Significativo
                    </p>
                    <p className="text-sm text-blue-50">
                      Sostiene i materiali costruttivi
                    </p>
                  </div>
                  <div className="bg-white bg-opacity-20 rounded-lg p-6 text-center">
                    <div className="text-3xl font-bold mb-2">€1000+</div>
                    <p className="text-blue-100 mb-4">Donazione Speciale</p>
                    <p className="text-sm text-blue-50">
                      Supporta progettazione e attrezzature
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/donazione?project=new-campus"
                    className="bg-blue-950 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-900 transition text-center"
                  >
                    Dona Ora
                  </Link>
                  <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-blue-600 transition">
                    Scopri Più Informazioni
                  </button>
                </div>

                {/* Statistiche Donazioni */}
                <div className="mt-12 pt-12 border-t border-white border-opacity-30">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    <div>
                      <div className="text-3xl font-bold mb-2">€145,320</div>
                      <p className="text-blue-100 text-sm">
                        Raccolto fino ad ora
                      </p>
                    </div>
                    <div>
                      <div className="text-3xl font-bold mb-2">€250,000</div>
                      <p className="text-blue-100 text-sm">Obiettivo totale</p>
                    </div>
                    <div>
                      <div className="text-3xl font-bold mb-2">58%</div>
                      <p className="text-blue-100 text-sm">Progresso</p>
                    </div>
                    <div>
                      <div className="text-3xl font-bold mb-2">847</div>
                      <p className="text-blue-100 text-sm">Donatori</p>
                    </div>
                  </div>
                  <div className="mt-8 w-full bg-white bg-opacity-20 rounded-full h-4 overflow-hidden">
                    <div
                      className="h-full bg-white transition-all duration-500"
                      style={{ width: "58%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </section>

            {/* ❓ Sezione FAQ */}
            <section>
              <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-8">
                  Domande Frequenti
                </h2>
                <div className="space-y-6">
                  <details className="border-l-4 border-blue-600 pl-6 cursor-pointer group">
                    <summary className="font-bold text-gray-800 text-lg hover:text-blue-600 transition">
                      Quando sarà completata la nuova sede?
                    </summary>
                    <p className="text-gray-600 mt-3 group-open:block">
                      Secondo i piani attuali, la nuova sede sarà completata
                      gradualmente attraverso le 4 fasi del progetto. Il
                      progresso complessivo è al{" "}
                      {projectStats?.totalProgress?.toFixed(1) || "0"}%. Puoi
                      seguire gli aggiornamenti di ogni fase sopra.
                    </p>
                  </details>

                  <details className="border-l-4 border-green-600 pl-6 cursor-pointer group">
                    <summary className="font-bold text-gray-800 text-lg hover:text-green-600 transition">
                      Come posso visitare il cantiere?
                    </summary>
                    <p className="text-gray-600 mt-3 group-open:block">
                      Organizziamo visite guidate regolarmente. Contattaci
                      attraverso il modulo di contatto per prenotare il tuo slot
                      di visita e ricevere gli aggiornamenti più recenti.
                    </p>
                  </details>

                  <details className="border-l-4 border-purple-600 pl-6 cursor-pointer group">
                    <summary className="font-bold text-gray-800 text-lg hover:text-purple-600 transition">
                      Le mie donazioni sono deducibili fiscalmente?
                    </summary>
                    <p className="text-gray-600 mt-3 group-open:block">
                      Sì, tutte le donazioni sono deducibili fiscalmente.
                      Riceverai una ricevuta completa di tutti i dettagli
                      necessari per la dichiarazione.
                    </p>
                  </details>

                  <details className="border-l-4 border-orange-600 pl-6 cursor-pointer group">
                    <summary className="font-bold text-gray-800 text-lg hover:text-orange-600 transition">
                      Quali servizi avrà la nuova sede?
                    </summary>
                    <p className="text-gray-600 mt-3 group-open:block">
                      La nuova sede includerà: sala per adorazione, aule per
                      studi biblici, cucina comunitaria, spazi per riunioni,
                      biblioteca e uffici amministrativi. Tutti gli spazi
                      saranno accessibili per persone con disabilità.
                    </p>
                  </details>
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default NewCampus;
