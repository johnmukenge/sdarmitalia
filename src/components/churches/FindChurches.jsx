import { useState, useEffect } from "react";
import articleImg1 from "../../assets/sdarm-beliefs-baptism.jpg";
import articleImg2 from "../../assets/sdarm-beliefs-bible.jpg";
import articleImg3 from "../../assets/sdarm-beliefs-carpenter.jpg";
import Milano from "../../assets/milano.jpg";
import Poppi from "../../assets/Poppi.jpg";
import Roma from "../../assets/Roma.jpg";
import Torino from "../../assets/Torino.jpg";
import Trieste from "../../assets/Trieste.jpg";

const FindChurches = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [Milano, Poppi, Roma, Torino, Trieste];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000); // Slide every 3 seconds
    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    <section className="p-8 bg-gray-100 flex flex-col items-center">
      {/* Sezione superiore con due colonne */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 p-8 bg-white shadow-lg rounded-lg">
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl font-bold">Vieni a trovarci in una delle nostre chiese</h2>
          <p className="mt-4">Scopri le sedi delle nostre chiese in diverse città e vieni a trovarci.</p>
        </div>
        <div className="relative">
          <img
            src={images[currentSlide]}
            alt={`Slide ${currentSlide + 1}`}
            className="w-full h-auto rounded-lg shadow"
          />
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
          >
            &#8249;
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
          >
            &#8250;
          </button>
        </div>
      </div>
      
      {/* Sezione con la griglia delle chiese */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 p-8 bg-white shadow-lg rounded-lg">
        {/* Chiesa di Trieste */}
        <div>
            <h3 className="text-lg font-semibold">Chiesa di Trieste</h3>
            <p>Largo Nicolini 2/a - 34129, Trieste</p>
            <p>Tel: +39 XXX XXX XXXX</p>
            <p>Poste: 2339, 34144 Trieste</p>
            <p>Email: italy@sdarm.org</p>
            <iframe
              className="w-full h-40 mt-2"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2871.403287750295!2d13.770674676919287!3d45.65033467106371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477b6e88a7d3a7ff%3A0xcdf8eeb92cb682a7!2sLargo%20Nicolini%202%2Fa%2C%2034129%20Trieste%20TS%2C%20Italy!5e0!3m2!1sen!2sit!4v1647811923345!5m2!1sen!2sit"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>

        {/* Chiesa di Torino */}
        <div>
            <h3 className="text-lg font-semibold">Chiesa di Torino</h3>
            <p>Largo Nicolini 2/a - 34129, Trieste</p>
            <p>Tel: +39 XXX XXX XXXX</p>
            <p>Poste: 2339, 34144 Trieste</p>
            <p>Email: italy@sdarm.org</p>
            <iframe
              className="w-full h-40 mt-2"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2871.403287750295!2d13.770674676919287!3d45.65033467106371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477b6e88a7d3a7ff%3A0xcdf8eeb92cb682a7!2sLargo%20Nicolini%202%2Fa%2C%2034129%20Trieste%20TS%2C%20Italy!5e0!3m2!1sen!2sit!4v1647811923345!5m2!1sen!2sit"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>

        {/* Chiesa di Capolona */}
        <div>
            <h3 className="text-lg font-semibold">Chiesa di Milano</h3>
            <p>Largo Nicolini 2/a - 34129, Trieste</p>
            <p>Tel: +39 XXX XXX XXXX</p>
            <p>Poste: 2339, 34144 Trieste</p>
            <p>Email: italy@sdarm.org</p>
            <iframe
              className="w-full h-40 mt-2"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2871.403287750295!2d13.770674676919287!3d45.65033467106371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477b6e88a7d3a7ff%3A0xcdf8eeb92cb682a7!2sLargo%20Nicolini%202%2Fa%2C%2034129%20Trieste%20TS%2C%20Italy!5e0!3m2!1sen!2sit!4v1647811923345!5m2!1sen!2sit"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
        </div>

        <div>
            <h3 className="text-lg font-semibold">Chiesa di Poppi</h3>
            <p>Largo Nicolini 2/a - 34129, Trieste</p>
            <p>Tel: +39 XXX XXX XXXX</p>
            <p>Poste: 2339, 34144 Trieste</p>
            <p>Email: italy@sdarm.org</p>
            <iframe
              className="w-full h-40 mt-2"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2871.403287750295!2d13.770674676919287!3d45.65033467106371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477b6e88a7d3a7ff%3A0xcdf8eeb92cb682a7!2sLargo%20Nicolini%202%2Fa%2C%2034129%20Trieste%20TS%2C%20Italy!5e0!3m2!1sen!2sit!4v1647811923345!5m2!1sen!2sit"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Chiesa di Capolona</h3>
            <p>Largo Nicolini 2/a - 34129, Trieste</p>
            <p>Tel: +39 XXX XXX XXXX</p>
            <p>Poste: 2339, 34144 Trieste</p>
            <p>Email: italy@sdarm.org</p>
            <iframe
              className="w-full h-40 mt-2"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2871.403287750295!2d13.770674676919287!3d45.65033467106371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477b6e88a7d3a7ff%3A0xcdf8eeb92cb682a7!2sLargo%20Nicolini%202%2Fa%2C%2034129%20Trieste%20TS%2C%20Italy!5e0!3m2!1sen!2sit!4v1647811923345!5m2!1sen!2sit"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Chiesa di Roma</h3>
            <p>Largo Nicolini 2/a - 34129, Trieste</p>
            <p>Tel: +39 XXX XXX XXXX</p>
            <p>Poste: 2339, 34144 Trieste</p>
            <p>Email: italy@sdarm.org</p>
            <iframe
              className="w-full h-40 mt-2"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2871.403287750295!2d13.770674676919287!3d45.65033467106371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477b6e88a7d3a7ff%3A0xcdf8eeb92cb682a7!2sLargo%20Nicolini%202%2Fa%2C%2034129%20Trieste%20TS%2C%20Italy!5e0!3m2!1sen!2sit!4v1647811923345!5m2!1sen!2sit"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
      </div>
    </section>
  );
};

export default FindChurches;
