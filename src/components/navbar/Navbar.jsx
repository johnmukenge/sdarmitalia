import React from 'react'
import logo from '../../assets/logo-adsgmdr.jpg';

export default function Navbar() {
  return (
    <div>
      <nav className="navbar bg-gray-800 p-4 flex justify-between items-center">
        <ul className="flex justify-end space-x-4">
            <li><a href="/" className="text-white hover:text-blue-200">Home</a></li>
            <li><a className="text-white hover:text-blue-200" href="/eventi">Eventi</a></li>
            <li><a className="text-white hover:text-blue-200" href="/media">Media</a></li>
            <li><a className="text-white hover:text-blue-200" href="/letteratura">Letteratura</a></li>
            <li><a className="text-white hover:text-blue-200"href="/chiese">Chiese</a></li>
        </ul>
      </nav>
    </div>
  )
}
