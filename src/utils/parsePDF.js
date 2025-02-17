import * as pdfjsLib from "pdfjs-dist";
import "pdfjs-dist/build/pdf.worker"; // Importa il worker direttamente

export const extractLessonsFromPDF = async (file) => {
  const reader = new FileReader();
  reader.readAsArrayBuffer(file);

  return new Promise((resolve, reject) => {
    reader.onload = async () => {
      try {
        const pdf = await pdfjsLib.getDocument({ data: reader.result }).promise;
        let text = "";

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          text += content.items.map((item) => item.str).join(" ") + "\n";
        }

        resolve(parseTextToJSON(text));
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = (error) => reject(error);
  });
};

// Funzione per convertire il testo in JSON
const parseTextToJSON = (text) => {
  const lines = text.split("\n");
  const lezioni = [];
  let settimanaCorrente = null;

  lines.forEach((line) => {
    line = line.trim();
    if (/^Settimana \d+/.test(line)) {
      settimanaCorrente = { title: line, days: [] };
      lezioni.push(settimanaCorrente);
    } else if (settimanaCorrente) {
      settimanaCorrente.days.push(line);
    }
  });

  return lezioni;
};
