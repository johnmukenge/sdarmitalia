import { useState, useRef } from "react";
import { extractLessonsFromPDF } from "../../utils/parsePDF"; // Funzione per leggere PDF
import { leggiTesto } from "../../utils/speech"; // Funzione per la lettura vocale
import { BsFillVolumeUpFill, BsFillVolumeMuteFill, BsMoonStarsFill, BsSunFill, BsUpload } from "react-icons/bs";

const SabbathSchool = () => {
  const [lezioni, setLezioni] = useState([]); // Dati delle lezioni dal PDF
  const [selectedWeek, setSelectedWeek] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const lessonRef = useRef(null);

  // Carica il file PDF e lo converte in JSON
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const data = await extractLessonsFromPDF(file);
      setLezioni(data);
    }
  };

  const handleSelectWeek = (index) => {
    setSelectedWeek(index);
    setTimeout(() => {
      lessonRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <section className={`p-8 transition-all duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"}`}>
      <div className="py-8">
        
        {/* Toggle Dark Mode */}
        <button 
          onClick={() => setDarkMode(!darkMode)} 
          className="mb-4 px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg flex items-center gap-2"
        >
          {darkMode ? <BsSunFill className="text-yellow-400" /> : <BsMoonStarsFill className="text-blue-500" />}
          {darkMode ? "Modalità Chiara" : "Modalità Scura"}
        </button>

        <h2 className="text-2xl font-bold mb-4">Studio delle Lezioni della Scuola Sabbatica</h2>

        {/* Caricamento file PDF */}
        <label className="cursor-pointer flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all">
          <BsUpload className="text-lg" />
          Carica Lezioni
          <input type="file" accept=".pdf" className="hidden" onChange={handleFileUpload} />
        </label>

        {/* Se lezioni non caricate, mostra messaggio */}
        {lezioni.length === 0 ? (
          <p className="mt-4 text-gray-500">Carica un file PDF per visualizzare le lezioni.</p>
        ) : (
          <div className="flex flex-col md:flex-row gap-6 mt-6">
            {/* Sidebar con le settimane */}
            <div className="md:w-1/4">
              <h3 className="text-xl font-bold mb-2">Lezioni Settimanali</h3>
              <ul>
                {lezioni.map((lesson, index) => (
                  <li
                    key={index}
                    className={`cursor-pointer p-2 rounded transition-all duration-300 ${
                      selectedWeek === index ? "bg-blue-500 text-white" : "bg-white dark:bg-gray-700"
                    } hover:bg-blue-300`}
                    onClick={() => handleSelectWeek(index)}
                  >
                    {lesson.title}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contenuto della Lezione */}
            <div className="md:w-3/4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-all duration-300" ref={lessonRef}>
              <h3 className="text-xl font-bold mb-2">{lezioni[selectedWeek].title}</h3>
              <ul className="list-disc pl-4">
                {lezioni[selectedWeek].days.map((day, index) => (
                  <li key={index} className="mb-2">
                    {day}
                  </li>
                ))}
              </ul>

              {/* Pulsante per la lettura vocale */}
              <button
                className="mt-4 bg-blue-500 dark:bg-yellow-500 text-white dark:text-black px-4 py-2 rounded-md flex items-center gap-2 transition-all"
                onClick={() => leggiTesto(lezioni[selectedWeek].days.join(". "), setIsSpeaking)}
              >
                {isSpeaking ? <BsFillVolumeMuteFill className="text-xl" /> : <BsFillVolumeUpFill className="text-xl" />}
                {isSpeaking ? "Ferma Lettura" : "Ascolta la Lezione"}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SabbathSchool;
