# 🏗️ PROGETTAZIONE ARCHITETTONICA - SDA ITALIA DIGITAL PLATFORM

## Executive Summary

**SDA Italia** è una piattaforma web moderna basata su architettura **client-server** che fornisce contenuti religiosi, educativi e informativi con funzionalità avanzate di streaming, e-commerce (donazioni) e gestione comunità.

---

## 1. PANORAMA ARCHITETTURALE GENERALE

```
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND (React 18+)                      │
│                    Vite Development Server                       │
│              http://localhost:5173 (Development)                 │
├─────────────────────────────────────────────────────────────────┤
│                          API Gateway                              │
│                  Proxy: /api → Backend                           │
│                   http://localhost:5000                          │
├─────────────────────────────────────────────────────────────────┤
│                    BACKEND (Node.js/Express)                     │
│                    http://localhost:5000                         │
│                      Express.js Framework                        │
│                  RESTful API Endpoints                           │
├─────────────────────────────────────────────────────────────────┤
│                      DATA LAYER                                   │
│                   MongoDB Database                               │
│              (Connection: MongoDB Atlas/Local)                   │
├─────────────────────────────────────────────────────────────────┤
│                  PAYMENT SERVICE                                  │
│                    Stripe Integration                            │
│              (Donazioni & Premium Features)                      │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. ARCHITETTURA FRONTEND (SDA Italia - React)

### 2.1 Stack Tecnologico

```
React 18.3.1          → UI Framework & Components
Vite 6.0.5            → Build Tool & Dev Server
React Router 7.1.4    → Client-side Routing
Tailwind CSS 3.4.17   → Utility-first Styling
Lucide React 0.562.0  → Modern Icon Library
Axios 1.8.4           → HTTP Client
Stripe React 5.4.1    → Payment Processing
```

### 2.2 Struttura Directory

```
sdarmitalia/
├── public/                       # Assets statici
├── src/
│   ├── App.jsx                   # Router principale
│   ├── main.jsx                  # Entry point
│   ├── index.css                 # Global styles
│   ├── components/               # Componenti React modulari
│   │   ├── navbar/               # Navigazione principale
│   │   │   └── Navbar.jsx        # Header con menu iconico
│   │   ├── header/               # Sezione hero
│   │   ├── body/                 # Contenuto principale
│   │   ├── footer/               # Footer globale
│   │   ├── layout/               # Layout wrapper
│   │   ├── articles/             # 📰 Sistema Articoli
│   │   │   ├── Articles.jsx      # Lista con filtri
│   │   │   ├── ArticleDetail.jsx # Dettaglio articolo
│   │   │   └── ArticleCard.jsx   # Card componente
│   │   ├── biblioteca/           # 📚 DIGITAL LIBRARY (NUOVO!)
│   │   │   ├── Biblioteca.jsx    # Pagina principale
│   │   │   ├── LibroCard.jsx     # Card libro
│   │   │   ├── LettoreLibro.jsx  # Online reader + TTS
│   │   │   └── IntegrationComponents.jsx # Widget vari
│   │   ├── news/                 # 🔔 Sistema Notizie
│   │   │   ├── News.jsx          # Feed notizie
│   │   │   └── NewsDetails.jsx   # Dettaglio notizia
│   │   ├── sermons/              # 🎙️ Prediche
│   │   ├── sabbathschool/        # 📖 Scuola Sabatica
│   │   ├── events/               # 📅 Eventi
│   │   ├── donazioni/            # 💳 Donazioni (Stripe)
│   │   ├── contact/              # 📧 Contatti
│   │   ├── chisiamo/             # 🏢 Chi Siamo
│   │   ├── newcampus/            # 🏗️ Nuova Sede
│   │   └── biblestudy/           # 🙏 Studi Biblici
│   ├── config/
│   │   └── articlesConfig.js     # Configurazioni
│   ├── data/                     # Mock data & seed
│   │   ├── libri.js              # 📚 Database libri
│   │   ├── articoli.js
│   │   ├── news.js
│   │   ├── sermons.js
│   │   └── lezioni.js
│   ├── styles/
│   │   ├── articles.css
│   │   └── biblioteca.css        # Stili per biblioteca
│   └── utils/                    # Utility functions
│       ├── articleHelpers.js
│       ├── articlesBackendIntegration.js
│       ├── bibliotecaDebug.js    # Testing utilities
│       └── speech.js             # Web Speech API
├── vite.config.js                # Configurazione Vite + Proxy
├── tailwind.config.js            # Tailwind config
├── postcss.config.js             # PostCSS config
└── package.json
```

### 2.3 Principi Architetturali Frontend

#### **MVC Components Pattern**

```jsx
// Model: State management (useState, useContext)
const [libri, setLibri] = useState([]);

