import notizie from '../../data/notizie';
import { useParams } from 'react-router-dom';

const NewsDetails = () => {
    const { id } = useParams();
    const notizia = notizie.find((item) => item.id === parseInt(id));

    if (!notizia) {
        return <p className="text-center text-red-500">Notizia non trovata</p>;
    }
  return (
    <div className='container mx-auto p-8'>
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">{notizia.title}</h1>
        <p className="text-gray-500">{notizia.sottoTitolo}</p>
      </header>
      <div className='bg-white shadow-lg rounded-lg overflow-hidden'>
        <img src={notizia.image} alt={notizia.title} className="w-full h-96 object-cover" />
        <div className='p-8'>
            <p className="text-gray-700 mb-4">{notizia.content}</p>
            <p className="text-sm text-gray-500">Autore: {notizia.autore}</p>
            <p className="text-sm text-gray-500">Pubblicato il: {new Date(notizia.publishedAt).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default NewsDetails
