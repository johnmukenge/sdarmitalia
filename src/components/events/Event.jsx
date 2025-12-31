import Milano from "../../assets/milano.jpg";
import Poppi from "../../assets/Poppi.jpg";
import Roma from "../../assets/Roma.jpg";
import Torino from "../../assets/Torino.jpg";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "../navbar/Navbar";

// Example event data, each with images and description
const events = [
  {
    id: "1",
    title: "Roma: Incontro Nazionale",
    images: [Roma],
    description:
      "L'incontro nazionale a Roma ha riunito membri da tutta Italia per un weekend di spiritualità, amicizia e crescita. L'atmosfera era calorosa e accogliente, con momenti di preghiera, musica e condivisione di esperienze di fede.",
    tags: ["Roma", "Incontro Nazionale"],
  },
  {
    id: "2",
    title: "Milano: Conferenza Giovani 2024",
    images: [Milano],
    description:
      "La conferenza giovani a Milano è stata un'esperienza dinamica e coinvolgente. I giovani hanno partecipato a workshop, attività di gruppo e momenti di riflessione, creando legami forti e un clima di entusiasmo.",
    tags: ["Milano", "Conferenza Giovani"],
  },
  {
    id: "3",
    title: "Poppi: Ritiro Spirituale",
    images: [Poppi],
    description:
      "Il ritiro spirituale a Poppi si è svolto immersi nella natura, offrendo tempo per meditazione, studio biblico e relax. L'atmosfera era serena e rigenerante, ideale per rafforzare la fede.",
    tags: ["Poppi", "Ritiro Spirituale"],
  },
  {
    id: "4",
    title: "Torino: Giornata della Famiglia",
    images: [Torino],
    description:
      "A Torino abbiamo celebrato la Giornata della Famiglia con attività per tutte le età, giochi, momenti di riflessione e convivialità. Un evento ricco di sorrisi e condivisione.",
    tags: ["Torino", "Giornata della Famiglia"],
  },
];

const Event = () => {
  // Track current slide for each event
  const [currentSlides, setCurrentSlides] = useState(events.map(() => 0));

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
      <section className="bg-gradient-to-r text-black py-12 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-4xl font-bold mb-4">
            Notizie & Eventi
          </h1>
          <p className="text-xl md:text-2xl text-black">
            Scopri gli ultimi eventi e incontri della nostra comunità
          </p>
        </div>
      </section>

      {/* Events Container */}
      <section className="container mx-auto py-16 px-4">
        <div className="space-y-12">
          {events.map((event, idx) => (
            <div
              key={event.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              {/* Alternating layout - image left on even, right on odd */}
              <div
                className={`flex flex-col ${
                  idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } items-stretch`}
              >
                {/* Image Section */}
                <div className="relative flex-shrink-0 w-full md:w-1/2 overflow-hidden bg-gray-100 h-96">
                  <img
                    src={event.images[currentSlides[idx]]}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Image Navigation */}
                  {event.images.length > 1 && (
                    <>
                      <button
                        className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200 z-10"
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
                        className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200 z-10"
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
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
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
                            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                              currentSlides[idx] === i
                                ? "bg-blue-600 w-8"
                                : "bg-white/60 hover:bg-white/80"
                            }`}
                            aria-label={`Vai all'immagine ${i + 1}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Content Section */}
                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <span className="inline-block bg-gradient-to-r bg-blue-950 px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
                        Evento
                      </span>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                      {event.title}
                    </h3>

                    <p className="text-gray-600 text-lg leading-relaxed mb-6">
                      {event.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {event.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-block bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold border border-blue-200 hover:border-blue-400 transition-colors duration-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="pt-2 border-t border-gray-200">
                    <a
                      href={`/eventi/${event.id}`}
                      className="inline-flex items-center gap-2 hover:text-blue-800 text-blue-950 font-bold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      Leggi di più
                      <ChevronRight size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl border-2 border-blue-200 p-12 text-center">
          <h3 className="text-3xl font-bold text-gray-800 mb-4">
            Vuoi partecipare al prossimo evento?
          </h3>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Resta aggiornato sugli eventi della nostra comunità e unisciti a noi
            per momenti di fede, amicizia e crescita spirituale.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 bg-blue-950 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Contattaci
            <ChevronRight size={20} />
          </a>
        </div>
      </section>
    </div>
  );
};

export default Event;
