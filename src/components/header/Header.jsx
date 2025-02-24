const capella = new URL("../../assets/capella.jpg", import.meta.url).href;

const Header = () => {
  return (
    <section
      className="relative min-h-[60vh] bg-cover bg-center"
      style={{ backgroundImage: `url(${capella})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-15 flex flex-col items-center justify-center h-full text-white text-center py-32">
        <h1 className="text-4xl font-bold">Avventista Del Settimo Giorno Movimento Di Riforma</h1>
        <p className="text-lg mt-4">Scopri le nostre attività, studi biblici e prediche.</p>
        <a
          href="/contact"
          className="mt-6 bg-gray-400 px-6 py-3 rounded-lg hover:bg-gray-700 transition"
        >
          Richiedi uno Studio Biblico
        </a>
      </div>
    </section>
  );
};

export default Header;