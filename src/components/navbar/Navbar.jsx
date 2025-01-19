import React from 'react'

export default function Navbar() {
  return (
    <div>
      <nav className="navbar bg-blue-500 p-4">
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
