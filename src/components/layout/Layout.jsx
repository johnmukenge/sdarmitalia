import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar /> {/* Navbar fissa */}
      <main className="flex-grow"> {/* Contenuto dinamico */}
        <Outlet />
      </main>
      <Footer /> {/* Footer sempre visibile */}
    </div>
  );
};

export default Layout;