// View: JSX rendering
return <div className="grid">...</div>;

// Controller: Event handlers & logic
const handleTtsClick = (libro) => {
  /* logic */
};
```

#### **Routing Structure**

```javascript
Routes:
/                           → Home (Body.jsx)
/biblioteca                 → Digital Library (Biblioteca.jsx)
/biblioteca/:id            → Book Reader (LettoreLibro.jsx)
/articoli                  → Articles (Articles.jsx)
/articoli/:id              → Article Detail (ArticleDetail.jsx)
/news                      → News Feed (News.jsx)
/news/:id                  → News Detail (NewsDetails.jsx)
/sermons                   → Sermons (Sermons.jsx)
/lezioni-scuola-sabbatica  → Sabbath School (SabbathSchool.jsx)
/events                    → Events (Event.jsx)
/donazione                 → Donation Form (Donazioni.jsx)
/contact                   → Contact (Contact.jsx)
/chiSiamo                  → About (NostraStoria.jsx)
/nuova-sede                → New Campus (NewCampus.jsx)
```

#### **Design System**

```css
Colors:
- Primary: #2563eb (blue-600)   /* Buttons, links, accents */
- Dark Primary: #1e3a8a (blue-950)  /* Nav, dark buttons */
- Secondary: #16a34a (green-600)    /* Highlights, CTAs */
- Background: #f3f4f6 (gray-100)   /* Page backgrounds */
- Text: #1f2937 (gray-800)         /* Main text */

Typography:
- Headers: Tailwind default (font-bold)
- Body: Tailwind default (font-normal)
- Small: Tailwind text-sm

