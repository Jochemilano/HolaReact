//sidebar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [isSidebarMinimized, setSidebarMinimized] = useState(false);
  const [isSidebarHidden, setSidebarHidden] = useState(false);
  const [activeItem, setActiveItem] = useState(null);

  const toggleSidebar = () => {
    setSidebarMinimized(!isSidebarMinimized);
  };

  const toggleSubmenu = (index) => {
    if (activeItem === index) {
      setActiveItem(null); // Si clickeamos el mismo item, lo cerramos.
    } else {
      setActiveItem(index); // Si clickeamos un nuevo item, lo abrimos.
    }
  };

  return (
    <div className={`sidebar ${isSidebarMinimized ? 'minimize' : ''} ${isSidebarHidden ? 'sidebar-hidden' : ''}`} id="sidebar">
      <div className="encabezado">
        <div id="sidebar-btn" className='sidebar-btn' onClick={toggleSidebar}>
          <i className="fa-solid fa-angle-left"></i>
        </div>
        <div className="brand">
          <span>Notas</span>
        </div>
      </div>
      <div className="cuerpo">
        <ul className="item-container">
          <li className="item static">
            <Link to="/" className="link">
              <i class="fa-solid fa-lightbulb"></i>
              <span>Notas</span>
            </Link>
          </li>
          <li className="item static">
            <Link to="/archive" className="link">
              <i class="fa-solid fa-file-arrow-down"></i>
              <span>Archivar</span>
            </Link>
          </li>
           <li className="item static">
            <Link to="/trash" className="link">
              <i class="fa-solid fa-trash"></i>
              <span>Papelera</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="footer">
        <ul className="item-container">
          <li className="item static">
            <a href="#" className="link">
              <i className="fa-regular fa-bell"></i>
              <span>Notificaciones</span>
            </a>
          </li>
          <li className="item static">
            <a href="#" className="link">
              <i className="fa-solid fa-gear"></i>
              <span>Configuracion</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;