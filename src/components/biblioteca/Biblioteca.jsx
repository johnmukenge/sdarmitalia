import { useState } from "react";
import articoli from "../../data/articoli";
import libri from "../../data/libri";
import "../../styles/biblioteca.css";

const categorieSidebar = [
  {
    label: "Scuola del sabato",
    key: "sds",
    sub: ["Lezionari"],
  },
  {
    label: "Articoli",
    key: "articoli",
    sub: ["Messaggero della Riforma"],
  },
  {
    label: "Libri",
    key: "libri",
    sub: ["Devozionali", "Innario"],
  },
  {
    label: "Riviste",
    key: "riviste",
    sub: ["Settimana di preghiera", "Sett. Pregh. Speciale 2025"],
  },
];


// Lezionari e riviste mock (in produzione, leggere dinamicamente)
const lezionari = [
  {
    nome: "Lezionario 1/2026",
    file: "/src/documents/Lezionario-1-2026.pdf",
    anno: 2026,
    cover: "/src/assets/sabbathLesson12026.png",
  },
  {
    nome: "Lezionario 2/2026",
    file: "/src/documents/Lezionario-2-2026.pdf",
    anno: 2026,
    cover: "/src/assets/sabbathLesson22026.png",
  },
  {
    nome: "Lezionario 3/2025",
    file: "/src/documents/Lezionario-3-2025.pdf",
    anno: 2025,
    cover: "/src/assets/sabbathLesson32025.jpg",
  },
  {
    nome: "Lezionario 1/2025",
    file: "/src/documents/Lezionario1-2025.pdf",
    anno: 2025,
    cover: "/src/assets/sabbathLesson12025.jpg",
  },
  {
    nome: "Lezionario 2/2025",
    file: "/src/documents/Lezionario2-2025.pdf",
    anno: 2025,
    cover: "/src/assets/sabbathLesson22025.jpg",
  },
  {
    nome: "Lezionario 4/2024",
    file: "/src/documents/Lezionario2024_4_it.pdf",
    anno: 2024,
    cover: "/src/assets/sabbathLesson42024.png",
  },
];
const riviste = [
  { nome: "Sett. Pregh. Speciale 2025", file: "/src/documents/Sett. Pregh. Speciale 2025.pdf", anno: 2025 },
];

const getYearsFor = (type) => {
  if (type === "lezionari") return Array.from(new Set(lezionari.map(l => l.anno))).sort((a, b) => b - a);
  if (type === "riviste") return Array.from(new Set(riviste.map(r => r.anno))).sort((a, b) => b - a);
  if (type === "articoli") return Array.from(new Set(articoli.map(a => a.year))).sort((a, b) => b - a);
  if (type === "libri") return Array.from(new Set(libri.map(l => l.anno))).sort((a, b) => b - a);
  return [];
};

