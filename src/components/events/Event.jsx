import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Calendar, MapPin, Clock, Users } from "lucide-react";
import Navbar from "../navbar/Navbar";
import apiClient from "../../services/apiClient";

// Import conference flyers
const ConferenzaFlyer1 = new URL("../../assets/news/Conferenza Aprile 2026.jpeg", import.meta.url).href;
const ConferenzaFlyer2 = new URL("../../assets/news/Conferenza aprile 2026 2.jpeg", import.meta.url).href;

const Event = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlides, setCurrentSlides] = useState([]);

  // Carica eventi dall'API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await apiClient.getEvents();
        const eventiData = response.data?.eventi || [];
        
        // Mappa i dati del database con il formato del componente
        const mappedEvents = eventiData.map(evento => ({
          id: evento._id,
          title: evento.title,
          images: [ConferenzaFlyer1, ConferenzaFlyer2],
          description: evento.description,
          date: new Date(evento.date).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' }) + 
                (evento.endDate ? ' - ' + new Date(evento.endDate).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' }) : ''),
          time: "Venerdì ore 19:00 - Domenica ore 16:00",
          location: evento.location,
          organizer: evento.organizer,
          tags: evento.tags || [],
          highlights: [
            "Ospite: Tesoriere della GC - Pst. Guidini Wagner",
            "Workshop tematici sull'amministrazione Cristiana",
            "Momenti di musica sacra con Quartetto del Brasile e Portogallo",
            "Momenti di preghiera e comunione",
            "Programma specifico per le donne"
          ],
          status: "upcoming",
          featured: evento.featured || false
        }));
        
        setEvents(mappedEvents);
        setCurrentSlides(mappedEvents.map(() => 0));
      } catch (error) {
        console.error('Errore nel caricamento eventi:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Track current slide for each event
  useEffect(() => {
    if (events.length > 0) {
      setCurrentSlides(events.map(() => 0));
    }
  }, [events]);

  // Optional: auto-slide for each event with multiple images
  useEffect(() => {
    const intervals = events.map((event, idx) =>
      event.images.length > 1
        ? setInterval(() => {
            setCurrentSlides((prev) => {
              const updated = [...prev];
              updated[idx] = (updated[idx] + 1) % event.images.length;
              return updated;
            });
          }, 4000)
        : null
    );
    return () =>
      intervals.forEach((interval) => interval && clearInterval(interval));
  }, []);

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <Navbar />

      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Eventi e Conferenze
          </h1>
          <p className="text-xl md:text-2xl text-blue-100">
            Momenti di comunione, crescita spirituale e celebrazione della fede
          </p>
        </div>
      </section>

      {/* Events Container */}
      <section className="container mx-auto py-16 px-4">
        <div className="space-y-16">
          {events.map((event, idx) => (
            <div
              key={event.id}
              className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              {/* Featured Badge */}
              {event.featured && (
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-center py-3 px-4">
                  <span className="font-bold text-lg uppercase tracking-wider flex items-center justify-center gap-2">
                    ⭐ Evento in Evidenza
                  </span>
                </div>
              )}

              <div className="flex flex-col lg:flex-row">
                {/* Image Gallery Section */}
                <div className="relative flex-shrink-0 w-full lg:w-1/2 overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100">
                  <div className="aspect-[4/3] lg:aspect-auto lg:h-full min-h-[500px] flex items-center justify-center">
                    <img
                      src={event.images[currentSlides[idx]]}
                      alt={event.title}
                      className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>

                  {/* Image Navigation */}
                  {event.images.length > 1 && (
                    <>
                      <button
                        className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-xl transition-all duration-200 z-10 hover:scale-110"
                        onClick={() =>
                          setCurrentSlides((prev) => {
                            const updated = [...prev];
                            updated[idx] =
                              (updated[idx] - 1 + event.images.length) %
                              event.images.length;
                            return updated;
                          })
                        }
                        aria-label="Immagine precedente"
                      >
                        <ChevronLeft size={24} />
                      </button>
                      <button
                        className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-xl transition-all duration-200 z-10 hover:scale-110"
                        onClick={() =>
                          setCurrentSlides((prev) => {
                            const updated = [...prev];
                            updated[idx] =
                              (updated[idx] + 1) % event.images.length;
                            return updated;
                          })
                        }
                        aria-label="Prossima immagine"
                      >
                        <ChevronRight size={24} />
                      </button>

                      {/* Dots indicator */}
                      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                        {event.images.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => {
                              setCurrentSlides((prev) => {
                                const updated = [...prev];
                                updated[idx] = i;
                                return updated;
                              });
                            }}
                            className={`h-3 rounded-full transition-all duration-300 ${
                              currentSlides[idx] === i
                                ? "bg-white w-10 shadow-lg"
                                : "bg-white/60 hover:bg-white/80 w-3"
                            }`}
                            aria-label={`Vai all'immagine ${i + 1}`}
                          />
                        ))}
                      </div>
                    </>
                  )}

                  {/* Status Badge */}
                  {event.status === "upcoming" && (
                    <div className="absolute top-6 left-6 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg">
                      Prossimamente
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col">
                  <div className="flex-grow">
                    {/* Event Info Header */}
                    <div className="mb-6">
                      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                        {event.title}
                      </h2>
                      {event.subtitle && (
                        <p className="text-xl text-blue-600 font-semibold italic">
                          {event.subtitle}
                        </p>
                      )}
                    </div>

                    {/* Event Details Grid */}
                    <div className="grid grid-cols-1 gap-4 mb-6 bg-blue-50 rounded-xl p-6 border border-blue-100">
                      <div className="flex items-start gap-3">
                        <Calendar className="text-blue-600 flex-shrink-0 mt-1" size={24} />
                        <div>
                          <p className="font-semibold text-gray-900">Data</p>
                          <p className="text-gray-700">{event.date}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Clock className="text-blue-600 flex-shrink-0 mt-1" size={24} />
                        <div>
                          <p className="font-semibold text-gray-900">Orario</p>
                          <p className="text-gray-700">{event.time}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin className="text-blue-600 flex-shrink-0 mt-1" size={24} />
                        <div>
                          <p className="font-semibold text-gray-900">Luogo</p>
                          <p className="text-gray-700">{event.location}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Users className="text-blue-600 flex-shrink-0 mt-1" size={24} />
                        <div>
                          <p className="font-semibold text-gray-900">Organizzatore</p>
                          <p className="text-gray-700">{event.organizer}</p>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="mb-6">
                      <p className="text-gray-700 text-lg leading-relaxed mb-4">
                        {event.description}
                      </p>
                      {event.longDescription && (
                        <p className="text-gray-600 leading-relaxed">
                          {event.longDescription}
                        </p>
                      )}
                    </div>

                    {/* Highlights */}
                    {event.highlights && event.highlights.length > 0 && (
                      <div className="mb-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                          Punti Salienti
                        </h3>
                        <ul className="space-y-2">
                          {event.highlights.map((highlight, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-blue-600 font-bold mt-1">✓</span>
                              <span className="text-gray-700">{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {event.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-block bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold border border-blue-300 hover:border-blue-500 transition-all duration-200 hover:shadow-md"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                    <a
                      href="/contact"
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      Iscriviti Ora
                      <ChevronRight size={20} />
                    </a>
                    <a
                      href={`/eventi/${event.id}`}
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-blue-700 font-bold py-4 px-6 rounded-xl transition-all duration-200 border-2 border-blue-600 hover:border-blue-700"
                    >
                      Scopri di più
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl p-12 text-center text-white shadow-2xl">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Non Perdere i Prossimi Eventi!
          </h3>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Resta aggiornato sugli eventi della nostra comunità e unisciti a noi
            per momenti indimenticabili di fede, amicizia e crescita spirituale.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-blue-50 text-blue-700 font-bold py-4 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Contattaci
              <ChevronRight size={20} />
            </a>
            <a
              href="/newsletter"
              className="inline-flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl border-2 border-white/30"
            >
              Iscriviti alla Newsletter
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Event;
