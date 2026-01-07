const capella = new URL("../../assets/capella.jpg", import.meta.url).href;

const Header = () => {
  return (
    <section className="relative min-h-[60vh] overflow-hidden">
      {/* Video di sfondo */}
      <video
        autoPlay
        muted
        loop
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source
          src="https://www.w3schools.com/html/mov_bbb.mp4"
          type="video/mp4"
        />
        <img
          src={capella}
          alt="Background"
          className="w-full h-full object-cover"
        />
      </video>

      {/* Overlay scuro */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Contenuto */}
      <div className="relative z-15 flex flex-col items-center justify-center h-full text-white text-center py-32">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-2">
          Avventisti Del Settimo Giorno
        </h1>
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">
          Movimento Di Riforma
        </h1>
        {/*<p className="text-lg mt-4">Scopri le nostre attività, studi biblici e prediche.</p> */}
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="/contact"
            className="bg-blue-950 px-8 py-3 rounded-lg hover:bg-blue-900 transition font-semibold"
          >
            Richiedi uno Studio Biblico
          </a>
          <a
            href="/nuova-sede"
            className="bg-green-600 px-8 py-3 rounded-lg hover:bg-green-700 transition font-semibold"
          >
            Nuova Sede
          </a>
        </div>
      </div>
    </section>
  );
};

export default Header;
