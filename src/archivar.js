// archivar.js
import React, { useState, useEffect } from 'react';
import './App.css';

function Archivar() {
  // Guarda las notas archivadas
  const [archive, setArchive] = useState(() => {
    return JSON.parse(localStorage.getItem('archive')) || [];
  });

  // Para ver la nota en grande
  const [viewNote, setViewNote] = useState(null);

  // Guarda cambios automáticamente
  useEffect(() => {
    localStorage.setItem('archive', JSON.stringify(archive));
  }, [archive]);

  // Recuperar nota: mover a notes
  const recoverNote = (index) => {
    const noteToRecover = archive[index];
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    localStorage.setItem('notes', JSON.stringify([...notes, noteToRecover]));

    setArchive(archive.filter((_, i) => i !== index));
  };

  // Borrar permanentemente del archivo
  const deletePermanently = (index) => {
    setArchive(archive.filter((_, i) => i !== index));
  };

  return (
    <main className="Main">
      <header className="App-header">
        <h1>Archivadas</h1>
      </header>

      <div className="notes-grid">
        {archive.length === 0 && (
          <p className="no-notes">No hay notas archivadas.</p>
        )}

        {archive.map((note, index) => (
          <div key={index} className={`note-card ${note.variant || 'variant-1'}`}>
            <div className='note-text'>
              <p>{note.text}</p>
            </div>
            <div className="note-actions">
              <button
                className="view-btn"
                onClick={() => setViewNote(note.text)}
                title="Ver"
              >
                👁
              </button>
              <button
                className="edit-btn"
                onClick={() => recoverNote(index)}
                title="Restaurar"
              >
                ↻
              </button>
              <button
                className="delete-btn"
                onClick={() => deletePermanently(index)}
                title="Eliminar definitivamente"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal para ver nota */}
      {viewNote && (
        <div className="modal">
          <div className="modal-content">
            <div className="view-text">
              {viewNote}
            </div>
            <button className="close-btn" onClick={() => setViewNote(null)}>Cerrar</button>
          </div>
        </div>
      )}
    </main>
  );
}

export default Archivar;

