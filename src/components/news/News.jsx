import Navbar from "../navbar/Navbar"

function Header() {
  return (
    <div>
      <Navbar />
      <header className="header bg-cover bg-center h-screen">
        <div className="flex items-center justify-center h-full">
          <h1 className="text-white text-4xl">Avventisti del Settimo Giorno Movimento di Riforma</h1>
        </div>
      </header>
    </div>
  )
}

export default Header
