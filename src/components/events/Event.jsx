
const Event = () => {
  return (
    <section className="p-8 h-50 bg-white">
      <div className='py-8'>
        <h2 className="text-3xl font-bold text-center mb-8">Prossimi Eventi</h2>
        
        {/* Griglia Eventi */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden p-4">
              <h3 className="text-xl font-bold">Evento {index + 1}</h3>
              <p className="text-gray-600 mt-2">Data: 12 Marzo 2025</p>
              <p className="text-gray-500">Luogo: Chiesa Avventista Roma</p>
              <p className="text-gray-700 mt-2">Descrizione breve dell'evento...</p>
              <a href="#" className="text-blue-500 mt-2 inline-block">Scopri di più</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Event;
