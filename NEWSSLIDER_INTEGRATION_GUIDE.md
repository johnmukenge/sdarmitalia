# 📝 INTEGRATION EXAMPLE - NewsSlider nella Homepage

## Dove Aggiungere NewsSlider?

Aggiungi il componente NewsSlider nella tua pagina `Body.jsx` (homepage).

---

## ✅ VERSIONE COMPLETA DI Body.jsx CON NEWSSLIDER

```jsx
import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from "../header/Header";
import Events from "../events/EventsSlider";
import Navbar from "../navbar/Navbar";
import NewsSlider from "../news/NewsSlider"; // ✅ IMPORT NUOVO
import { Heart, BookOpen, Users, Zap } from "lucide-react";

/**
 * Body Component - Homepage principale con NewsSlider integrato
 */
const Body = () => {
  const [animateStats, setAnimateStats] = useState(false);

  useEffect(() => {
    setAnimateStats(true);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="w-full">
      <Navbar />
      <Header />

      {/* ═══════════════════════════════════════════════════════════════
          SEZIONE PRINCIPALE - HERO
          ═══════════════════════════════════════════════════════════════ */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">
              Benvenuti a SDARM Italia
            </h1>
            <p className="text-xl text-gray-600">
              Una comunità di fede, speranza e amore
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <Heart className="text-red-500 mx-auto mb-3" size={32} />
              <h3 className="text-2xl font-bold text-gray-800">10K+</h3>
              <p className="text-gray-600">Membri Attivi</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <BookOpen className="text-blue-600 mx-auto mb-3" size={32} />
              <h3 className="text-2xl font-bold text-gray-800">500+</h3>
              <p className="text-gray-600">Articoli</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <Users className="text-green-600 mx-auto mb-3" size={32} />
              <h3 className="text-2xl font-bold text-gray-800">50+</h3>
              <p className="text-gray-600">Chiese</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <Zap className="text-yellow-600 mx-auto mb-3" size={32} />
              <h3 className="text-2xl font-bold text-gray-800">24/7</h3>
              <p className="text-gray-600">Supporto</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          ✅ SEZIONE NOTIZIE - NEWSSLIDER
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          {/* Titolo Sezione */}
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-gray-800 mb-2">
              📰 Ultime Notizie
            </h2>
            <p className="text-gray-600">
              Rimani aggiornato sugli ultimi eventi e annunci della comunità
            </p>
          </div>

          {/* NewsSlider Component */}
          <NewsSlider limit={6} />

          {/* Bottone "Vedi Tutte le Notizie" */}
          <div className="text-center mt-8">
            <a
              href="/news"
              className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              Vedi Tutte le Notizie
              <span>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SEZIONE EVENTI
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-800 mb-8">
            🎉 Prossimi Eventi
          </h2>
          <Events />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SEZIONE CTA - CALL TO ACTION
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">
            Unisciti alla Nostra Comunità
          </h2>
          <p className="text-lg text-blue-100 mb-8">
            Scopri di più sulla nostra missione e su come puoi fare la
            differenza
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors">
              Unisciti Ora
            </button>
            <button className="px-8 py-3 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors">
              Scopri di Più
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SEZIONE FOOTER
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-12 px-4 bg-gray-900 text-white text-center">
        <p>&copy; 2025 SDARM Italia. Tutti i diritti riservati.</p>
      </section>
    </div>
  );
};

export default Body;
```

---

## 📋 STEP-BY-STEP INTEGRATION

### Step 1: Import the Component

Aggiungi questo all'inizio del file Body.jsx:

```jsx
import NewsSlider from "../news/NewsSlider";
```

### Step 2: Add the Section

Inserisci il NewsSlider dove vuoi (consigliato dopo hero section o prima di events):

```jsx
{
  /* Sezione Notizie */
}
<section className="py-16 px-4 bg-white">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-4xl font-bold text-gray-800 mb-8">📰 Ultime Notizie</h2>
    <NewsSlider limit={6} />
  </div>
</section>;
```

### Step 3: Customize (Optional)

Modifica secondo il tuo design:

```jsx
// Cambia il numero di notizie
<NewsSlider limit={5} />    // 5 notizie
<NewsSlider limit={10} />   // 10 notizie

// Cambia i titoli
<h2 className="text-3xl font-bold">Le Nostre Notizie</h2>

// Aggiungi descrizione
<p className="text-gray-600 mb-8">
  Scopri gli ultimi aggiornamenti della comunità
</p>
```

### Step 4: Test

```bash
npm run dev
```

Vai a `http://localhost:5173` e verifica che:

- ✅ Il carousel appare
- ✅ Auto-play funziona
- ✅ Click "Leggi di più" va a /news/:id
- ✅ Responsive su mobile/tablet/desktop

---

