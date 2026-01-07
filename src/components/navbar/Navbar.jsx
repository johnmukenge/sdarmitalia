import { useState } from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai"; // Icone per menu mobile
import {
  Home,
  Newspaper,
  Calendar,
  Mic2,
  BookOpen,
  Users,
  Building2,
  Mail,
  Heart,
} from "lucide-react"; // Icone per menu
import logo from "../../assets/logo.png"; // Logo del sito

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-blue-950 text-white p-0.5 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <NavLink to="/" className="flex-shrink-0">
          <img src={logo} alt="Logo" className="h-12 auto" />
        </NavLink>

        {/* Menu desktop */}
        <ul className="hidden md:flex space-x-1">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-300 flex items-center gap-1 px-3 py-2 rounded"
                  : "hover:text-blue-300 flex items-center gap-1 px-3 py-2 rounded hover:bg-blue-900 transition"
              }
            >
              <Home size={18} />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/news"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-300 flex items-center gap-1 px-3 py-2 rounded"
                  : "hover:text-blue-300 flex items-center gap-1 px-3 py-2 rounded hover:bg-blue-900 transition"
              }
            >
              <Newspaper size={18} />
              News
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/eventi"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-300 flex items-center gap-1 px-3 py-2 rounded"
                  : "hover:text-blue-300 flex items-center gap-1 px-3 py-2 rounded hover:bg-blue-900 transition"
              }
            >
              <Calendar size={18} />
              Eventi
            </NavLink>
          </li>
          {/*<li>
            <NavLink
              to="/sermons"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-300 flex items-center gap-1 px-3 py-2 rounded"
                  : "hover:text-blue-300 flex items-center gap-1 px-3 py-2 rounded hover:bg-blue-900 transition"
              }
            >
              <Mic2 size={18} />
              Prediche
            </NavLink>
          </li>*/}
          <li>
            <NavLink
              to="/biblioteca"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-300 flex items-center gap-1 px-3 py-2 rounded"
                  : "hover:text-blue-300 flex items-center gap-1 px-3 py-2 rounded hover:bg-blue-900 transition"
              }
            >
              <BookOpen size={18} />
              Biblioteca
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/la-nostra-storia"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-300 flex items-center gap-1 px-3 py-2 rounded"
                  : "hover:text-blue-300 flex items-center gap-1 px-3 py-2 rounded hover:bg-blue-900 transition"
              }
            >
              <Users size={18} />
              Chi siamo
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/nuova-sede"
              className={({ isActive }) =>
                isActive
                  ? "text-green-300 font-bold flex items-center gap-1 px-3 py-2 rounded"
                  : "hover:text-green-300 flex items-center gap-1 px-3 py-2 rounded hover:bg-blue-900 transition"
              }
            >
              <Building2 size={18} />
              Nuova Sede
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-300 flex items-center gap-1 px-3 py-2 rounded"
                  : "hover:text-blue-300 flex items-center gap-1 px-3 py-2 rounded hover:bg-blue-900 transition"
              }
            >
              <Mail size={18} />
              Contatti
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/donazione"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-300 flex items-center gap-1 px-3 py-2 rounded"
                  : "hover:text-blue-300 flex items-center gap-1 px-3 py-2 rounded hover:bg-blue-900 transition"
              }
            >
              <Heart size={18} />
              Donazione
            </NavLink>
          </li>
        </ul>

        {/* Menu mobile */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
        </button>
      </div>

      {/* Dropdown mobile */}
      {isOpen && (
        <ul className="md:hidden bg-gray-700 flex flex-col space-y-0 p-2">
          <li>
            <NavLink
              to="/"
              className="flex items-center gap-3 px-4 py-3 rounded hover:bg-gray-600 transition"
              onClick={() => setIsOpen(false)}
            >
              <Home size={20} />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/lezioni-scuola-sabbatica"
              className="flex items-center gap-3 px-4 py-3 rounded hover:bg-gray-600 transition"
              onClick={() => setIsOpen(false)}
            >
              <BookOpen size={20} />
              Scuola Sabatica
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/news"
              className="flex items-center gap-3 px-4 py-3 rounded hover:bg-gray-600 transition"
              onClick={() => setIsOpen(false)}
            >
              <Newspaper size={20} />
              News
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/sermons"
              className="flex items-center gap-3 px-4 py-3 rounded hover:bg-gray-600 transition"
              onClick={() => setIsOpen(false)}
            >
              <Mic2 size={20} />
              Prediche
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/biblioteca"
              className="flex items-center gap-3 px-4 py-3 rounded hover:bg-gray-600 transition"
              onClick={() => setIsOpen(false)}
            >
              <BookOpen size={20} />
              Biblioteca
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/nuova-sede"
              className="flex items-center gap-3 px-4 py-3 rounded text-green-300 font-bold hover:bg-gray-600 transition"
              onClick={() => setIsOpen(false)}
            >
              <Building2 size={20} />
              Nuova Sede
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className="flex items-center gap-3 px-4 py-3 rounded hover:bg-gray-600 transition"
              onClick={() => setIsOpen(false)}
            >
              <Mail size={20} />
              Contatti
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/donazione"
              className="flex items-center gap-3 px-4 py-3 rounded hover:bg-gray-600 transition"
              onClick={() => setIsOpen(false)}
            >
              <Heart size={20} />
              Donazione
            </NavLink>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
