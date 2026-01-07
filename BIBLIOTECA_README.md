# 📚 Biblioteca Digitale - Guida di Integrazione

## Panoramica

La Biblioteca Digitale è un nuovo modulo per il sito SDA Italia che consente agli utenti di:

- 📖 Leggere libri online
- 🔊 Ascoltare libri con lettura vocale (TTS)
- 💾 Scaricare libri in formato PDF ed EPUB
- 🔍 Filtrare per categoria, anno, per bambini, ecc.

## Struttura File Creati

```
src/
├── components/biblioteca/
│   ├── Biblioteca.jsx          # Pagina principale con filtri
│   ├── LibroCard.jsx           # Card singolo libro
│   └── LettoreLibro.jsx        # Lettore online con TTS
├── data/
│   └── libri.js                # Dati libri (mock)
└── App.jsx                     # Routes aggiornate
```

## Features Implementate

### 1. Pagina Biblioteca (Biblioteca.jsx)

- **Ricerca in tempo reale**: Cerca per titolo, autore, descrizione
- **Filtri Avanzati**:
  - Per categoria (Studi Biblici, Teologia, Bambini, Meditazione)
  - Per anno di pubblicazione
  - Per tipo (Per Bambini / Per Adulti)
- **Ordinamento**:
  - Più Recenti (default)
  - Top Rated
  - Più Scaricati
  - Per Titolo (A-Z / Z-A)
- **Statistiche Dashboard**:
  - Numero totali di libri
  - Libri per bambini
  - Numero categorie
  - Download totali
- **Lettura Vocale TTS**: Ascolta la descrizione del libro da qualsiasi card

### 2. Card Libro (LibroCard.jsx)

Ogni card mostra:

- Immagine del libro
- Titolo e autore
- Rating e numero download
- Categoria e anno
- Descrizione breve
- Metadata (pagine, capitoli, lingua)
- Pulsanti azione:
  - "Leggi Online" → Accede al lettore full-page
  - "Ascolta" → Lettura vocale della descrizione
  - "Scarica" → Menu dropdown con PDF/EPUB

### 3. Lettore Online (LettoreLibro.jsx)

Lettore completamente funzionale con:

- **Lettura Vocale (TTS)**:
  - Seleziona automaticamente voce italiana se disponibile
  - Controllo velocità di lettura (0.5x - 2x)
  - Pulsanti Start/Stop
- **Controlli Lettura**:
  - Incremento/decremento dimensione testo (4 livelli)
  - Modalità scura/chiara
- **Download**: Opzioni PDF e EPUB
- **Metadati Libro**:
  - Informazioni completa (autore, categoria, pagine, capitoli)
  - Descrizione estesa
- **Navigazione**: Link per tornare alla biblioteca

## Colori utilizzati

I colori mantengono la palette del sito:

- **Blue**: `#2563eb` (from-blue-600, to-blue-700) - Principale
- **Green**: `#16a34a` (from-green-600, to-green-700) - Secondario
- **Gray**: Scala grigia standard per neutrali
- **Accenti**: Yellow, Purple, Orange per categorie e stati

## Integrazione Backend (TODO)

### API Endpoints da implementare

```javascript
// Endpoints suggeriti per il backend

// GET /api/v1/libri - Lista di tutti i libri
// Query params:
// - categoria: string
// - anno: number
// - perBambini: boolean
// - search: string
// - sort: 'recente' | 'rating' | 'download'
// Risposta:
{
  "success": true,
  "data": [
    {
      "_id": "1",
      "titolo": "I Fondamenti della Fede",
      "autore": "Dr. Elena Rossi",
      "categoria": "Studi Biblici",
      "anno": 2024,
      "descrizione": "...",
      "immagine": "url-immagine",
      "perBambini": false,
      "etaConsigliata": "Adulti",
      "numeroCapitoli": 12,
      "pagine": 285,
      "lingua": "Italiano",
      "pdfUrl": "url-pdf",
      "epubUrl": "url-epub",
      "contenuto": "...",
      "dataPubblicazione": "2024-03-15",
      "rating": 4.8,
      "download": 1245
    }
  ]
}

// GET /api/v1/libri/:id - Dettagli singolo libro
// Risposta: { success: true, data: libroObject }

// POST /api/v1/libri/download/:id - Registra download
// Risposta: { success: true, message: "Download registrato" }
```