## 🎨 STYLING CUSTOMIZATION

### Cambia i colori

```jsx
// Background della sezione
<section className="bg-white">    {/* Change to bg-blue-50, etc */}

// Titolo
<h2 className="text-4xl font-bold text-gray-800">  {/* text-blue-900 */}
```

### Cambia spaziatura

```jsx
{/* Margini verticali */}
<section className="py-16">  {/* Change to py-8, py-24, etc */}

{/* Padding interno */}
<div className="px-4">      {/* Change to px-6, px-8, etc */}
```

### Aggiungi bordo/ombra

```jsx
<div className="rounded-xl shadow-xl border border-gray-200">
  <NewsSlider limit={6} />
</div>
```

---

## 📱 RESPONSIVE CONSIDERATIONS

Il NewsSlider è già fully responsive:

- 📱 **Mobile** (< 640px):

  - Slider height: 24rem (h-96)
  - Single-column layout
  - Touch-friendly buttons

- 📱 **Tablet** (640px - 1024px):

  - Slider height: 28rem (h-[500px] visible on md+)
  - Better spacing

- 🖥️ **Desktop** (> 1024px):
  - Full height carousel
  - Visible hover effects
  - Optimal viewing

---

## 🔧 ADVANCED CUSTOMIZATION

### Disabilitare Auto-play

Se non vuoi il carousel auto-play, modifica NewsSlider.jsx:

```javascript
// Line ~23, change from:
const [autoPlay, setAutoPlay] = useState(true);

// To:
const [autoPlay, setAutoPlay] = useState(false);
```

### Cambiare velocità auto-play

NewsSlider.jsx, line ~31:

```javascript
// Change from 5000 (5 secondi) to:
setInterval(() => {
  setCurrentIndex((prev) => (prev + 1) % newsItems.length);
}, 3000); // 3 secondi
```

### Cambiare numero di items

```jsx
<NewsSlider limit={3} />   // Solo 3 notizie
<NewsSlider limit={20} />  // Fino a 20 notizie
```

---

## 🎯 PLACEMENT OPTIONS

### Option 1: Dopo Hero Section ✅ (Consigliato)

```
Header
Hero Section
┌─────────────────┐
│   NewsSlider    │ ← Attrae attenzione
└─────────────────┘
Events Section
CTA Section
```

### Option 2: Prima di Events

```
Header
┌─────────────────┐
│   NewsSlider    │
└─────────────────┘
Events Section
CTA Section
```

### Option 3: In Sidebar (se ha layout)

```
Main Content    │  Sidebar
┌──────────┐   │ ┌──────────┐
│  Content │   │ │  Slider  │
│          │   │ │  (small) │
└──────────┘   │ └──────────┘
```

---

## 🐛 COMMON ISSUES & FIXES

### Carousel non appare

**Problem**: NewsSlider renderizza ma non mostra notizie

**Solution**:

1. Verifica che API è running: `curl http://localhost:5000/api/v1/news`
2. Controlla browser console per errori
3. Verifica che notizie.js ha almeno 1 item
4. Ricarica la pagina (Ctrl+R)

### Auto-play non funziona

**Problem**: Il carousel non cambia slide automaticamente

**Solution**:

1. Verifica `autoPlay` state in NewsSlider.jsx
2. Controlla che non è disabilitato al mouse hover
3. Verifica interval non è clearato
4. Check newsItems.length > 1

### Click "Leggi di più" non naviga

**Problem**: Button non redirige a /news/:id

**Solution**:

1. Verifica che useNavigate è importato in NewsSlider
2. Controlla che id/news.\_id esiste in data
3. Verifica che /news/:id route è definita in App.jsx
4. Check browser console per routing errors

### Immagini non caricate

**Problem**: Carousel mostra placeholder invece di immagini

**Solution**:

1. Verifica che news items hanno `image` field
2. Check che image URLs sono valide
3. Se immagini locali, assicurati siano in public/
4. Controlla CORS settings se immagini esterne

---

## ✅ FINAL CHECKLIST

Prima di "go live":

- [ ] NewsSlider importato in Body.jsx
- [ ] Carousel appare nella homepage
- [ ] Auto-play funziona
- [ ] Click buttons navigano correttamente
- [ ] Responsive su mobile/tablet/desktop
- [ ] Nessun errore in console
- [ ] Immagini caricate correttamente
- [ ] News items hanno categorie
- [ ] Back button funziona da detail page
- [ ] Related news suggerite

---

## 🚀 DEPLOYMENT

Una volta testato localmente:

```bash
npm run build
# Deploy dist/ al server
# Verifica https://adsgmdr.it → NewsSlider visible
```

---

**Example Repo**: See NEWS_REFACTORING_SUMMARY.md for full integration info

Created: January 12, 2025
