import React from 'react';
import phoneImage from '../../assets/instagram.jpg';

const Contact = () => {
  return (
    <section className="p-8 bg-gray-100 flex flex-col items-center">
      <div className="py-8">
        <h2 className="text-2xl font-bold mb-4">Seguici sui Social</h2>
        <div className="flex flex-row items-center space-x-8">
          <div className="w-1/2 flex">
            <img src={phoneImage} alt="Phone" className="w-full h-auto" />
          </div>
          <div className="w-1/2 flex flex-col items-center">
            <p className="text-center mb-4">
              Per post edificanti quotidiani, aggiornamenti sulle nostre attività e i versetti quotidiani, seguici su Instagram.
            </p>
            <a href="https://www.instagram.com/accounts/login/?next=https%3A%2F%2Fwww.instagram.com%2Fadsgmdritalia%2F%3Figsh%3DMW9wZzQ3OG5nZWVwcQ%253D%253D&is_from_rle" target="_blank" rel="noopener noreferrer" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
              Seguici
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