Spacing:
- Container max-width: 1280px
- Gap units: Tailwind spacing scale (4px base)
- Padding: Responsive (p-4 mobile, p-8 desktop)
```

---

## 3. ARCHITETTURA BACKEND (Node.js/Express)

### 3.1 Stack Tecnologico

```
Node.js + Express 4.22.1  → Server Framework
MongoDB 8.12.1            → NoSQL Database
Mongoose 8.12.1           → ODM (Object Data Modeling)
Stripe 20.1.0             → Payment API
CORS 2.8.5                → Cross-Origin Resource Sharing
Morgan 1.10.0             → HTTP Request Logger
Nodemon 3.1.9             → Development Auto-reload
```

### 3.2 Struttura Backend

```
sdarmitalia-server/
├── index.js              # Express app configuration
├── server.js             # Server initialization & MongoDB connection
├── config.env            # Environment variables
├── models/               # Mongoose schemas
│   ├── newsModel.js
│   ├── contactModel.js
│   ├── conferenzaModel.js
│   ├── eventiModel.js
│   └── articlesModel.js
├── routes/               # API endpoints
│   ├── newsRoutes.js     # GET /api/news, POST, DELETE, etc.
│   ├── contactRoutes.js  # POST /api/contact
│   ├── conferenzaRoutes.js
│   └── eventsRoutes.js
├── controller/           # Business logic handlers
│   ├── newsController.js
│   ├── contactController.js
│   ├── conferenzaController.js
│   └── eventsController.js
├── utils/                # Helper functions
│   └── apiFeatures.js    # Filtering, sorting, pagination
├── data/                 # Seed scripts
│   └── data-seed/
│       └── seedNews.js
└── package.json
```

### 3.3 RESTful API Endpoints

#### **NEWS Module**

```
GET    /api/news              → List all news (with pagination, filters)
GET    /api/news/:id          → Get single news detail
POST   /api/news              → Create news (Admin)
PATCH  /api/news/:id          → Update news (Admin)
DELETE /api/news/:id          → Delete news (Admin)
```

#### **CONTACT Module**

```
GET    /api/contact           → List all contacts (Admin)
POST   /api/contact           → Submit contact form
GET    /api/contact/:id       → Get contact detail
DELETE /api/contact/:id       → Delete contact (Admin)
```

#### **CONFERENCES Module**

```
GET    /api/conferenza        → List all conferences
GET    /api/conferenza/:id    → Get conference detail
POST   /api/conferenza        → Create conference (Admin)
PATCH  /api/conferenza/:id    → Update conference (Admin)
DELETE /api/conferenza/:id    → Delete conference (Admin)
```

#### **EVENTS Module**

```
GET    /api/events            → List all events (with filters)
GET    /api/events/:id        → Get event detail
POST   /api/events            → Create event (Admin)
PATCH  /api/events/:id        → Update event (Admin)
DELETE /api/events/:id        → Delete event (Admin)
```

#### **FUTURE: ARTICLES Module (Frontend-ready)**

```
GET    /api/articles          → List articles
GET    /api/articles/:id      → Get article detail
POST   /api/articles          → Create article (Admin)
PATCH  /api/articles/:id      → Update article (Admin)
DELETE /api/articles/:id      → Delete article (Admin)
```

#### **FUTURE: BIBLIOTECA Module (Planned)**

```
GET    /api/libri             → List books
GET    /api/libri/:id         → Get book detail + content
POST   /api/libri             → Create book (Admin)
PATCH  /api/libri/:id         → Update book (Admin)
DELETE /api/libri/:id         → Delete book (Admin)
GET    /api/libri/:id/content → Get full book content
```

### 3.4 Data Models (Mongoose Schemas)

#### **News Model**

```javascript
{
  _id: ObjectId;
  title: String(required);
  subtitle: String;
  content: String(required);
  image: String(URL);
  youtubeId: String;
  author: String;
  category: String;
  tags: [String];
  publishedAt: Date;
  updatedAt: Date;
  views: Number;
  featured: Boolean;
}
```

#### **Contact Model**

```javascript
{
  _id: ObjectId
  nome: String (required)
  email: String (required)
  telefono: String
  messaggio: String (required)
  tipoMessaggio: String (enum: ['informazione', 'problema', 'suggerimento'])
  status: String (enum: ['new', 'read', 'replied', 'archived'])
  createdAt: Date
  rispostaAdmin: String
}
```

#### **Event Model**

```javascript
{
  _id: ObjectId;
  title: String(required);
  description: String;
  startDate: Date(required);
  endDate: Date;
  location: String;
  image: String;
  category: String;
  capacity: Number;
  registrations: [ObjectId];
  createdAt: Date;
}
```

#### **Article Model**

```javascript
{
  _id: ObjectId;
  title: String(required);
  author: String;
  content: String(required);
  image: String;
  category: String;
  tags: [String];
  publishedAt: Date;
  viewCount: Number;
}
```

### 3.5 Middleware Stack

```javascript
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON requests
app.use(morgan("dev")); // Log HTTP requests
app.use((req, res, next) => {
  req.requestTime = new Date(); // Add request timestamp
  next();
});
```

---

## 4. DATABASE ARCHITECTURE (MongoDB)

### 4.1 Schema Overview

```
MongoDB Database: sdarmitalia (or sdarmitalia_prod)
│
├── Collection: news
│   └── Documents: [news_1, news_2, ..., news_n]
│
├── Collection: contacts
│   └── Documents: [contact_1, contact_2, ..., contact_n]
│
├── Collection: events
│   └── Documents: [event_1, event_2, ..., event_n]
│
├── Collection: conferences
│   └── Documents: [conf_1, conf_2, ..., conf_n]
│
├── Collection: articles
│   └── Documents: [article_1, article_2, ..., article_n]
│
└── Collection: libri (FUTURE - Digital Library)
    └── Documents: [book_1, book_2, ..., book_n]
