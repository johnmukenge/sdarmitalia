import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Milano from "../../assets/milano.jpg";
import Poppi from "../../assets/Poppi.jpg";
import Roma from "../../assets/Roma.jpg";
import Torino from "../../assets/Torino.jpg";

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


const EventDetail = () => {
  const { id } = useParams();
  const event = events.find((e) => e.id === id);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Scorrimento automatico immagini
  useEffect(() => {
    if (!event || event.images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % event.images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [event]);

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
    <section className="flex flex-col items-center mt-8 mb-8">
      <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl shadow-lg p-6 w-full max-w-3xl">
        {/* Carousel/Slider */}
        <div className="relative w-full mb-6">
          <img
            src={event.images[currentSlide]}
            alt={event.title}
            className="rounded-xl shadow-xl w-full h-80 object-cover"
          />
          {event.images.length > 1 && (
            <>
              <button
                className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 shadow hover:bg-opacity-100"
                onClick={handlePrev}
                aria-label="Precedente"
              >
                &#8592;
              </button>
              <button
                className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 shadow hover:bg-opacity-100"
                onClick={handleNext}
                aria-label="Successivo"
              >
                &#8594;
              </button>
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {event.images.map((_, i) => (
                  <span
                    key={i}
                    className={`w-3 h-3 rounded-full ${currentSlide === i ? "bg-purple-600" : "bg-gray-300"}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
        {/* ...resto dei dettagli evento... */}
        <h2 className="text-3xl font-bold text-purple-700 mb-4 text-center">{event.title}</h2>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed font-medium text-center">{event.description}</p>
        <div className="flex flex-wrap gap-2 justify-center mb-4">
          {event.tags.map((tag) => (
            <span
              key={tag}
              className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold shadow"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="text-center mt-4">
          <Link to="/eventi" className="text-purple-600 underline font-semibold">
            Torna agli eventi
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EventDetail;
