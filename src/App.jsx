import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Articles from "./components/articles/Articles";
import BibleStudy from "./components/biblestudy/BibleStudy";
import Contact from "./components/contact/Contact";
import News from "./components/news/News";
import SabbathSchool from "./components/sabbathschool/SabbathSchool";
import Sermons from "./components/sermons/Sermons";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<News />} />
          <Route path="/sabbathschool" element={<SabbathSchool />} />
          <Route path="/news" element={<News />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/sermons" element={<Sermons />} />
          <Route path="/biblestudy" element={<BibleStudy />} />
          <Route path="/articles" element={<Articles />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
