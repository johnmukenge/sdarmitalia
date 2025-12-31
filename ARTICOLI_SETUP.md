# Sezione Articoli - Documentazione

## 📋 Panoramica

La sezione articoli è stata completamente riprogettata con una UI moderna e professionale che mantiene i colori blu e bianco utilizzati nel progetto.

## 🎯 Funzionalità Implementate

### 1. **Pagina Principale Articoli** (`Articles.jsx`)

- ✅ Visualizzazione a griglia responsiva (3 colonne su desktop, 2 su tablet, 1 su mobile)
- ✅ **Filtri avanzati:**
  - Ricerca per titolo e autore
  - Filtro per anno di pubblicazione
  - Filtro per trimestre (Q1, Q2, Q3, Q4)
- ✅ Pulsante "Azzera filtri" per reset veloce
- ✅ Contatore dei risultati filtrati
- ✅ Ordinamento automatico per data decrescente
- ✅ Messaggio di feedback quando non ci sono risultati

### 2. **Card Articoli** (`ArticleCard.jsx`)

- ✅ Design elegante con immagine, titolo e anteprima
- ✅ Badge con trimestre di pubblicazione
- ✅ Effetto hover sullo shadow
- ✅ Due pulsanti di azione:
  - **"Leggi"**: Naviga alla pagina di dettaglio
  - **"Scarica"**: Scarica l'articolo in PDF

### 3. **Pagina Dettagli Articoli** (`ArticleDetail.jsx`)

- ✅ Hero section con immagine dell'articolo
- ✅ Visualizzazione completa dell'articolo
- ✅ Metadati (autore, data, anno, trimestre)
- ✅ Contenuto formattato con paragrafi
- ✅ Sidebar sticky con:
  - Articoli correlati dello stesso anno
  - Box info per contattare il sito
- ✅ Pulsante di download PDF
- ✅ Pulsante per tornare alla lista articoli
- ✅ Gestione del caso articolo non trovato

## 📊 Struttura Dati Mock

I dati mock sono in [`src/data/articoli.js`](src/data/articoli.js) con la seguente struttura:

```javascript
{
  _id: "1",                                    // ID univoco
  title: "Titolo Articolo",                  // Titolo
  author: "Nome Autore",                     // Autore
  image: imageUrl,                           // URL immagine
  excerpt: "Anteprima breve...",            // Anteprima (max 150 caratteri)
  content: "Contenuto completo...",         // Contenuto (paragrafi separati da \n\n)
  publishedAt: "2024-03-15",                // Data ISO
  year: 2024,                                // Anno
  quarter: "Q1",                             // Trimestre (Q1-Q4)
  pdfUrl: "#",                               // URL PDF per download
}
```

## 🎨 Design e Colori

- **Colore Primario**: `bg-blue-600` / `hover:bg-blue-700` (Blu professionale)
- **Colore Secondario**: `bg-blue-50` / `bg-blue-100` (Blu chiaro)
- **Sfondo**: Bianco (`bg-white`)
- **Testo**: Grigio scuro (`text-gray-800`)
- **Accenti**: Blu scuro per i link

## 🔌 Integrazione Backend

### Stato Attuale

- ✅ Componenti pronti con dati mock
- ✅ Logica di filtro e ricerca funzionante
- ✅ Struttura API già pianificata

### Come Integrare il Backend

1. **Leggi il file di integrazione:**

   ```
   src/utils/articlesBackendIntegration.js
   ```

2. **Crea il file dei hook** (quando il backend è pronto):

   ```javascript
   // src/hooks/useArticles.js
   // Contiene useArticles() e useArticleDetail()
   ```

3. **Endpoint API Richiesti:**

   - `GET /api/v1/articles` - Lista articoli con filtri
   - `GET /api/v1/articles/:id` - Dettagli articolo
   - `GET /api/v1/articles/filter/years` - Anni disponibili (opzionale)
   - `GET /api/v1/articles/:id/related` - Articoli correlati (opzionale)

4. **Sostituzione nel codice:**
   - In `Articles.jsx`, sostituisci il caricamento mock con `useArticles(filters)`
   - In `ArticleDetail.jsx`, sostituisci con `useArticleDetail(id)`

## 📱 Responsive Design

- **Desktop** (lg): 3 colonne
- **Tablet** (md): 2 colonne
- **Mobile** (sm): 1 colonna

Tutti gli elementi sono ottimizzati per la visualizzazione su dispositivi piccoli.

## 🚀 Prossimi Step

### Lato Backend

- [ ] Creare le API endpoints come documentato
- [ ] Implementare paginazione
- [ ] Aggiungere autenticazione per admin
- [ ] Implementare upload file PDF

### Lato Frontend

- [ ] Integrare gli hook con il backend
- [ ] Aggiungere paginazione (next/prev)
- [ ] Animazioni di transizione tra pagine
- [ ] Toast notifiche per azioni
- [ ] Dark mode (opzionale)
- [ ] SEO metadata (meta tags dinamici)

## 📚 File Modificati/Creati

```
src/
├── components/
│   └── articles/
│       ├── Articles.jsx          [MODIFICATO]
│       ├── ArticleCard.jsx        [NUOVO]
│       └── ArticleDetail.jsx      [NUOVO]
├── data/
│   └── articoli.js                [MODIFICATO]
├── utils/
│   └── articlesBackendIntegration.js [NUOVO]
└── App.jsx                        [MODIFICATO - rotta aggiunta]
```

## 🔍 Testing

Per testare i componenti:

```bash
# Avvia il server di sviluppo
npm run dev

# Naviga su http://localhost:5173/articoli
# Prova i filtri, la ricerca e i link
# Clicca su "Leggi" per vedere la pagina di dettaglio
```

## 💡 Note Importanti

1. **Immagini**: Assicurati che tutte le immagini siano disponibili in `src/assets/`
2. **PDF**: I link PDF attuali puntano a `#`. Modifica `pdfUrl` per puntare ai veri file PDF
3. **Dati**: I dati attuali sono mock. Verranno sostituiti da API quando il backend sarà pronto
4. **Lucide Icons**: Il progetto usa `lucide-react` per le icone (già installato)

## 📞 Supporto Integrazione

Il file `articlesBackendIntegration.js` contiene:

- ✅ Documentazione completa degli endpoint
- ✅ Esempi di hook personalizzati
- ✅ Istruzioni step-by-step di integrazione
- ✅ Comandi curl per testare le API

---

**Creato**: Dicembre 2024
**Versione**: 1.0