```

### 4.2 Indexing Strategy

```javascript
// Performance optimization indices:
db.news.createIndex({ publishedAt: -1 }); // Sort by date
db.news.createIndex({ category: 1 }); // Filter by category
db.news.createIndex({ title: "text" }); // Full-text search
db.contacts.createIndex({ email: 1 }); // Unique emails
db.events.createIndex({ startDate: 1 }); // Date filtering
db.events.createIndex({ location: 1 }); // Location search
```

---

## 5. INTEGRATION POINTS

### 5.1 Frontend ↔ Backend Communication

```
FRONTEND (http://localhost:5173)
          │
          ├─ Axios HTTP Client
          │
          ▼
VITE PROXY (/api → http://localhost:5000)
          │
          ▼
BACKEND EXPRESS API (http://localhost:5000)
          │
          ├─ Route Handlers
          ├─ Business Logic (Controllers)
          │
          ▼
MONGODB (MongoDB Atlas or Local)
```

### 5.2 API Request/Response Pattern

```javascript
// Frontend Request
const fetchNews = async () => {
  const response = await axios.get('/api/news');
  return response.data;
};

// Backend Response
{
  "success": true,
  "count": 10,
  "data": [
    {
      "_id": "...",
      "title": "Notizia 1",
      "content": "...",
      "publishedAt": "2024-01-07T..."
    },
    ...
  ]
}
```

### 5.3 Stripe Payment Integration

```
Frontend (Donation Form)
    │
    ├─ Stripe React Elements
    ├─ @stripe/react-stripe-js
    │
    ▼
Payment Processing
    │
    ├─ Secure card tokenization (Stripe handles PCI)
    ├─ Amount validation
    │
    ▼
Backend Stripe API
    │
    ├─ Create Charge / Payment Intent
    ├─ Validate amount & token
    ├─ Log transaction
    │
    ▼
Database
    │
    └─ Store donation record
```

---

## 6. SECURITY ARCHITECTURE

### 6.1 Frontend Security

```
✓ HTTPS-only in production
✓ XSS Prevention (React auto-escapes)
✓ CSRF tokens (via secure HTTP-only cookies)
✓ Input validation (form validation before send)
✓ Environment variables (API endpoints)
```

### 6.2 Backend Security

```
✓ CORS Configuration (Whitelist allowed origins)
✓ Input Validation & Sanitization
✓ Rate Limiting (prevent brute force)
✓ Authentication (JWT tokens - FUTURE)
✓ Authorization (role-based access)
✓ SQL/NoSQL Injection prevention (Mongoose ORM)
✓ Environment variables (.env file)
✓ HTTPS in production
```

### 6.3 API Security Headers

```javascript
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  next();
});
```

---

## 7. DEPLOYMENT ARCHITECTURE

### 7.1 Development Environment

```
Local Machine:
├── Frontend: npm run dev (Vite)           → http://localhost:5173
├── Backend:  npm start (Nodemon)          → http://localhost:5000
└── Database: MongoDB Local or Atlas
```

### 7.2 Production Environment (Recommended)

```
                    ┌─────────────────┐
                    │   CDN (Images)  │
                    └────────┬────────┘
                             │
    ┌────────────────────────┼────────────────────────┐
    │                        │                        │
┌───▼────┐            ┌──────▼──────┐        ┌──────▼──────┐
│ Vercel │            │  Netlify    │        │   AWS S3    │
│ (React)│            │   (React)   │        │  (Static)   │
└────────┘            └─────────────┘        └─────────────┘
    │                        │                        │
    └────────────────────────┼────────────────────────┘
                             │
                      ┌──────▼──────┐
                      │   API Layer │
                      │  (Reverse   │
                      │   Proxy)    │
                      └──────┬──────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
    ┌───▼────┐          ┌────▼────┐         ┌───▼────┐
    │ Railway │          │  Render │         │ Heroku │
    │ (Node.js)         │(Node.js) │         │(Node.js)
    └─────────┘         └──────────┘        └────────┘
        │                    │                    │
        └────────────────────┼────────────────────┘
                             │
                      ┌──────▼──────────┐
                      │  MongoDB Atlas  │
                      │   (Cloud DB)    │
                      └─────────────────┘
```

---

## 8. FEATURE MODULES BREAKDOWN

### 8.1 Implemented Modules

| Module                 | Status      | Frontend          | Backend               | DB         | Features                     |
| ---------------------- | ----------- | ----------------- | --------------------- | ---------- | ---------------------------- |
| **Home**               | ✅ Complete | Body.jsx          | N/A                   | N/A        | Hero, cards, carousel        |
| **Articles**           | ✅ Complete | Articles.jsx      | articleRoutes         | ✅         | List, filter, search, detail |
| **News**               | ✅ Complete | News.jsx          | newsRoutes            | ✅         | Feed, sorting, sharing       |
| **Sermons**            | ✅ Complete | Sermons.jsx       | N/A                   | N/A        | Video embed                  |
| **Sabbath School**     | ✅ Complete | SabbathSchool.jsx | N/A                   | N/A        | Lessons, TTS                 |
| **Events**             | ✅ Complete | Event.jsx         | eventRoutes           | ✅         | Calendar, registration       |
| **📚 Digital Library** | ✅ Complete | Biblioteca.jsx    | ⏳ Planned            | ⏳ Planned | Online reader, TTS, download |
| **Donazioni**          | ✅ Complete | Donazioni.jsx     | ⏳ Integration needed | ⏳ Planned | Stripe payment, receipt      |
| **Contact**            | ✅ Complete | Contact.jsx       | contactRoutes         | ✅         | Form submission, CRM         |
| **Chi Siamo**          | ✅ Complete | NostraStoria.jsx  | N/A                   | N/A        | About, PDF downloads         |
| **Nuova Sede**         | ✅ Complete | NewCampus.jsx     | N/A                   | N/A        | Project info, funding        |

### 8.2 Core Digital Library Features

```
Biblioteca Module:
├── Online Reading (React component)
│   └─ Full book display with pagination
├── Text-to-Speech (Web Speech API)
│   ├─ Read aloud functionality
│   └─ Speed & voice controls
├── Dark Mode
│   └─ Eye-friendly reading
├── Text Sizing (4 levels)
│   └─ Accessibility
├── Download (PDF/EPUB)
│   └─ Offline reading
├── Advanced Filters
│   ├─ Category filtering
│   ├─ Publication year range
│   ├─ Children's books toggle
│   └─ Sorting options
├── Real-time Search
│   ├─ Title search
│   ├─ Author search
│   └─ Description search
└── Book Metadata
    ├─ Rating system
    ├─ Download statistics
    ├─ Reader reviews
    └─ Recommendations
```

---

## 9. SCALABILITY & PERFORMANCE

### 9.1 Frontend Optimization

```
✓ Code Splitting (Vite dynamic imports)
✓ Lazy Loading (React.lazy + Suspense)
✓ Image Optimization (Responsive, WebP)
✓ CSS Minification (Tailwind production build)
✓ Bundle Analysis (rollup-plugin-visualizer)
✓ Caching Strategy (Service Workers - FUTURE)
```

### 9.2 Backend Optimization

```
✓ Database Indexing (on frequently queried fields)
✓ Pagination (limit results per request)
✓ Caching (Redis - FUTURE)
✓ Connection Pooling (MongoDB)
✓ Compression (gzip middleware)
✓ Load Balancing (Multiple instances - FUTURE)
```

### 9.3 Database Optimization

```
✓ Indexing Strategy (covered indices)
✓ Query Optimization (lean() for read-only)
✓ Aggregation Pipeline (complex queries)
✓ TTL Indices (auto-delete old data)
✓ Sharding (horizontal scaling - FUTURE)
```

---

## 10. DEVELOPMENT WORKFLOW

### 10.1 Development Stack

```bash
# Frontend Development
cd sdarmitalia
npm install
npm run dev                    # Starts on http://localhost:5173

# Backend Development
cd sdarmitalia-server
npm install
npm start                      # Starts on http://localhost:5000 (with Nodemon)

# Testing
npm run lint                   # ESLint
npm run build                  # Production build
```

### 10.2 Git Workflow

```
main (production)
    ↑
    ├─ develop (staging)
    │   ↑
    │   └─ feature/* (feature branches)
    │       ├─ feature/digital-library ✅ MERGED
    │       ├─ feature/payment-integration (In Progress)
    │       ├─ feature/user-auth (Planned)
    │       └─ feature/admin-dashboard (Planned)
```

---

## 11. FUTURE ENHANCEMENTS

### 11.1 Immediate Roadmap (Q1 2026)

```
Phase 1: Backend Integration
└─ ✅ Connect Biblioteca to MongoDB
└─ ✅ Create /api/libri endpoints
└─ Implement book content streaming

Phase 2: User Authentication
└─ JWT-based authentication
└─ User profiles & preferences
└─ Bookmarks & reading history

Phase 3: Admin Dashboard
└─ Content management interface
└─ Analytics & reporting
└─ User management
```

### 11.2 Long-term Architecture (2026)

```
Advanced Features:
├─ Full-text search (Elasticsearch)
├─ Real-time notifications (WebSockets)
├─ Recommendation engine (ML)
├─ API rate limiting (Redis)
├─ Caching layer (Redis)
├─ CDN integration (CloudFlare)
├─ Microservices (Payment, Analytics, etc.)
├─ Message queue (RabbitMQ)
└─ Monitoring & logging (ELK Stack)

Infrastructure:
├─ Containerization (Docker)
├─ Orchestration (Kubernetes)
├─ CI/CD Pipeline (GitHub Actions)
├─ Infrastructure as Code (Terraform)
├─ Multi-region deployment
└─ Disaster recovery planning
```

---

## 12. TECHNOLOGY DECISION MATRIX

| Layer                 | Technology   | Rationale                              | Alternatives             |
| --------------------- | ------------ | -------------------------------------- | ------------------------ |
| **UI Framework**      | React 18     | Component reusability, large ecosystem | Vue, Svelte              |
| **Build Tool**        | Vite         | Fast development, modern ES modules    | Webpack, Parcel          |
| **Styling**           | Tailwind CSS | Rapid development, consistency         | Bootstrap, Material-UI   |
| **HTTP Client**       | Axios        | Promise-based, interceptors            | Fetch API, React Query   |
| **Backend Framework** | Express.js   | Lightweight, flexible, popular         | Fastify, Hapi            |
| **Database**          | MongoDB      | Document-flexible, scalable, BSON      | PostgreSQL, MySQL        |
| **ODM**               | Mongoose     | Schema validation, middleware hooks    | TypegooseORM, Waterline  |
| **Payment**           | Stripe       | Secure, reliable, multi-currency       | Square, PayPal           |
| **Icons**             | Lucide React | Modern, consistent, performant         | React Icons, FontAwesome |
| **Routing**           | React Router | Standard, powerful, nested routes      | TanStack Router, Next.js |

---

## 13. SYSTEM REQUIREMENTS

### 13.1 Development Environment

```
Node.js:     v16+ or v18+ (LTS)
npm:         v8+ or v9+
MongoDB:     v5+ (Local) or Atlas (Cloud)
Stripe:      Account with test keys
```

### 13.2 Production Environment

```
Hosting:     Cloud platform (Vercel, Netlify, Railway, Render)
Database:    MongoDB Atlas (managed cloud)
CDN:         CloudFlare or AWS CloudFront
SSL:         Let's Encrypt (automatic)
Monitoring:  Sentry, DataDog
```

---

## 14. CONTACT & SUPPORT ARCHITECTURE

### 14.1 Communication Flow

```
User Contact Form (Frontend)
    ↓
Validation & Sanitization
    ↓
HTTP POST /api/contact
    ↓
Backend Controller (Contact validation)
    ↓
MongoDB contacts collection
    ↓
Admin Notification (Email - FUTURE)
    ↓
CRM System (FUTURE)
```

### 14.2 Admin Interface (FUTURE)

```
Admin Dashboard (React)
    ├─ View all contacts
    ├─ Filter by status
    ├─ Reply to inquiries
    ├─ Export reports
    └─ Analytics
```

---

## 15. CONCLUSION

**SDA Italia** è costruita con un'architettura **moderna, scalabile e modulare** che separa chiaramente le responsabilità tra frontend e backend, permettendo:

✅ **Sviluppo parallelo** di frontend e backend
✅ **Scalabilità verticale e orizzontale**
✅ **Manutenibilità** e facilità di debug
✅ **Extensibilità** per nuove features
✅ **Sicurezza** con best practices
✅ **Performance** ottimizzata

L'architettura è pronta per l'evoluzione verso **microservizi**, **containerizzazione** e **deployment multi-region**.

---

## 📊 ARCHITECTURE VISUALIZATION

```
┌────────────────────────────────────────────────────────────────┐
│                     FRONTEND TIER (React)                      │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────────┐  │
│  │ Navbar   │ │ Articles │ │ Biblioteca│ │ News & Events    │  │
│  │ w/ Icons │ │ w/ Filters│ │ w/ TTS   │ │ w/ Sharing       │  │
│  └──────────┘ └──────────┘ └──────────┘ └──────────────────┘  │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────────┐  │
│  │ Contact  │ │Sabbath   │ │Sermons   │ │ Donations        │  │
│  │ Forms    │ │ School   │ │ (YouTube)│ │ (Stripe)         │  │
│  └──────────┘ └──────────┘ └──────────┘ └──────────────────┘  │
└────────────────────────────────────────────────────────────────┘
                            │ Axios
                            ↓ /api proxy
┌────────────────────────────────────────────────────────────────┐
│                    BACKEND TIER (Node.js)                      │
│  ┌────────────────────────────────────────────────────────┐   │
│  │ Express.js Server (Port 5000)                          │   │
│  ├────────────────────────────────────────────────────────┤   │
│  │ Routes:                                                │   │
│  │ • GET/POST /api/news     (newsController)            │   │
│  │ • GET/POST /api/contact  (contactController)         │   │
│  │ • GET/POST /api/events   (eventsController)          │   │
│  │ • GET/POST /api/libri    (bibliotecaController)      │   │
│  └────────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────────┘
                            │ Mongoose
                            ↓ ODM
┌────────────────────────────────────────────────────────────────┐
│                    DATABASE TIER (MongoDB)                     │
│  ┌──────────┬──────────┬──────────┬──────────┬──────────┐    │
│  │   news   │ contacts │  events  │ articles │  libri   │    │
│  │collection│collection│collection│collection│collection    │
│  └──────────┴──────────┴──────────┴──────────┴──────────┘    │
└────────────────────────────────────────────────────────────────┘
                            │
                            ↓ (FUTURE)
┌────────────────────────────────────────────────────────────────┐
│               EXTERNAL SERVICES (3rd Party APIs)               │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐     │
│  │  Stripe  │  │   Email  │  │  Slack   │  │ Analytics│     │
│  │ Payments │  │   (SMTP) │  │(Webhooks)│  │(Google)  │     │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘     │
└────────────────────────────────────────────────────────────────┘
```

---

**Documento creato:** 7 Gennaio 2026
**Versione:** 1.0
**Status:** Production Ready
