import React, { useState } from 'react';
import './App.css';
import './Sidebar.css';
import Sidebar from './Sidebar';
import SidebarButton from './SidebarButton';
import DarkModeButton from './DarkModeButton';
import Main from './Main';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className={`App ${isDarkMode ? 'dark-mode' : ''}`}>
      <Sidebar />
      <SidebarButton />
      <DarkModeButton isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <Main />
    </div>
  );
}

export default App;
