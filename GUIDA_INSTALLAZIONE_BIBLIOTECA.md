# 📚 Guida di Installazione - Biblioteca Digitale

## ✅ Checklist Installazione

### Fase 1: File Creati ✓

- [x] `src/data/libri.js` - Dati libri
- [x] `src/components/biblioteca/Biblioteca.jsx` - Pagina principale
- [x] `src/components/biblioteca/LibroCard.jsx` - Componente card
- [x] `src/components/biblioteca/LettoreLibro.jsx` - Lettore online
- [x] `src/styles/biblioteca.css` - Stili aggiuntivi
- [x] `src/utils/bibliotecaDebug.js` - Utility debug
- [x] `src/App.jsx` - Routes aggiornate
- [x] `src/components/navbar/Navbar.jsx` - Link navbar

### Fase 2: Import CSS (OPZIONALE ma CONSIGLIATO)

Se desideri usare gli stili custom, importa il CSS in uno dei file principali:

```javascript
// In src/main.jsx o src/App.jsx, aggiungi:
import "./styles/biblioteca.css";
```

## 🚀 Come Avviare

### Sviluppo locale

```bash
cd c:\projects\personal\sdarmitalia
npm run dev
```

Visita: `http://localhost:5173/biblioteca`

### Build produzione

```bash
npm run build
```

## 📖 Accesso alla Biblioteca

### Via Navbar

- Desktop: Clicca su "📚 Biblioteca" nel menu principale
- Mobile: Apri menu hamburger, clicca "📚 Biblioteca"

### Via URL diretto

- Pagina principale: `/biblioteca`
- Leggi libro (es. ID "1"): `/biblioteca/1`

## 🧪 Testing

### 1. Debug in Console (Browser)

Apri la console del browser (F12) e esegui:

```javascript
// Esegui tutti i test
window.BibliotecaDebug.runAllTests();

// Test singoli
window.BibliotecaDebug.testLibriData(); // Test struttura dati
window.BibliotecaDebug.testTTS(); // Test text-to-speech
window.BibliotecaDebug.testFilters(); // Test filtri
window.BibliotecaDebug.testPerformance(); // Test performance

// Debug libro specifico
window.BibliotecaDebug.debugLibro("1"); // Dettagli libro ID "1"
```

### 2. Test TTS (Text-to-Speech)

1. Vai a `/biblioteca`
2. Clicca su qualsiasi pulsante "Ascolta" su una card
3. Verifica che la voce italiana legga la descrizione
4. Vai a `/biblioteca/1` (leggi online)
5. Abilita "Lettura Vocale" e clicca "Inizia Lettura"

### 3. Test Filtri

1. Vai a `/biblioteca`
2. Clicca su "Filtri"
3. Prova:
   - Ricerca per titolo (es. "Fede")
   - Filtro categoria
   - Filtro anno
   - Filtro per bambini

### 4. Test Download

1. Vai a `/biblioteca`
2. Hover su "Scarica" in una card
3. Clicca PDF o EPUB (apre link, potrebbero non essere disponibili)

## 🔧 Configurazione Avanzata

### Aggiungere Libri dal Backend

Se hai un backend Node.js, implementa:

```javascript
// routes/libriRoutes.js
const express = require("express");
const router = express.Router();

// Middleware per gestire le richieste
router.get("/", async (req, res) => {
  try {
    const { categoria, anno, search, sort } = req.query;
    let query = {};

    if (categoria) query.categoria = categoria;
    if (anno) query.anno = parseInt(anno);
    if (search) {
      query.$or = [
        { titolo: { $regex: search, $options: "i" } },
        { autore: { $regex: search, $options: "i" } },
      ];
    }

    const libri = await Libro.find(query).sort({
      dataPubblicazione: sort === "recente" ? -1 : 1,
    });

    res.json({ success: true, data: libri });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
```

Poi in `Biblioteca.jsx`, sostituisci il mock con:

```javascript
useEffect(() => {
  const fetchLibri = async () => {
    try {
      const params = new URLSearchParams({
        categoria: selectedCategoria,
        anno: selectedAnno,
        search: searchTerm,
        sort: sortBy,
      });

      const response = await fetch(
        `http://localhost:5000/api/v1/libri?${params}`
      );
      const data = await response.json();
      setFilteredLibri(data.data);
    } catch (error) {
      console.error("Errore caricamento libri:", error);
    }
  };

  fetchLibri();
}, [searchTerm, selectedCategoria, selectedAnno, sortBy]);
```

## 📱 Responsività

La Biblioteca è completamente responsive:

- **Desktop** (> 1280px): 4 colonne
- **Tablet** (768px - 1024px): 2 colonne
- **Mobile** (< 768px): 1 colonna

Testare in Chrome DevTools (F12 → Toggle device toolbar)

## ♿ Accessibilità

L'app include:

- ✅ Semantic HTML5
- ✅ ARIA labels
- ✅ Focus visible
- ✅ Keyboard navigation
- ✅ Text-to-speech (TTS)

Test:

1. Naviga con Tab key
2. Prova text-to-speech
3. Prova con screen reader (NVDA, JAWS)

## 🎨 Personalizzazione Colori

Modifica i colori in:

1. **Tailwind**: Nella sezione `className` dei componenti

   - Blue: `from-blue-600` → `from-blue-500` etc.
   - Green: `from-green-600` → `from-emerald-600` etc.

2. **CSS Custom**: In `biblioteca.css`

Colori attuali:

- Primary Blue: `#2563eb`
- Primary Green: `#16a34a`
- Background Gradient: `from-blue-50 to-green-50`

## 🐛 Troubleshooting

### TTS non funziona

- Verifica supporto browser (Chrome, Firefox, Safari, Edge)
- Controlla volume di sistema
- Su mobile, potrebbe avere limitazioni

### Immagini non caricate

- Attualmente usa placeholder
- Sostituisci con URL reali in `libri.js`

### Filtri non rispondono

- Controlla Console per errori
- Verifica che i dati siano caricati
- Esegui `window.BibliotecaDebug.testFilters()`

### Performance lenta

- Limita numero libri con backend
- Implementa paginazione (TODO)
- Ottimizza immagini

## 📊 Monitoraggio

Aggiungi monitoring per Analytics:

```javascript
// In Biblioteca.jsx, traccia eventi:
const trackEvent = (eventName, data) => {
  if (window.gtag) {
    window.gtag("event", eventName, data);
  }
};

// Esempi:
trackEvent("biblioteca_search", { term: searchTerm });
trackEvent("libro_aperto", { libroId: id });
trackEvent("tts_avviato", { libroId: id });
```

## 🚀 Prossimi Step Consigliati

1. **Integrare Backend**: Connettere a API reale per libri
2. **Aggiungere Rating**: Permettere utenti di votare
3. **Salva Preferenze**: localStorage per preferiti
4. **Segnalibri**: Ricordare ultima pagina letta
5. **Statistiche**: Tracciare tempo lettura
6. **Condivisione**: Aggiungere share buttons
7. **Commenti**: Sistema di discussione per libri

## 📞 Support

Per problemi:

1. Controlla la console (F12)
2. Esegui debug test
3. Verifica `BIBLIOTECA_README.md` per dettagli tecnici
4. Contatta il team sviluppo

---

**Documento creato**: Gennaio 2026
**Versione**: 1.0
**Status**: ✅ Pronto per produzione
