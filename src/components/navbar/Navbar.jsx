import { useState } from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai"; // Icone per menu mobile
import logo from "../../assets/adsgmdr.svg"; // Logo del sito

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-madison-750 text-white p-4 z-50">
      <div className="container mx-auto flex justify-between items-center">
        
        {/* Logo */}
        <NavLink to="/">
          <img src={logo} alt="Logo" className="h-20 w-30" />
        </NavLink>

        {/* Menu desktop */}
        <ul className="hidden md:flex space-x-4">
          <li><NavLink to="/" className={({ isActive }) => isActive ? "text-blue-300" : "hover:text-blue-300"}>Home</NavLink></li>
          <li><NavLink to="/news" className={({ isActive }) => isActive ? "text-blue-300" : "hover:text-blue-300"}>News</NavLink></li>
          <li><NavLink to="/eventi" className={({ isActive }) => isActive ? "text-blue-300" : "hover:text-blue-300"}>Eventi</NavLink></li>
          <li><NavLink to="/lezioni-scuola-sabbatica" className={({ isActive }) => isActive ? "text-blue-300" : "hover:text-blue-300"}>Scuola Sabatica</NavLink></li>
          <li><NavLink to="/sermons" className={({ isActive }) => isActive ? "text-blue-300" : "hover:text-blue-300"}>Prediche</NavLink></li>
          <li><NavLink to="/contact" className={({ isActive }) => isActive ? "text-blue-300" : "hover:text-blue-300"}>Contatti</NavLink></li>
          <li><NavLink to="/donazione" className={({ isActive }) => isActive ? "text-blue-300" : "hover:text-blue-300"}>Donazione</NavLink></li>
        </ul>

        {/* Menu mobile */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
        </button>
      </div>

      {/* Dropdown mobile */}
      {isOpen && (
        <ul className="md:hidden bg-gray-700 flex flex-col space-y-2 p-4">
          <li><NavLink to="/" className="block py-2" onClick={() => setIsOpen(false)}>Home</NavLink></li>
          <li><NavLink to="/lezioni-scuola-sabbatica" className="block py-2" onClick={() => setIsOpen(false)}>Scuola Sabatica</NavLink></li>
          <li><NavLink to="/news" className="block py-2" onClick={() => setIsOpen(false)}>News</NavLink></li>
          <li><NavLink to="/sermons" className="block py-2" onClick={() => setIsOpen(false)}>Prediche</NavLink></li>
          <li><NavLink to="/contact" className="block py-2" onClick={() => setIsOpen(false)}>Contatti</NavLink></li>
          <li><NavLink to="/donazione" className="block py-2" onClick={() => setIsOpen(false)}>Donazione</NavLink></li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;