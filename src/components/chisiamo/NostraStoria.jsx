import brevestoria from "../../assets/brevestoria.jpg";
import fedeCristiana from "../../data/fedeCristiana.js";
import { useState } from "react";
import FedeFondamentale from "../../data/FedeFondamentale.pdf";

const NostraStoria = () => {
  // Dynamic state for selected belief
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center p-8">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Bloc 1: La nostra storia */}
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-bold text-center mb-8 mt-4 text-gray-800">
            La Nostra Storia
          </h1>
          <img
            src={brevestoria}
            alt="Breve Storia"
            className="rounded-lg shadow-lg w-full md:w-96 mb-6"
          />
          <div className="bg-white p-6 rounded-lg shadow-lg h-96 overflow-y-auto w-full">
            <p className="text-gray-700 text-justify leading-relaxed">
              Con l’inizio della I Guerra Mondiale, in vari stati europei (Germania, Romania, Ungheria, Olanda, Polonia, Yugoslavia, ecc.) nasce all’interno della Chiesa Avventista un movimento spontaneo di protesta contro le nuove direttive della dirigenza avventista della Divisione Europea, che dichiaravano compatibile con la fede avventista la partecipazione alla guerra. Gli aderenti di questo movimento ritenevano non compatibile con la fede cristiana e con la posizione avventista sostenuta fino a quel momento, partecipare in guerre e spargimenti di sangue. Per questa loro protesta essi vennero esclusi dalla Chiesa Avventista e subirono persecuzione a causa del rifiuto di prestare servizio militare e combattere in guerra.
              {/* ...existing storia text... */}
              <span className="block text-gray-500 text-sm mt-4 text-right">
                Autore: D. Campodonico
              </span>
            </p>
          </div>
        </div>
        {/* Bloc 2: La nostra fede */}
        <div className="flex flex-col h-[700px] bg-white rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center mt-4 mb-2 text-blue-900">{fedeCristiana.title}</h2>
          <p className="text-gray-700 text-center mb-4 px-4 text-sm">{fedeCristiana.content}</p>
          <div className="flex flex-1 min-h-0">
            {/* Sidebar: List of titles, scrollable */}
            <div className="w-56 border-r border-gray-200 p-2 overflow-y-auto" style={{maxHeight: "600px"}}>
              <ul className="space-y-1" role="listbox" aria-label="Elenco fondamenti di fede">
                {fedeCristiana.beliefs.map((belief, idx) => (
                  <li
                    key={idx}
                    className={`cursor-pointer px-2 py-2 rounded transition-colors text-sm ${selectedIndex === idx ? "bg-blue-100 text-blue-900 font-semibold" : "hover:bg-blue-50 text-gray-800"}`}
                    onClick={() => setSelectedIndex(idx)}
                    tabIndex={0}
                    onKeyDown={e => { if (e.key === "Enter" || e.key === " ") setSelectedIndex(idx); }}
                    aria-selected={selectedIndex === idx}
                    role="option"
                  >
                    {belief.title}
                  </li>
                ))}
              </ul>
            </div>
            {/* Content box for selected belief, fixed height, scrolls inside */}
            <div className="flex-1 p-6 flex flex-col justify-center min-h-0 overflow-y-auto" style={{maxHeight: "600px"}}>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {fedeCristiana.beliefs[selectedIndex].title}
              </h3>
              <p className="text-gray-700 text-justify leading-relaxed mb-4">
                {fedeCristiana.beliefs[selectedIndex].content}
              </p>
              {fedeCristiana.beliefs[selectedIndex].image && (
                <img
                  src={fedeCristiana.beliefs[selectedIndex].image}
                  alt={fedeCristiana.beliefs[selectedIndex].title}
                  className="rounded-lg shadow-lg w-full h-48 object-cover mb-4"
                />
              )}
              <p className="text-sm text-gray-500 mb-2">
                <strong>Riferimenti:</strong> {fedeCristiana.beliefs[selectedIndex].references}
              </p>
              {fedeCristiana.beliefs[selectedIndex].extraReadings && (
                <p className="text-sm text-gray-500 mt-2">
                  <strong>Letture Extra:</strong> {fedeCristiana.beliefs[selectedIndex].extraReadings}
                </p>
              )}
            </div>
          </div>
          {/* PDF Download Section */}
          <div className="flex justify-center items-center mt-4 mb-4">
            <a
              href={FedeFondamentale}
              download
              className="flex items-center space-x-4 bg-blue-950 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700"
            >
              <span>Scarica la versione PDF</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NostraStoria;
