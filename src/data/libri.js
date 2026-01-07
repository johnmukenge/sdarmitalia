// Dati di esempio per la biblioteca
// TODO: Integrare con API backend per il caricamento dei libri

const libri = [
  {
    _id: "1",
    titolo: "I Fondamenti della Fede",
    autore: "Dr. Elena Rossi",
    categoria: "Studi Biblici",
    anno: 2024,
    descrizione:
      "Una guida completa ai fondamenti della fede cristiana con spiegazioni approfondite e riflessioni personali.",
    immagine: "https://via.placeholder.com/300x400?text=Fondamenti+della+Fede",
    perBambini: false,
    etaConsigliata: "Adulti",
    numeroCapitoli: 12,
    pagine: 285,
    lingua: "Italiano",
    pdfUrl: "https://example.com/fondamenti-fede.pdf",
    epubUrl: "https://example.com/fondamenti-fede.epub",
    contenuto: `
# I Fondamenti della Fede

## Introduzione
Benvenuto in questo viaggio affascinante attraverso i fondamenti della fede cristiana...

## Capitolo 1: Cos'è la Fede?
La fede è uno dei concetti più importanti nella vita cristiana...

## Capitolo 2: La Bibbia come Fondamento
La Bibbia è il libro sacro che guida la nostra fede e il nostro cammino spirituale...

## Capitolo 3: La Preghiera e la Comunione con Dio
La preghiera è il mezzo attraverso cui comunichiamo direttamente con Dio...

[Continua con altri capitoli...]
    `,
    dataPubblicazione: "2024-03-15",
    rating: 4.8,
    download: 1245,
  },
  {
    _id: "2",
    titolo: "Storie Bibliche per Bambini",
    autore: "Paola Benedetti",
    categoria: "Bambini",
    anno: 2024,
    descrizione:
      "Affascinanti storie bibliche raccontate in modo semplice e divertente per i bambini con illustrazioni coloratissime.",
    immagine: "https://via.placeholder.com/300x400?text=Storie+Bibliche",
    perBambini: true,
    etaConsigliata: "3-8 anni",
    numeroCapitoli: 8,
    pagine: 120,
    lingua: "Italiano",
    pdfUrl: "https://example.com/storie-bibliche.pdf",
    epubUrl: "https://example.com/storie-bibliche.epub",
    contenuto: `
# Storie Bibliche per Bambini

## La Creazione
Nel principio, Dio creò i cieli e la terra...

## Adamo ed Eva
Dopo aver creato il mondo, Dio creò il primo uomo e la prima donna...

## L'Arca di Noè
C'era un uomo giusto di nome Noè...

[Continua con altre storie...]
    `,
    dataPubblicazione: "2024-02-20",
    rating: 4.9,
    download: 2100,
  },
  {
    _id: "3",
    titolo: "La Vita di Gesù - Una Prospettiva Spirituale",
    autore: "Pastore Marco Toriello",
    categoria: "Teologia",
    anno: 2023,
    descrizione:
      "Un'approfondita analisi della vita di Gesù Cristo e del suo insegnamento, con meditazioni quotidiane.",
    immagine: "https://via.placeholder.com/300x400?text=Vita+di+Gesu",
    perBambini: false,
    etaConsigliata: "Adulti",
    numeroCapitoli: 25,
    pagine: 412,
    lingua: "Italiano",
    pdfUrl: "https://example.com/vita-gesu.pdf",
    epubUrl: "https://example.com/vita-gesu.epub",
    contenuto: `
# La Vita di Gesù - Una Prospettiva Spirituale

## Parte I: La Nascita e l'Infanzia di Gesù
Gesù nacque a Betlemme in un momento particolare della storia...

## Parte II: Il Ministero Pubblico
Durante tre anni, Gesù percorse la terra predicando il Regno di Dio...

[Continua con altre parti...]
    `,
    dataPubblicazione: "2023-09-10",
    rating: 4.7,
    download: 980,
  },
  {
    _id: "4",
    titolo: "Meditazioni per la Crescita Spirituale",
    autore: "Dr. Andrea Lombardi",
    categoria: "Meditazione",
    anno: 2024,
    descrizione:
      "40 meditazioni giornaliere per approfondire la tua relazione con Dio e trovare pace interiore.",
    immagine: "https://via.placeholder.com/300x400?text=Meditazioni",
    perBambini: false,
    etaConsigliata: "Giovani Adulti",
    numeroCapitoli: 40,
    pagine: 180,
    lingua: "Italiano",
    pdfUrl: "https://example.com/meditazioni.pdf",
    epubUrl: "https://example.com/meditazioni.epub",
    contenuto: `
# Meditazioni per la Crescita Spirituale

## Meditazione 1: Il Primo Passo
Iniziare il tuo cammino spirituale richiede un singolo passo di fede...

## Meditazione 2: La Fiducia in Dio
Fidati del Signore con tutto il tuo cuore...

[Continua con altre meditazioni...]
    `,
    dataPubblicazione: "2024-01-05",
    rating: 4.6,
    download: 756,
  },
  {
    _id: "5",
    titolo: "I Dieci Comandamenti - Guida Pratica",
    autore: "Professore Luigi Ferraro",
    categoria: "Studi Biblici",
    anno: 2023,
    descrizione:
      "Una guida pratica per comprendere e applicare i Dieci Comandamenti nella vita moderna.",
    immagine: "https://via.placeholder.com/300x400?text=Dieci+Comandamenti",
    perBambini: false,
    etaConsigliata: "Adulti",
    numeroCapitoli: 10,
    pagine: 250,
    lingua: "Italiano",
    pdfUrl: "https://example.com/dieci-comandamenti.pdf",
    epubUrl: "https://example.com/dieci-comandamenti.epub",
    contenuto: `
# I Dieci Comandamenti - Guida Pratica

## Introduzione: Perché i Dieci Comandamenti?
I Dieci Comandamenti sono il fondamento della moralità cristiana...

## Il Primo Comandamento: Non avrai altri dei davanti a me
Questo comandamento parla dell'esclusività della nostra relazione con Dio...

[Continua con gli altri comandamenti...]
    `,
    dataPubblicazione: "2023-11-20",
    rating: 4.5,
    download: 645,
  },
  {
    _id: "6",
    titolo: "Avventure di Piccolo Davide",
    autore: "Carla Gattazzo",
    categoria: "Bambini",
    anno: 2024,
    descrizione:
      "Le avventure del giovane Davide narrate in modo coinvolgente per i bambini, con messaggi di speranza.",
    immagine: "https://via.placeholder.com/300x400?text=Piccolo+Davide",
    perBambini: true,
    etaConsigliata: "4-10 anni",
    numeroCapitoli: 6,
    pagine: 95,
    lingua: "Italiano",
    pdfUrl: "https://example.com/piccolo-davide.pdf",
    epubUrl: "https://example.com/piccolo-davide.epub",
    contenuto: `
# Avventure di Piccolo Davide

## Capitolo 1: Un Giovane Pastore
Davide era un giovane pastore che si prendeva cura delle pecore di suo padre...

## Capitolo 2: Il Coraggio nel Cuore
Quando un leone attaccò il gregge, Davide non ebbe paura...

[Continua con altri capitoli...]
    `,
    dataPubblicazione: "2024-04-10",
    rating: 4.9,
    download: 1850,
  },
  {
    _id: "7",
    titolo: "La Resurrezione: Speranza Eterna",
    autore: "Pastore Riccardo Moretti",
    categoria: "Teologia",
    anno: 2023,
    descrizione:
      "Un'analisi profonda del significato della resurrezione di Cristo e della speranza che essa offre ai credenti.",
    immagine: "https://via.placeholder.com/300x400?text=Resurrezione",
    perBambini: false,
    etaConsigliata: "Adulti",
    numeroCapitoli: 15,
    pagine: 320,
    lingua: "Italiano",
    pdfUrl: "https://example.com/resurrezione.pdf",
    epubUrl: "https://example.com/resurrezione.epub",
    contenuto: `
# La Resurrezione: Speranza Eterna

## Parte I: La Morte e la Risurrezione di Cristo
La morte di Gesù sulla croce rappresenta il momento più importante della storia...

## Parte II: Il Significato Teologico
La resurrezione di Cristo non è solo un evento storico, ma ha implicazioni spirituali profonde...

[Continua con altre parti...]
    `,
    dataPubblicazione: "2023-12-15",
    rating: 4.8,
    download: 723,
  },
  {
    _id: "8",
    titolo: "Fiabe Morali per Crescere",
    autore: "Lucia Bellini",
    categoria: "Bambini",
    anno: 2024,
    descrizione:
      "Bellissime fiabe con insegnamenti morali per aiutare i bambini a crescere con valori positivi.",
    immagine: "https://via.placeholder.com/300x400?text=Fiabe+Morali",
    perBambini: true,
    etaConsigliata: "5-9 anni",
    numeroCapitoli: 7,
    pagine: 110,
    lingua: "Italiano",
    pdfUrl: "https://example.com/fiabe-morali.pdf",
    epubUrl: "https://example.com/fiabe-morali.epub",
    contenuto: `
# Fiabe Morali per Crescere

## La Farfalla e il Fiore
C'era una volta una piccola farfalla che volava nel giardino...

## Il Piccolo Uccello Senza Paura
In un nido tra i rami di un grande albero viveva un piccolo uccello...

[Continua con altre fiabe...]
    `,
    dataPubblicazione: "2024-03-25",
    rating: 4.8,
    download: 1560,
  },
];

export default libri;
