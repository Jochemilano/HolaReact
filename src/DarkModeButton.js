import React from 'react';

const DarkModeButton = ({ isDarkMode, setIsDarkMode }) => {
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <div className="dark-mode-btn" onClick={toggleDarkMode}>
      <i className={`fa-regular ${isDarkMode ? 'fa-sun' : 'fa-moon'}`}></i>
    </div>
  );
};

export default DarkModeButton;
