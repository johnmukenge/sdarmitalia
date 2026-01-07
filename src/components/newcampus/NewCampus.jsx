import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  MapPin,
  Calendar,
  Users,
  DollarSign,
} from "lucide-react";
import { Link } from "react-router-dom";

const NewCampus = () => {
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);

  // Fasi del progetto
  const projectPhases = [
    {
      id: 1,
      title: "Fase 1: Preparazione",
      status: "Completato",
      percentage: 100,
      description:
        "Studio preliminare, acquisizione terreno e approvazioni amministrative",
      timeline: "Gennaio - Marzo 2024",
      details: [
        "Ricerca e valutazione terreno",
        "Approvazioni comunali",
        "Progettazione iniziale",
        "Raccolta fondi fase 1",
      ],
    },
    {
      id: 2,
      title: "Fase 2: Fondamenta e Struttura",
      status: "In corso",
      percentage: 65,
      description: "Scavi, fondamenta e costruzione della struttura principale",
      timeline: "Aprile 2024 - Febbraio 2025",
      details: [
        "Preparazione cantiere",
        "Scavi e fondamenta",
        "Realizzazione struttura",
        "Impianti principali",
      ],
    },
    {
      id: 3,
      title: "Fase 3: Finiture",
      status: "In pianificazione",
      percentage: 10,
      description:
        "Finiture interne ed esterne, impianti specifici e allestimento",
      timeline: "Marzo - Luglio 2025",
      details: [
        "Pareti e soffitti",
        "Impianti elettrici e idraulici",
        "Pavimenti e rivestimenti",
        "Arredamento e decorazioni",
      ],
    },
    {
      id: 4,
      title: "Fase 4: Inaugurazione",
      status: "In attesa",
      percentage: 0,
      description: "Finalizzazione, ispezioni e inaugurazione ufficiale",
      timeline: "Agosto 2025",
      details: [
        "Ispezioni finali",
        "Certificazioni",
        "Evento di inaugurazione",
        "Inizio attività",
      ],
    },
  ];

  const nextPhase = () => {
    setCurrentPhaseIndex((prev) => (prev + 1) % projectPhases.length);
  };

  const prevPhase = () => {
    setCurrentPhaseIndex(
      (prev) => (prev - 1 + projectPhases.length) % projectPhases.length
    );
  };

  const currentPhase = projectPhases[currentPhaseIndex];

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
                <span className="text-2xl font-bold text-green-600">44%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-600 to-green-600 transition-all duration-500 rounded-full"
                  style={{ width: "44%" }}
                ></div>
              </div>
            </div>

            {/* Timeline Visual */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
              {projectPhases.map((phase, index) => (
                <div
                  key={phase.id}
                  className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                    index === currentPhaseIndex
                      ? "bg-blue-100 border-blue-600 shadow-lg"
                      : "bg-gray-50 border-gray-300 hover:border-blue-300"
                  }`}
                  onClick={() => setCurrentPhaseIndex(index)}
                >
                  <div className="font-bold text-sm text-gray-700 mb-2">
                    Fase {phase.id}
                  </div>
                  <div className="text-xs text-gray-600 mb-3">
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
                    {currentPhase.description}
                  </p>
                  <div className="flex flex-wrap gap-4 mb-4">
                    <span className="inline-block bg-blue-200 text-blue-800 px-4 py-1 rounded-full text-sm font-semibold">
                      {currentPhase.status}
                    </span>
                    <span className="inline-block bg-green-200 text-green-800 px-4 py-1 rounded-full text-sm font-semibold">
                      {currentPhase.timeline}
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
            </div>
          </div>
        </section>

        {/* 🎥 Sezione Video e Immagini */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 md:p-12">
              {/* Video */}
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Tour del Cantiere
                </h3>
                <div className="relative w-full aspect-video bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                    title="Tour Cantiere Nuova Sede"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <p className="text-gray-600 mt-4 text-sm">
                  Guarda il video di aggiornamento dal nostro cantiere per
                  vedere i progressi della nuova sede.
                </p>
              </div>

              {/* Immagini Galleria */}
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Galleria Cantiere
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {/* Placeholder immagini */}
                  {[1, 2, 3, 4].map((item) => (
                    <div
                      key={item}
                      className="aspect-square bg-gradient-to-br from-blue-400 to-green-400 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                    >
                      <span>Immagine {item}</span>
                    </div>
                  ))}
                </div>
                <p className="text-gray-600 mt-4 text-sm">
                  Scorri la galleria per vedere gli ultimi aggiornamenti dal
                  cantiere.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 📋 Sezione Dettagli Progetto */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <MapPin className="text-blue-600 mb-4" size={40} />
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Ubicazione
              </h3>
              <p className="text-gray-600 mb-4">
                La nuova sede si troverà in una posizione strategica, facilmente
                raggiungibile dalla comunità.
              </p>
              <p className="text-sm text-gray-500">
                📍 Casentino - Toscana, Italia
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <Users className="text-green-600 mb-4" size={40} />
              <h3 className="text-xl font-bold text-gray-800 mb-3">Comunità</h3>
              <p className="text-gray-600 mb-4">
                Un luogo accogliente dove la comunità può riunirsi, adorare e
                crescere spiritualmente insieme.
              </p>
              <p className="text-sm text-gray-500">👥 Spazi per 150+ persone</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <Calendar className="text-purple-600 mb-4" size={40} />
              <h3 className="text-xl font-bold text-gray-800 mb-3">Timeline</h3>
              <p className="text-gray-600 mb-4">
                Inaugurazione prevista per l agosto 2025. Siamo in linea con i
                nostri piani.
              </p>
              <p className="text-sm text-gray-500">⏰ Mancano ~ 7 mesi</p>
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
                La vostra generosità è essenziale per realizzare questa visione.
                Ogni contributo, grande o piccolo, fa una differenza nel nostro
                cammino di fede.
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
                <p className="text-blue-100 mb-4">Contributo Significativo</p>
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
                  <p className="text-blue-100 text-sm">Raccolto fino ad ora</p>
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
                  Secondo i piani attuali, inaugureremo la nuova sede nell
                  agosto 2025. Siamo attualmente al 44% della realizzazione
                  complessiva del progetto.
                </p>
              </details>

              <details className="border-l-4 border-green-600 pl-6 cursor-pointer group">
                <summary className="font-bold text-gray-800 text-lg hover:text-green-600 transition">
                  Come posso visitare il cantiere?
                </summary>
                <p className="text-gray-600 mt-3 group-open:block">
                  Organizziamo visite guidate ogni primo sabato del mese.
                  Contattaci per prenotare il tuo slot di visita.
                </p>
              </details>

              <details className="border-l-4 border-purple-600 pl-6 cursor-pointer group">
                <summary className="font-bold text-gray-800 text-lg hover:text-purple-600 transition">
                  Le mie donazioni sono deducibili fiscalmente?
                </summary>
                <p className="text-gray-600 mt-3 group-open:block">
                  Sì, tutte le donazioni sono deducibili fiscalmente. Riceverai
                  una ricevuta completa di tutti i dettagli necessari per la
                  dichiarazione.
                </p>
              </details>

              <details className="border-l-4 border-orange-600 pl-6 cursor-pointer group">
                <summary className="font-bold text-gray-800 text-lg hover:text-orange-600 transition">
                  Quali servizi avrà la nuova sede?
                </summary>
                <p className="text-gray-600 mt-3 group-open:block">
                  La nuova sede includerà: sala per adorazione, aule per studi
                  biblici, cucina comunitaria, spazi per riunioni, biblioteca e
                  uffici amministrativi.
                </p>
              </details>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default NewCampus;
