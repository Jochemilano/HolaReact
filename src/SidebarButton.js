import React from 'react';

const SidebarButton = ({ id, icon }) => {
  return (
    <div className="sidebar-btn" id={id}>
      <i className={icon}></i>
    </div>
  );
};

export default SidebarButton;
