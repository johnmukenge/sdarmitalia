
const SermonCard = ({ image, title, description, link }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="text-gray-700 mb-4">{description}</p>
        <a href={link} className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" target="_blank" rel="noopener noreferrer">Guarda su YouTube</a>
      </div>
    </div>
  );
}

export default SermonCard;