const Pubblicazioni = () => {

  const [selectedSection, setSelectedSection] = useState("articoli");
  const [selectedSub, setSelectedSub] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  // Filtering logic per sottomenù
  let anni = [];
  let filtered = [];
  if (selectedSection === "sds" && selectedSub === "Lezionari") {
    anni = getYearsFor("lezionari");
    filtered = lezionari.filter(l => (selectedYear ? l.anno === Number(selectedYear) : true));
  } else if (selectedSection === "articoli") {
    anni = getYearsFor("articoli");
    filtered = articoli.filter(a => (selectedYear ? a.year === Number(selectedYear) : true));
  } else if (selectedSection === "libri") {
    anni = getYearsFor("libri");
    filtered = libri.filter(l => (selectedYear ? l.anno === Number(selectedYear) : true));
  } else if (selectedSection === "riviste") {
    anni = getYearsFor("riviste");
    filtered = riviste.filter(r => (selectedYear ? r.anno === Number(selectedYear) : true));
  }

  // Sidebar click handler
  const handleSidebarClick = (section, sub) => {
    setSelectedSection(section);
    setSelectedSub(sub || "");
  };

  // Download handler for document click
  const handleDownload = (url, title) => {
    if (!url) return;
    const link = document.createElement("a");
    link.href = url;
    link.download = title ? `${title}.pdf` : "documento.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-7xl flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-white rounded-xl shadow-lg p-6 mb-8 md:mb-0">
          <h2 className="text-2xl font-bold mb-6 text-blue-900">Pubblicazioni</h2>
          <nav>
            {categorieSidebar.map((cat) => (
              <div key={cat.key} className="mb-4">
                <button
                  className={`w-full text-left font-semibold py-2 px-3 rounded-lg transition ${selectedSection === cat.key ? "bg-blue-100 text-blue-900" : "hover:bg-gray-100 text-gray-700"}`}
                  onClick={() => handleSidebarClick(cat.key, "")}
                >
                  {cat.label}
                </button>
                <div className="ml-4 mt-1">
                  {cat.sub.map((sub) => (
                    <button
                      key={sub}
                      className={`block w-full text-left py-1 px-3 rounded transition text-sm ${selectedSection === cat.key && selectedSub === sub ? "bg-blue-200 text-blue-900" : "hover:bg-gray-50 text-gray-600"}`}
                      onClick={() => handleSidebarClick(cat.key, sub)}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </nav>
          {/* Filtro anno solo se ci sono anni disponibili 
          {anni.length > 0 && (
            <div className="mt-8">
              <label className="block text-sm font-bold text-gray-700 mb-2">Anno</label>
              <select
                className="w-full px-3 py-2 border rounded-lg"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                <option value="">Tutti gli anni</option>
                {anni.map((anno) => (
                  <option key={anno} value={anno}>{anno}</option>
                ))}
              </select>
            </div>
          )}*/}
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">Pubblicazioni</h1>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-green-600 mx-auto rounded-full mb-4"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Esplora libri, articoli e materiali della chiesa organizzati per anno e categoria. Clicca per scaricare i documenti.
            </p>
          </div>

          {/* Content by section/sottomenù */}
          {/* Lezionari */}
          {selectedSection === "sds" && selectedSub === "Lezionari" && (
            <section>
              <h2 className="text-2xl font-bold mb-4 text-purple-800">Lezionari</h2>
              {filtered.length === 0 ? (
                <div className="text-gray-500">Nessun lezionario disponibile per l'anno selezionato.</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filtered.map((lez) => (
                    <div
                      key={lez.nome}
                      className="bg-white rounded-xl shadow-md p-5 flex flex-col cursor-pointer hover:shadow-xl transition border border-transparent hover:border-purple-300"
                      onClick={() => handleDownload(lez.file, lez.nome)}
                    >
                      <div className="flex-1 flex flex-col items-center">
                        <img
                          src={lez.cover}
                          alt={lez.nome}
                          className="w-32 h-44 object-cover rounded mb-3 shadow"
                          loading="lazy"
                        />
                        <h3 className="text-lg font-bold text-purple-900 mb-1 line-clamp-2 text-center">{lez.nome}</h3>
                        <p className="text-xs text-gray-500 mb-2">Anno: {lez.anno}</p>
                      </div>
                      <div className="mt-2 text-right">
                        <span className="inline-block bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full">PDF</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* Articoli */}
          {selectedSection === "articoli" && (
            <section>
              <h2 className="text-2xl font-bold mb-4 text-blue-800">Articoli</h2>
              {filtered.length === 0 ? (
                <div className="text-gray-500">Nessun articolo disponibile per l'anno selezionato.</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filtered.map((art) => (
                    <div
                      key={art._id}
                      className="bg-white rounded-xl shadow-md p-5 flex flex-col cursor-pointer hover:shadow-xl transition border border-transparent hover:border-blue-300"
                      onClick={() => handleDownload(art.pdfUrl, art.title)}
                    >
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-blue-900 mb-1 line-clamp-2">{art.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">di {art.author}</p>
                        <p className="text-xs text-gray-500 mb-2">Anno: {art.year}</p>
                        <p className="text-sm text-gray-700 line-clamp-3 mb-2">{art.excerpt}</p>
                      </div>
                      <div className="mt-2 text-right">
                        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">PDF</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* Libri */}
          {selectedSection === "libri" && (
            <section>
              <h2 className="text-2xl font-bold mb-4 text-green-800">Libri</h2>
              {filtered.length === 0 ? (
                <div className="text-gray-500">Nessun libro disponibile per l'anno selezionato.</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filtered.map((libro) => (
                    <div
                      key={libro._id}
                      className="bg-white rounded-xl shadow-md p-5 flex flex-col cursor-pointer hover:shadow-xl transition border border-transparent hover:border-green-300"
                      onClick={() => handleDownload(libro.pdfUrl, libro.titolo)}
                    >
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-green-900 mb-1 line-clamp-2">{libro.titolo}</h3>
                        <p className="text-sm text-gray-600 mb-2">di {libro.autore}</p>
                        <p className="text-xs text-gray-500 mb-2">Anno: {libro.anno}</p>
                        <p className="text-sm text-gray-700 line-clamp-3 mb-2">{libro.descrizione}</p>
                      </div>
                      <div className="mt-2 text-right">
                        <span className="inline-block bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full">PDF</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* Riviste */}
          {selectedSection === "riviste" && (
            <section>
              <h2 className="text-2xl font-bold mb-4 text-pink-800">Riviste</h2>
              {filtered.length === 0 ? (
                <div className="text-gray-500">Nessuna rivista disponibile per l'anno selezionato.</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filtered.map((riv) => (
                    <div
                      key={riv.nome}
                      className="bg-white rounded-xl shadow-md p-5 flex flex-col cursor-pointer hover:shadow-xl transition border border-transparent hover:border-pink-300"
                      onClick={() => handleDownload(riv.file, riv.nome)}
                    >
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-pink-900 mb-1 line-clamp-2">{riv.nome}</h3>
                        <p className="text-xs text-gray-500 mb-2">Anno: {riv.anno}</p>
                      </div>
                      <div className="mt-2 text-right">
                        <span className="inline-block bg-pink-100 text-pink-800 text-xs px-3 py-1 rounded-full">PDF</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* Placeholder per sottomenù vuoti */}
          {((selectedSection === "sds" && selectedSub !== "Lezionari") ||
            (selectedSection === "articoli" && selectedSub !== "Messaggero della Riforma") ||
            (selectedSection === "libri" && !["Devozionali", "Innario"].includes(selectedSub)) ||
            (selectedSection === "riviste" && !["Settimana di preghiera", "Sett. Pregh. Speciale 2025"].includes(selectedSub))) && (
            <div className="text-gray-500 text-center py-12">Non ci sono ancora libri, articoli o riviste in questa sezione.</div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Pubblicazioni;
