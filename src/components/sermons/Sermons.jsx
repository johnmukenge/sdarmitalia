import sermonsData from "../../data/sermons";
import SermonCard from "./SermonCard";

const Sermons = () => {
  return (
    <div className="container mx-auto p-8 flex flex-row gap-5">
      <section className="flex-3">
        <div>
          {sermonsData.map((categoryData, index) => (
            <div key={index} className="bg-white p-4 shadow rounded">
              <h3 className="text-xl font-bold">{categoryData.category}</h3>
              <div>
                {categoryData.sermons.map((sermon, idx) => (
                  <SermonCard
                    key={idx}
                    image={sermon.image}
                    title={sermon.title}
                    description={sermon.description}
                    link={sermon.link}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Sidebar */}
      <aside className="bg-gray-100 p-4 shadow rounded h-fit flex-1">
        <h2 className="text-2xl font-bold mb-4">Ultime Notizie</h2>
        {[...Array(3)].map((_, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-lg font-semibold">Titolo Notizia {index + 1}</h3>
            <p className="text-gray-500">Breve descrizione...</p>
            <a href="#" className="text-blue-500">Leggi di più</a>
          </div>
        ))}
      </aside>
    </div>
  );
}

export default Sermons;
