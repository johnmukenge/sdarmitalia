import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Articles from "./components/articles/Articles";
import BibleStudy from "./components/biblestudy/BibleStudy";
import Contact from "./components/contact/Contact";
import News from "./components/news/News";
import SabbathSchool from "./components/sabbathschool/SabbathSchool";
import Sermons from "./components/sermons/Sermons";
import Event from "./components/events/Event";
import Donazioni from "./components/donazioni/Donazioni";
import Body from "./components/body/Body";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Body />} />
          <Route path="/lezioni-scuola-sabbatica" element={<SabbathSchool />} />
          <Route path="/news" element={<News />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/donazione" element={<Donazioni />} />
          <Route path="/sermons" element={<Sermons />} />
          <Route path="/richiedi-studi-biblici" element={<BibleStudy />} />
          <Route path="/articoli" element={<Articles />} />
          <Route path="/eventi" element={<Event />} />
          <Route path="/donazioni" element={<Donazioni />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
