import Milano from "../../assets/milano.jpg";
import Poppi from "../../assets/poppi.jpg";
import Roma from "../../assets/roma.jpg";
import Torino from "../../assets/torino.jpg";
import { useState, useEffect } from "react";

// Example event data, each with images and description
const events = [
  {
    title: "Roma: Incontro Nazionale",
    images: [Roma],
    description:
      "L'incontro nazionale a Roma ha riunito membri da tutta Italia per un weekend di spiritualità, amicizia e crescita. L'atmosfera era calorosa e accogliente, con momenti di preghiera, musica e condivisione di esperienze di fede.",
    tags: ["Roma", "Incontro Nazionale"],
  },
  {
    title: "Milano: Conferenza Giovani 2024",
    images: [Milano],
    description:
      "La conferenza giovani a Milano è stata un'esperienza dinamica e coinvolgente. I giovani hanno partecipato a workshop, attività di gruppo e momenti di riflessione, creando legami forti e un clima di entusiasmo.",
    tags: ["Milano", "Conferenza Giovani"],
  },
  {
    title: "Poppi: Ritiro Spirituale",
    images: [Poppi],
    description:
      "Il ritiro spirituale a Poppi si è svolto immersi nella natura, offrendo tempo per meditazione, studio biblico e relax. L'atmosfera era serena e rigenerante, ideale per rafforzare la fede.",
    tags: ["Poppi", "Ritiro Spirituale"],
  },
  {
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
    return () => intervals.forEach((interval) => interval && clearInterval(interval));
  }, []);

  return (
    <section className="space-y-12 mt-4 mb-6">
      <h2 className=" font-bold text-3xl mb-8 text-center drop-shadow">
        Notizie & Eventi Recenti
      </h2>
      {events.map((event, idx) => (
        <div
          key={event.title}
          className="flex flex-col md:flex-row items-center bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl shadow-lg p-4"
        >
          {/* Left: Carousel or single image */}
          <div className="relative flex-shrink-0 mb-6 md:mb-0 md:mr-8 w-full md:w-96">
            <img
              src={event.images[currentSlides[idx]]}
              alt={event.title}
              className="rounded-xl shadow-xl w-full h-72 object-cover"
            />
            {event.images.length > 1 && (
              <>
                <button
                  className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 shadow hover:bg-opacity-100"
                  onClick={() =>
                    setCurrentSlides((prev) => {
                      const updated = [...prev];
                      updated[idx] =
                        (updated[idx] - 1 + event.images.length) % event.images.length;
                      return updated;
                    })
                  }
                  aria-label="Previous"
                >
                  &#8592;
                </button>
                <button
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 shadow hover:bg-opacity-100"
                  onClick={() =>
                    setCurrentSlides((prev) => {
                      const updated = [...prev];
                      updated[idx] = (updated[idx] + 1) % event.images.length;
                      return updated;
                    })
                  }
                  aria-label="Next"
                >
                  &#8594;
                </button>
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {event.images.map((_, i) => (
                    <span
                      key={i}
                      className={`w-3 h-3 rounded-full ${
                        currentSlides[idx] === i ? "bg-purple-600" : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
          {/* Right: Description */}
          <div className="bg-white bg-opacity-90 p-8 rounded-xl shadow-xl max-w-2xl flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-purple-700 mb-2">{event.title}</h3>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed font-medium">
              {event.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-2">
              {event.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold shadow"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
      <div className="mt-6 text-center">
        <span className="text-base text-gray-500">
          Vuoi partecipare al prossimo evento?{" "}
          <a href="/contact" className="text-purple-600 underline font-semibold">
            Contattaci!
          </a>
        </span>
      </div>
    </section>
  );
};

export default Event;
