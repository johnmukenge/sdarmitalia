const capella = new URL("../../assets/capella.jpg", import.meta.url).href;
const videoOfferta = new URL("../../assets/sede_campo/video-offerta-campo-italiano.mp4", import.meta.url).href;

const Header = () => {
  return (
    <section className="relative min-h-[80vh] md:min-h-[90vh] overflow-hidden">
      {/* Video di sfondo */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectFit: 'cover' }}
      >
        <source src={videoOfferta} type="video/mp4" />
        <img src={capella} alt="Background" className="w-full h-full object-cover" />
      </video>

      {/* Overlay scuro più trasparente */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Denominazione in basso a sinistra, meno grassetto e più trasparente */}
      <div className="absolute bottom-6 left-6 z-10 text-white text-left">
        <span className="block text-xl md:text-3xl font-medium md:font-normal opacity-70 tracking-wide drop-shadow">
          Avventisti Del Settimo Giorno<br />Movimento Di Riforma
        </span>
      </div>
      {/*
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center py-20 md:py-32">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/contact"
            className="bg-blue-950/90 px-8 py-3 rounded-lg hover:bg-blue-900 transition font-semibold shadow-md backdrop-blur-sm"
          >
            Richiedi uno Studio Biblico
          </a>
          <a
            href="/nuova-sede"
            className="bg-green-600/90 px-8 py-3 rounded-lg hover:bg-green-700 transition font-semibold shadow-md backdrop-blur-sm"
          >
            Nuova Sede
          </a>
        </div>
      </div>
      */}
    </section>
  );
};

export default Header;
