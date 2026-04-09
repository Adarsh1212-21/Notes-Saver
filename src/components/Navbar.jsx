import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className=" py-4 shadow-md w-full">
      <div className="max-w-4xl mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex gap-6">
          <NavLink 
            to="/"
            className={({ isActive }) => `
              text-gray-700 font-medium hover:text-blue-500 transition
              ${isActive ? 'text-blue-500 underline' : ''}
            `}
          >
            Home
          </NavLink>
          <NavLink 
            to="/pastes"
            className={({ isActive }) => `
              text-gray-700 font-medium hover:text-blue-500 transition
              ${isActive ? 'text-blue-500 underline' : ''}
            `}
          >
            Pastes
          </NavLink>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;