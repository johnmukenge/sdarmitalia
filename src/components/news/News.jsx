import Navbar from "../navbar/Navbar"

const News = () => {
  return (
    <div>
      <Navbar />
      <section className="container mx-auto p-8 grid grid-cols-3 gap-8">
        {/* Colonne principali */}
        <div className="col-span-2 grid grid-cols-2 gap-6">
          {[...Array(9)].map((_, index) => (
            <div key={index} className="bg-white p-4 shadow rounded">
              <h2 className="text-xl font-bold">Titolo Notizia {index + 1}</h2>
              <p className="text-gray-600 mt-2">Breve descrizione della notizia...</p>
              <a href="#" className="text-blue-500 mt-2 inline-block">Leggi di più</a>
            </div>
          ))}
        </div>
        
        {/* Sidebar */}
        <aside className="bg-gray-100 p-4 shadow rounded h-fit">
          <h2 className="text-2xl font-bold mb-4">Ultime Notizie</h2>
          {[...Array(3)].map((_, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-lg font-semibold">Titolo Notizia {index + 10}</h3>
              <p className="text-gray-500">Breve descrizione...</p>
              <a href="#" className="text-blue-500">Leggi di più</a>
            </div>
          ))}
        </aside>
      </section>
    </div>
  );
}

export default News;
