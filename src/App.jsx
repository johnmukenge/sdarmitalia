import Articles from "./components/articles/Articles"
import Background from "./components/background/Background"
import BibleStudy from "./components/biblestudy/BibleStudy"
import Contact from "./components/contact/Contact"
import Footer from "./components/footer/Footer"
import Header from "./components/header/Header"
import Navbar from "./components/navbar/Navbar"
import News from "./components/news/News"
import SabbathSchool from "./components/sabbathschool/SabbathSchool"
import Sermons from "./components/sermons/Sermons"

function App() {

  return (
    <>
      <div className="my-0 py-0">
        <Navbar />
        <Header />
        <SabbathSchool />
        <News />
        <Contact />
        <Sermons />
        <BibleStudy />
        <Articles />
        <Footer />
      </div>
    </>
  )
}

export default App
