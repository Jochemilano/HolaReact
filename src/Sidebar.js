import React, { useState } from 'react';

const Sidebar = () => {
  const [isSidebarMinimized, setSidebarMinimized] = useState(false);
  const [isSidebarHidden, setSidebarHidden] = useState(false);
  const [activeItem, setActiveItem] = useState(null);

  const toggleSidebar = () => {
    setSidebarMinimized(!isSidebarMinimized);
  };

  const toggleSidebarVisibility = () => {
    setSidebarHidden(!isSidebarHidden);
    setSidebarMinimized(false); // Cuando escondemos la sidebar, la minimizamos también.
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
        <button id="sidebar-btn" onClick={toggleSidebar}>
          <i className="fa-solid fa-angle-left"></i>
        </button>
        <div className="brand">
          <img src="icono.png" alt="logo" />
          <span>Reisaa</span>
        </div>
      </div>
      <div className="cuerpo">
        <div className="search">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input type="search" placeholder="search" />
        </div>
        <ul className="item-container">
          <li className="item static">
            <a href="#" className="link">
              <i className="fa-solid fa-house"></i>
              <span>Home</span>
            </a>
          </li>
          <li className="item static">
            <a href="#" className="link">
              <i className="fa-solid fa-chart-area"></i>
              <span>Dashboard</span>
            </a>
          </li>
          <li className="item move" onClick={() => toggleSubmenu(0)}>
            <a href="#" className="link">
              <i className="fa-solid fa-store"></i>
              <span>Store</span>
              <i className={`fa-solid ${activeItem === 0 ? 'fa-angle-up' : 'fa-angle-down'}`}></i>
            </a>
            {activeItem === 0 && (
              <ul className="subitemcontainer">
                <li><a href="#" className="subitem">Products</a></li>
                <li><a href="#" className="subitem">Orders</a></li>
                <li><a href="#" className="subitem">Subscriptions</a></li>
              </ul>
            )}
          </li>
          <li className="item move" onClick={() => toggleSubmenu(1)}>
            <a href="#" className="link">
              <i className="fa-solid fa-file"></i>
              <span>File</span>
              <i className={`fa-solid ${activeItem === 1 ? 'fa-angle-up' : 'fa-angle-down'}`}></i>
            </a>
            {activeItem === 1 && (
              <ul className="subitemcontainer">
                <li><a href="#" className="subitem">Images</a></li>
                <li><a href="#" className="subitem">Audios</a></li>
              </ul>
            )}
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
        <div className="user">
          <div className="user-img">
            <img src="user-image.png" alt="user" />
          </div>
          <div className="user-data">
            <span className="name">Emiliano</span>
            <span className="email">je.jaurez.salas@gmail.com</span>
            <span className="rol">Administrador</span>
          </div>
          <div className="user-icon">
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
