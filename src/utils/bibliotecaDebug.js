/**
 * Utility per Testing e Debug della Biblioteca Digitale
 *
 * Funzioni di support per:
 * - Testing dei dati
 * - Debugging del TTS
 * - Validazione dei filtri
 * - Performance monitoring
 */

// ============================================
// 1. TESTING DATI
// ============================================

export const testLibriData = () => {
  const libri = require("../data/libri").default;

  console.group("📚 TEST DATI LIBRERIA");

  // Test 1: Validazione struttura dati
  console.log("✅ Numero libri:", libri.length);

  // Test 2: Categorie uniche
  const categorie = [...new Set(libri.map((l) => l.categoria))];
  console.log("✅ Categorie:", categorie);

  // Test 3: Anni pubblication
  const anni = [...new Set(libri.map((l) => l.anno))].sort((a, b) => b - a);
  console.log("✅ Anni:", anni);

  // Test 4: Libri per bambini
  const perBambini = libri.filter((l) => l.perBambini).length;
  console.log(`✅ Libri per bambini: ${perBambini}/${libri.length}`);

  // Test 5: Validazione campi obbligatori
  const requiredFields = [
    "_id",
    "titolo",
    "autore",
    "categoria",
    "anno",
    "descrizione",
    "immagine",
    "perBambini",
    "numeroCapitoli",
    "pagine",
    "lingua",
    "pdfUrl",
    "epubUrl",
    "contenuto",
  ];

  let missingFields = 0;
  libri.forEach((libro, idx) => {
    requiredFields.forEach((field) => {
      if (!libro[field]) {
        console.warn(`⚠️ Libro ${idx}: campo "${field}" mancante`);
        missingFields++;
      }
    });
  });

  if (missingFields === 0) {
    console.log("✅ Tutti i campi obbligatori sono presenti");
  }

  console.groupEnd();
  return { success: true, totalBooks: libri.length };
};

// ============================================
// 2. TESTING TEXT-TO-SPEECH
// ============================================

export const testTTS = () => {
  console.group("🔊 TEST TEXT-TO-SPEECH");

  if (!("speechSynthesis" in window)) {
    console.error("❌ Web Speech API non supportata");
    return { success: false, error: "TTS not supported" };
  }

  const voices = window.speechSynthesis.getVoices();
  console.log(`✅ Voci disponibili: ${voices.length}`);

  const italianVoice = voices.find((v) => v.lang.includes("it"));
  console.log(
    `${italianVoice ? "✅" : "⚠️"} Voce italiana disponibile: ${
      italianVoice ? italianVoice.name : "NO"
    }`
  );

  // Test speech
  const testUtterance = new SpeechSynthesisUtterance(
    "Test della lettura vocale - Biblioteca digitale"
  );
  testUtterance.rate = 1;
  testUtterance.pitch = 1;
  testUtterance.volume = 1;

  if (italianVoice) {
    testUtterance.voice = italianVoice;
  }

  testUtterance.onstart = () => console.log("✅ Speech avviato");
  testUtterance.onend = () => console.log("✅ Speech terminato");
  testUtterance.onerror = (e) => console.error("❌ Errore speech:", e.error);

  // Uncomment per eseguire il test audio
  // window.speechSynthesis.speak(testUtterance);

  console.groupEnd();
  return { success: true, voices: voices.length, hasItalian: !!italianVoice };
};

// ============================================
// 3. TESTING FILTRI
// ============================================

export const testFilters = () => {
  const libri = require("../data/libri").default;

  console.group("🔍 TEST FILTRI");

  // Test 1: Filtro categoria
  const testCategoria = "Studi Biblici";
  const filtered1 = libri.filter((l) => l.categoria === testCategoria);
  console.log(
    `✅ Filtro categoria "${testCategoria}": ${filtered1.length} risultati`
  );

  // Test 2: Filtro anno
  const testAnno = 2024;
  const filtered2 = libri.filter((l) => l.anno === testAnno);
  console.log(`✅ Filtro anno ${testAnno}: ${filtered2.length} risultati`);

  // Test 3: Filtro bambini
  const filtered3 = libri.filter((l) => l.perBambini);
  console.log(`✅ Filtro per bambini: ${filtered3.length} risultati`);

  // Test 4: Ricerca testo
  const searchTerm = "fede";
  const filtered4 = libri.filter(
    (l) =>
      l.titolo.toLowerCase().includes(searchTerm) ||
      l.autore.toLowerCase().includes(searchTerm) ||
      l.descrizione.toLowerCase().includes(searchTerm)
  );
  console.log(`✅ Ricerca "${searchTerm}": ${filtered4.length} risultati`);

  // Test 5: Ordinamento
  const sortedByRating = [...libri].sort((a, b) => b.rating - a.rating);
  console.log(
    `✅ Ordinamento per rating: Top libro "${sortedByRating[0].titolo}" (${sortedByRating[0].rating})`
  );

  console.groupEnd();
  return { success: true };
};

// ============================================
// 4. TESTING PERFORMANCE
// ============================================

export const testPerformance = () => {
  console.group("⚡ TEST PERFORMANCE");

  const startTime = performance.now();

  // Simulazione caricamento e filtering
  const libri = require("../data/libri").default;
  let result = libri;

  // Applica filtri sequenziali
  result = result.filter((l) => l.anno === 2024);
  result = result.filter((l) => l.categoria === "Studi Biblici");
  result = result.sort((a, b) => b.rating - a.rating);

  const endTime = performance.now();
  const loadTime = (endTime - startTime).toFixed(2);

  console.log(`✅ Tempo caricamento e filtering: ${loadTime}ms`);

  if (loadTime > 100) {
    console.warn(
      "⚠️ Performance bassa - considera ottimizzazione per dataset grande"
    );
  } else {
    console.log("✅ Performance adeguata");
  }

  console.groupEnd();
  return { success: true, loadTime };
};

// ============================================
// 5. UTILITY GENERALI
// ============================================

export const debugLibro = (libroId) => {
  const libri = require("../data/libri").default;
  const libro = libri.find((l) => l._id === libroId);

  if (!libro) {
    console.error(`❌ Libro ${libroId} non trovato`);
    return null;
  }

  console.group(`📖 DEBUG LIBRO: ${libro.titolo}`);
  console.table(libro);
  console.groupEnd();

  return libro;
};

export const runAllTests = () => {
  console.log("🧪 ESECUZIONE TEST COMPLETI BIBLIOTECA DIGITALE...\n");

  const results = {
    dati: testLibriData(),
    tts: testTTS(),
    filtri: testFilters(),
    performance: testPerformance(),
  };

  console.log("\n✅ TEST COMPLETATI");
  console.table(results);

  return results;
};

// Esporta funzioni nel window globale per facile accesso in console
if (typeof window !== "undefined") {
  window.BibliotecaDebug = {
    testLibriData,
    testTTS,
    testFilters,
    testPerformance,
    debugLibro,
    runAllTests,
  };

  console.log(
    "💡 Debug utilities disponibili: window.BibliotecaDebug.runAllTests()"
  );
}