### File di configurazione per API

Nel backend (sdarmitalia-server), aggiungere:

```javascript
// routes/libriRoutes.js
const express = require("express");
const router = express.Router();
const libriController = require("../controller/libriController");

router.get("/", libriController.getLibri);
router.get("/:id", libriController.getLibroById);
router.post("/download/:id", libriController.registraDownload);

module.exports = router;

// In server.js o index.js
app.use("/api/v1/libri", require("./routes/libriRoutes"));
```

## Personalizzazione

### Aggiungere Nuovi Libri

Modificare `src/data/libri.js`:

```javascript
{
  _id: "9",
  titolo: "Titolo del Libro",
  autore: "Nome Autore",
  categoria: "Nome Categoria", // Deve corrispondere a categorie esistenti
  anno: 2024,
  descrizione: "Breve descrizione...",
  immagine: "https://url-immagine.jpg",
  perBambini: false,
  etaConsigliata: "Adulti",
  numeroCapitoli: 10,
  pagine: 200,
  lingua: "Italiano",
  pdfUrl: "https://url-pdf.pdf",
  epubUrl: "https://url-epub.epub",
  contenuto: "Contenuto completo del libro...",
  dataPubblicazione: "2024-01-15",
  rating: 4.5,
  download: 500
}
```

### Aggiungere Nuove Categorie

Le categorie si estraggono automaticamente da `libri.map(l => l.categoria)`. Basta aggiungere un nuovo libro con una categoria nuova e apparirà nei filtri.

### Personalizzare Stili

Tutti i componenti usano Tailwind CSS. Modificare le classi nelle seguenti sezioni:

- Colori gradiente: `from-blue-600 to-green-600`
- Spaziature: classi `px-`, `py-`, `p-`
- Responsive: classi `md:`, `lg:`, `xl:`

## Browser Compatibility

### Text-to-Speech (TTS)

- ✅ Chrome/Edge (v25+)
- ✅ Firefox (v49+)
- ✅ Safari (v14.1+)
- ⚠️ Mobile: Supportato ma con limitazioni (alcune browser mobile hanno voce unica)

### Download File

- ✅ Tutti i browser moderni

## Performance Tips

1. **Immagini Libro**: Usare formati ottimizzati (WebP) per migliori performance
2. **Caricamento Contenuto**: Attualmente il contenuto è caricato nel componente. Per libri molto grandi, considerare paginazione
3. **TTS**: Il TTS funziona meglio con testi più corti. Per libri lunghi, considerare divisione per capitoli
4. **Caching**: Implementare caching nel backend per filtri frequenti

## Accessibilità

✅ **Implementato**:

- Semantica HTML5 corretta
- ARIA labels su pulsanti
- Contrasti di colore adeguati
- Navigazione da tastiera
- Lettura vocale integrata

## Roadmap Futura

1. **Sistema di Rating**: Permettere agli utenti di votare i libri
2. **Commenti e Recensioni**: Sezione discussione per ogni libro
3. **Preferiti**: Salvare i libri preferiti (localStorage o backend)
4. **Segnalibri**: Ricordare la pagina ultima lettura
5. **Statistiche Lettura**: Tracciare tempo speso su ogni libro
6. **Notifiche**: Alert per nuovi libri in una categoria preferita
7. **Integrazione OPDS**: Supporto standard per reader EPUB
8. **Traduzione**: Supportare altri idiomi

## Support

Per domande o issues riguardanti la Biblioteca Digitale, contattare il team sviluppo.
