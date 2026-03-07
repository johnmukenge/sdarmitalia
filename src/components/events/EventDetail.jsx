import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Calendar, MapPin, Clock, Users, ArrowLeft } from "lucide-react";
import apiClient from "../../services/apiClient";

// Import conference flyers
const ConferenzaFlyer1 = new URL("../../assets/news/Conferenza Aprile 2026.jpeg", import.meta.url).href;
const ConferenzaFlyer2 = new URL("../../assets/news/Conferenza aprile 2026 2.jpeg", import.meta.url).href;


const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Carica evento dall'API
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const response = await apiClient.getEvent(id);
        const eventoData = response.data?.eventi || response.data?.evento;
        
        if (eventoData) {
          // Mappa i dati del database
          const mappedEvent = {
            id: eventoData._id,
            title: eventoData.title,
            images: [ConferenzaFlyer1, ConferenzaFlyer2],
            description: eventoData.description,
            longDescription: "La Conferenza sull'amministrazione Cristiana rappresenta un'opportunità unica per approfondire la nostra relazione con Dio attraverso una gestione responsabile delle risorse che Egli ci ha affidato. Il programma include sessioni di studio biblico, workshop pratici sull'amministrazione, momenti di lode e adorazione, e testimonianze ispiranti.",
            date: new Date(eventoData.date).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' }) + 
                  (eventoData.endDate ? ' - ' + new Date(eventoData.endDate).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' }) : ''),
            time: "Venerdì ore 19:00 - Domenica ore 16:00",
            location: eventoData.location,
            organizer: eventoData.organizer,
            tags: eventoData.tags || [],
            highlights: [
              "Ospite: Tesoriere della GC - Pst. Guidini Wagner",
              "Workshop tematici sull'amministrazione Cristiana",
              "Momenti di musica sacra con Quartetto del Brasile e Portogallo",
              "Momenti di preghiera e comunione",
              "Programma specifico per le donne"
            ],
            status: "upcoming",
            featured: eventoData.featured || false
          };
          
          setEvent(mappedEvent);
        }
      } catch (error) {
        console.error('Errore nel caricamento evento:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchEvent();
    }
  }, [id]);

  // Scorrimento automatico immagini
  useEffect(() => {
    if (!event || event.images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % event.images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [event]);

  if (loading) {
    return <div className="text-center mt-10 text-xl">Caricamento...</div>;
  }

  if (!event) {
    return <div className="text-center mt-10 text-xl">Evento non trovato.</div>;
  }

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + event.images.length) % event.images.length);
  };
  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % event.images.length);
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen py-6 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Back Button */}
        <Link
          to="/eventi"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          Torna agli eventi
        </Link>

        {/* Main Content Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Featured Badge */}
          {event.featured && (
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-center py-3 px-4">
              <span className="font-bold text-lg uppercase tracking-wider flex items-center justify-center gap-2">
                ⭐ Evento in Evidenza
              </span>
            </div>
          )}

          {/* Image Gallery */}
          <div className="relative w-full h-[600px] lg:h-[700px] bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
            <img
              src={event.images[currentSlide]}
              alt={event.title}
              className="w-full h-full object-contain p-4"
            />
            {event.images.length > 1 && (
              <>
                <button
                  className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-xl transition-all duration-200 hover:scale-110"
                  onClick={handlePrev}
                  aria-label="Precedente"
                >
                  &#8592;
                </button>
                <button
                  className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-xl transition-all duration-200 hover:scale-110"
                  onClick={handleNext}
                  aria-label="Successivo"
                >
                  &#8594;
                </button>
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                  {event.images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentSlide(i)}
                      className={`h-3 rounded-full transition-all duration-300 ${
                        currentSlide === i
                          ? "bg-white w-10 shadow-lg"
                          : "bg-white/60 hover:bg-white/80 w-3"
                      }`}
                      aria-label={`Vai all'immagine ${i + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
            {event.status === "upcoming" && (
              <div className="absolute top-6 left-6 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg">
                Prossimamente
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6 lg:p-8">
            {/* Title Section */}
            <div className="mb-6">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
                {event.title}
              </h1>
            </div>

            {/* Event Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 bg-blue-50 rounded-2xl p-6 border-2 border-blue-100">
              <div className="flex items-start gap-4">
                <Calendar className="text-blue-600 flex-shrink-0 mt-1" size={28} />
                <div>
                  <p className="font-bold text-gray-900 text-lg">Data</p>
                  <p className="text-gray-700 text-lg">{event.date}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="text-blue-600 flex-shrink-0 mt-1" size={28} />
                <div>
                  <p className="font-bold text-gray-900 text-lg">Orario</p>
                  <p className="text-gray-700 text-lg">{event.time}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="text-blue-600 flex-shrink-0 mt-1" size={28} />
                <div>
                  <p className="font-bold text-gray-900 text-lg">Luogo</p>
                  <p className="text-gray-700 text-lg">{event.location}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Users className="text-blue-600 flex-shrink-0 mt-1" size={28} />
                <div>
                  <p className="font-bold text-gray-900 text-lg">Organizzatore</p>
                  <p className="text-gray-700 text-lg">{event.organizer}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Descrizione</h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                {event.description}
              </p>
              {event.longDescription && (
                <p className="text-gray-600 text-lg leading-relaxed">
                  {event.longDescription}
                </p>
              )}
            </div>

            {/* Highlights */}
            {event.highlights && event.highlights.length > 0 && (
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  Cosa Aspettarsi
                </h2>
                <ul className="space-y-3">
                  {event.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-blue-600 font-bold text-xl mt-1">✓</span>
                      <span className="text-gray-700 text-lg">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tags */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Tag</h3>
              <div className="flex flex-wrap gap-3">
                {event.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 px-5 py-2 rounded-full text-base font-semibold border-2 border-blue-300 hover:border-blue-500 transition-all duration-200 hover:shadow-md"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA Section */}
            <div className="border-t-2 border-gray-200 pt-6">
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-6 text-white text-center">
                <h3 className="text-2xl font-bold mb-3">
                  Vuoi Partecipare?
                </h3>
                <p className="text-lg text-blue-100 mb-5">
                  Prenota subito il tuo posto per questa straordinaria conferenza!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 bg-white hover:bg-blue-50 text-blue-700 font-bold py-4 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Iscriviti Ora
                  </a>
                  <Link
                    to="/eventi"
                    className="inline-flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 border-2 border-white/30"
                  >
                    <ArrowLeft size={20} />
                    Altri Eventi
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
