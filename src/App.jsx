import { BrowserRouter, Route, Routes } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Layout from "./components/layout/Layout";
import Articles from "./components/articles/Articles";
import ArticleDetail from "./components/articles/ArticleDetail";
import BibleStudy from "./components/biblestudy/BibleStudy";
import Contact from "./components/contact/Contact";
import News from "./components/news/News";
import SabbathSchool from "./components/sabbathschool/SabbathSchool";
import Sermons from "./components/sermons/Sermons";
import Event from "./components/events/Event";
import EventDetail from "./components/events/EventDetail";
import Donazioni from "./components/donazioni/Donazioni";
import Body from "./components/body/Body";
import FindChurches from "./components/churches/FindChurches";
import Registrazione from "./components/contact/Registrazione";
import ChiSiamo from "./components/chisiamo/ChiSiamo";
import NostraStoria from "./components/chisiamo/NostraStoria";
import NewsDetails from "./components/news/NewsDetails";

// Carica Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

function App() {
  return (
    <Elements stripe={stripePromise}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Body />} />
            <Route
              path="/lezioni-scuola-sabbatica"
              element={<SabbathSchool />}
            />
            <Route path="/chi-siamo" element={<ChiSiamo />} />
            <Route path="/la-nostra-storia" element={<NostraStoria />} />
            <Route path="/news" element={<News />} />
            <Route path="/registration" element={<Registrazione />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/donazione" element={<Donazioni />} />
            <Route path="/sermons" element={<Sermons />} />
            <Route path="/trova-chiesa" element={<FindChurches />} />
            <Route path="/richiedi-studi-biblici" element={<BibleStudy />} />
            <Route path="/articoli" element={<Articles />} />
            <Route path="/articoli/:id" element={<ArticleDetail />} />
            <Route path="/eventi" element={<Event />} />
            <Route path="/eventi/:id" element={<EventDetail />} />
            <Route path="/donazioni" element={<Donazioni />} />
            <Route path="/news/:id" element={<NewsDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Elements>
  );
}

export default App;
