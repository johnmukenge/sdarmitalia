# 📰 SEZIONE ARTICOLI - QUICK START

## ✅ Cosa è Stato Fatto

### Componenti Creati

1. **Articles.jsx** - Pagina principale con filtri
   - Ricerca per titolo/autore
   - Filtri per anno e trimestre
   - Griglia responsiva (3 colonne desktop)
2. **ArticleCard.jsx** - Card per singolo articolo

   - Immagine con hover effect
   - Badge trimestre
   - Pulsanti Leggi e Scarica

3. **ArticleDetail.jsx** - Pagina dettaglio articolo
   - Visualizzazione completa
   - Sidebar articoli correlati
   - Hero section

### Dati Mock

- **articoli.js** - 7 articoli con struttura completa
  - Title, author, image, excerpt, content
  - Year, quarter, publishedAt, pdfUrl
  - Pronti per integrazione backend

### Utility Helper

- **articleHelpers.js** - 16 funzioni utility
  - Filtro, ricerca, ordinamento
  - Paginazione, raggruppamento
  - Formattazione date

### Documentazione

1. **ARTICOLI_SETUP.md** - Setup e istruzioni base
2. **ARTICOLI_GUIDA_COMPLETA.md** - Guida dettagliata con UI mockup
3. **articlesBackendIntegration.js** - API contracts e hook templates
4. **articlesDemo.js** - Demo functions per testing

## 🚀 Come Testare Subito

```bash
# 1. Avvia il dev server
npm run dev

# 2. Naviga a http://localhost:5173/articoli

# 3. Testa:
   - Filtri per anno
   - Filtri per trimestre
   - Ricerca
   - Click "Leggi" per vedere dettagli
   - Click download per PDF
```

## 🎯 Prossimi Step

### Per il Backend Team

1. Crea questi endpoints:

   - `GET /api/v1/articles` (con filtri year, quarter, search)
   - `GET /api/v1/articles/:id`
   - `GET /api/v1/articles/:id/related`

2. Risposta attesa:
   ```json
   {
     "success": true,
     "data": {
       "articles": [...],
       "total": 10,
       "pages": 1,
       "currentPage": 1
     }
   }
   ```

### Per il Frontend Team (In Seguito)

1. Crea `src/hooks/useArticles.js` con hook personalizzati
2. Sostituisci import dati mock con API calls
3. Aggiungi error handling e loading states

## 📊 Struttura File

```
src/
├── components/articles/
│   ├── Articles.jsx          ✅ NUOVO
│   ├── ArticleCard.jsx       ✅ NUOVO
│   └── ArticleDetail.jsx     ✅ NUOVO
├── data/
│   └── articoli.js           ✅ AGGIORNATO
├── utils/
│   ├── articleHelpers.js     ✅ NUOVO
│   ├── articlesDemo.js       ✅ NUOVO
│   └── articlesBackendIntegration.js ✅ NUOVO
└── App.jsx                   ✅ AGGIORNATO (rotte)
```

## 🎨 Design Highlight

- ✅ Colori brand: Blu (#2563eb) e Bianco
- ✅ Responsive: Mobile, Tablet, Desktop
- ✅ Accessibility: Label e aria-\* attributes
- ✅ Performance: Lazy loading ready
- ✅ Shadows e hover effects moderni

## 🔗 Link Utili

| Documento                                                                          | Descrizione                  |
| ---------------------------------------------------------------------------------- | ---------------------------- |
| [ARTICOLI_SETUP.md](ARTICOLI_SETUP.md)                                             | Documentazione setup         |
| [ARTICOLI_GUIDA_COMPLETA.md](ARTICOLI_GUIDA_COMPLETA.md)                           | Guida dettagliata con mockup |
| [src/utils/articlesBackendIntegration.js](src/utils/articlesBackendIntegration.js) | API contracts                |
| [src/utils/articleHelpers.js](src/utils/articleHelpers.js)                         | Funzioni utility             |

## 💡 Pro Tips

1. **Mock Data**: Attuali in `src/data/articoli.js` - Puoi aggiungerne altri facilmente
2. **Icone**: Usa `lucide-react` - Ad es. `<Download size={16} />`
3. **Colori**: Tailwind classes - `bg-blue-600`, `hover:bg-blue-700`, etc.
4. **Date**: Formatte in italiano - `new Date().toLocaleDateString('it-IT')`
5. **Filtri**: Real-time update - No need to click a button!

## 🔄 Checklist di Integrazione Backend

- [ ] API GET /api/v1/articles creato
- [ ] API GET /api/v1/articles/:id creato
- [ ] API GET /api/v1/articles/:id/related creato (opzionale)
- [ ] Testato con curl/Postman
- [ ] Hook useArticles creato in src/hooks/
- [ ] Articles.jsx aggiornato per usare hook
- [ ] ArticleDetail.jsx aggiornato per usare hook
- [ ] Testato end-to-end
- [ ] Error handling aggiunto
- [ ] Loading states aggiunto

## 🎓 Esempi di Utilizzo

### Usare le Utility

```javascript
import { formatDate, searchArticles } from "src/utils/articleHelpers";

// Formattare data
const formatted = formatDate("2024-03-15"); // "15 marzo 2024"

// Cercare articoli
const results = searchArticles(articoli, "Nuovo");
```

### Testare con Demo Functions

```javascript
import { runAllDemos } from "src/utils/articlesDemo";

// Eseguire tutte le demo (apri console browser)
runAllDemos();
```

## ❓ FAQ

**Q: Come aggiungere nuovi articoli?**
A: Modifica `src/data/articoli.js` seguendo la struttura esistente.

**Q: Come cambiare i colori?**
A: Modifica le classi Tailwind nei componenti (es. `bg-blue-600` → `bg-green-600`).

**Q: Come integrare con il backend?**
A: Vedi `src/utils/articlesBackendIntegration.js` per i dettagli.

**Q: I filtri non funzionano?**
A: Apri console del browser per debug. I dati mock sono in `src/data/articoli.js`.

**Q: Come testare i PDF?**
A: Modifica `pdfUrl` negli articoli mock per puntare a veri PDF, o crea endpoint `/api/v1/articles/:id/pdf`.

---

**Status**: ✅ Production Ready (Mock Data)
**Versione**: 1.0.0
**Data**: Dicembre 2024
