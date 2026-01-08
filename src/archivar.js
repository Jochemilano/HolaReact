// Archivar.js
import React from 'react';
import './App.css'; // puedes usar las mismas clases que Main para mantener estilo

function Archivar() {
  return (
    <main className="Main">
      <header className="App-header">
        <h1>Archivar</h1>
      </header>

      <div className="dashboard-content">
        <p>¡Bienvenido a tu ventana de Archivar!</p>
        <p>Aquí podés poner notas archivadas, estadísticas, o cualquier otra cosa.</p>
      </div>
    </main>
  );
}

export default Archivar;
