const Footer = () => {
  return (
    <footer className="p-8 bg-gray-800 text-white">
      <div className="flex justify-between">
        {/* Benvenuti */}
        <div>
          <h3 className="text-lg font-bold">Benvenuti</h3>
          <ul>
            <li><a href="/lezioni-scuola-sabbatica" className="text-gray-400 hover:text-white">Lezioni scuola sabbatica</a></li>
            <li><a href="/innario-cristiano" className="text-gray-400 hover:text-white">Innario cristiano</a></li>
            <li><a href="/trova-chiesa" className="text-gray-400 hover:text-white">Trova chiesa</a></li>
            <li><a href="/richiedi-preghiera" className="text-gray-400 hover:text-white">Richiedi preghiera</a></li>
            <li><a href="/contact" className="text-gray-400 hover:text-white">Richiedi studi biblici</a></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-bold">Social</h3>
          <ul>
            <li><a href="https://www.instagram.com/accounts/login/?next=https%3A%2F%2Fwww.instagram.com%2Fadsgmdritalia%2F%3Figsh%3DMW9wZzQ3OG5nZWVwcQ%253D%253D&is_from_rle" className="text-gray-400 hover:text-white">Instagram</a></li>
            <li><a href="https://www.facebook.com/" className="text-gray-400 hover:text-white">Facebook</a></li>
            <li><a href="https://twitter.com" className="text-gray-400 hover:text-white">Twitter</a></li>
          </ul>
        </div>

        {/* News */}
        <div>
          <h3 className="text-lg font-bold">News</h3>
          <ul>
            <li><a href="/news" className="text-gray-400 hover:text-white">Annunci ufficiali</a></li>
            <li><a href="/articoli" className="text-gray-400 hover:text-white">Articoli</a></li>
            <li><a href="/eventi" className="text-gray-400 hover:text-white">Eventi</a></li>
            <li><a href="/donazioni" className="text-gray-400 hover:text-white">Donazioni</a></li>
          </ul>
        </div>

        {/* Chi siamo */}
        <div>
          <h3 className="text-lg font-bold">Chi siamo</h3>
          <ul>
            <li><a href="/la-nostra-fede" className="text-gray-400 hover:text-white">La nostra fede</a></li>
            <li><a href="/cos-e-il-movimento-di-riforma" className="text-gray-400 hover:text-white">Cos&apos; è il movimento di riforma</a></li>
            <li><a href="/domande-frequenti" className="text-gray-400 hover:text-white">Domande frequenti</a></li>
            <li><a href="/contact" className="text-gray-400 hover:text-white">Contattaci</a></li>
          </ul>
        </div>
      </div>
      {/* Copyright Section */}
      <div className="mt-8 border-t pt-4 text-center text-sm text-gray-400">
        <p>Copyright © 2025 Avventista Del Settimo Giorno Movimento Di Riforma - Campo Italiano. Tutti i diritti riservati.</p>
      </div>
    </footer>
  );
}

export default Footer;
