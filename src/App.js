//App.js
import React, { useState } from 'react';
import './App.css';
import './Sidebar.css';
import Sidebar from './Sidebar';
import DarkModeButton from './DarkModeButton';
import Main from './Main';
import Archivar from './archivar';
import Papelera from './papelera';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <Router>
      <div className={`App ${isDarkMode ? 'dark-mode' : ''}`}>
        <Sidebar />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/archive" element={<Archivar />} />
            <Route path="/trash" element={<Papelera />} />
          </Routes>
          <DarkModeButton isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      </div>
    </Router>
  );
}

export default App;