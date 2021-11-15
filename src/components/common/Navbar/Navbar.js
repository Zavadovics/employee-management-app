import React from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.scss';

const Navbar = () => {
  return (
    <div>
      <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
        <div className='container-fluid'>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarNav'
            aria-controls='navbarNav'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarNav'>
            <ul className='navbar-nav'>
              <li className='nav-item'>
                <NavLink className='navbar-item nav-link' to='/departments'>
                  Szervezeti egységek
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink className='navbar-item nav-link' to='/employees'>
                  Dolgozók
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink className='navbar-item nav-link' to='/datalist'>
                  Adatlista
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
