import React from 'react';

const Footer = () => {
  return (
    <footer className="p-8 bg-gray-800 text-white">
      <div className="flex justify-between">
        <div>
          <h3 className="text-lg font-bold">Social</h3>
          {/* Link ai social */}
        </div>
        <div>
          <h3 className="text-lg font-bold">News</h3>
          {/* Link alle news */}
        </div>
        <div>
          <h3 className="text-lg font-bold">About Us</h3>
          {/* Link alla pagina About Us */}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
