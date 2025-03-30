import { useState, useRef } from "react";
import { extractLessonsFromPDF } from "../../utils/parsePDF"; // Funzione per leggere PDF
import { leggiTesto } from "../../utils/speech"; // Funzione per la lettura vocale
import { BsFillVolumeUpFill, BsFillVolumeMuteFill, BsMoonStarsFill, BsSunFill, BsUpload } from "react-icons/bs";

const SabbathSchool = () => {
  const [lezioni, setLezioni] = useState({
    2023: [
      { title: "Lezione 1", days: ["Giorno 1", "Giorno 2", "Giorno 3"] },
      { title: "Lezione 2", days: ["Giorno 4", "Giorno 5", "Giorno 6"] },
      { title: "Lezione 3", days: ["Giorno 7", "Giorno 8", "Giorno 9"] },
      { title: "Lezione 4", days: ["Giorno 10", "Giorno 11", "Giorno 12"] },
    ],
    2022: [
      { title: "Lezione 1", days: ["Giorno 1", "Giorno 2", "Giorno 3"] },
      { title: "Lezione 2", days: ["Giorno 4", "Giorno 5", "Giorno 6"] },
      { title: "Lezione 3", days: ["Giorno 7", "Giorno 8", "Giorno 9"] },
      { title: "Lezione 4", days: ["Giorno 10", "Giorno 11", "Giorno 12"] },
    ],
  }); // Dati delle lezioni dal PDF
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedQuarter, setSelectedQuarter] = useState(null);
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

  const handleSelectYear = (year) => {
    setSelectedYear(year);
    setSelectedQuarter(null);
  };

  const handleSelectQuarter = (quarter) => {
    setSelectedQuarter(quarter);
    setTimeout(() => {
      lessonRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  const handleDownloadQuarter = (quarter) => {
    // Implementa la logica per scaricare il lezionario
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

        <h2 className="text-2xl font-bold mb-4">Studio delle Lezioni della Scuola del Sabato</h2>

        {/* Caricamento file PDF */}
        <label className="cursor-pointer flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all">
          <BsUpload className="text-lg" />
          Carica Lezioni
          <input type="file" accept=".pdf" className="hidden" onChange={handleFileUpload} />
        </label>

        {/* Se lezioni non caricate, mostra messaggio */}
        {/* {lezioni.length === 0 ? (
          <p className="mt-4 text-gray-500">Carica un file PDF per visualizzare le lezioni.</p>
        ) : ( */}
          <div className="flex flex-col md:flex-row gap-6 mt-6">
            {/* Sidebar con gli anni */}
            <div className="md:w-1/4">
              <h3 className="text-xl font-bold mb-2">Anni</h3>
              <ul>
                {Object.keys(lezioni).map((year) => (
                  <li
                    key={year}
                    className={`cursor-pointer p-2 rounded transition-all duration-300 ${
                      selectedYear === year ? "bg-blue-500 text-white" : "bg-white dark:bg-gray-700"
                    } hover:bg-blue-300`}
                    onClick={() => handleSelectYear(year)}
                  >
                    {year}
                  </li>
                ))}
              </ul>
            </div>

            {/* Sidebar con i trimestri */}
            {selectedYear && (
              <div className="md:w-1/4">
                <h3 className="text-xl font-bold mb-2">Trimestri</h3>
                <ul>
                  {lezioni[selectedYear].map((quarter, index) => (
                    <li
                      key={index}
                      className={`cursor-pointer p-2 rounded transition-all duration-300 ${
                        selectedQuarter === index ? "bg-blue-500 text-white" : "bg-white dark:bg-gray-700"
                      } hover:bg-blue-300`}
                      onClick={() => handleSelectQuarter(index)}
                    >
                      {`Trimestre ${index + 1}`}
                      <button
                        className="ml-2 bg-green-500 text-white px-2 py-1 rounded"
                        onClick={() => handleDownloadQuarter(quarter)}
                      >
                        Scarica
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Contenuto della Lezione */}
            {selectedQuarter !== null && (
              <div className="md:w-3/4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-all duration-300" ref={lessonRef}>
                <h3 className="text-xl font-bold mb-2">{lezioni[selectedYear][selectedQuarter].title}</h3>
                <ul className="list-disc pl-4">
                  {lezioni[selectedYear][selectedQuarter].days.map((day, index) => (
                    <li key={index} className="mb-2">
                      {day}
                    </li>
                  ))}
                </ul>

                {/* Pulsante per la lettura vocale */}
                <button
                  className="mt-4 bg-blue-500 dark:bg-yellow-500 text-white dark:text-black px-4 py-2 rounded-md flex items-center gap-2 transition-all"
                  onClick={() => leggiTesto(lezioni[selectedYear][selectedQuarter].days.join(". "), setIsSpeaking)}
                >
                  {isSpeaking ? <BsFillVolumeMuteFill className="text-xl" /> : <BsFillVolumeUpFill className="text-xl" />}
                  {isSpeaking ? "Ferma Lettura" : "Ascolta la Lezione"}
                </button>
              </div>
            )}
          </div>
        {/* )} */}
      </div>
    </section>
  );
};

export default SabbathSchool;
