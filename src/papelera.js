// papelera.js
import React, { useState, useEffect } from 'react';
import './App.css';

function Papelera() {
  const [trash, setTrash] = useState(() => {
    return JSON.parse(localStorage.getItem('trash')) || [];
  });

  const [viewNote, setViewNote] = useState(null);

  useEffect(() => {
    localStorage.setItem('trash', JSON.stringify(trash));
  }, [trash]);

  // Recuperar nota: mover a notes
  const recoverNote = (index) => {
    const noteToRecover = trash[index];
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    localStorage.setItem('notes', JSON.stringify([...notes, noteToRecover]));

    setTrash(trash.filter((_, i) => i !== index));
  };

  // Borrar permanentemente
  const deletePermanently = (index) => {
    setTrash(trash.filter((_, i) => i !== index));
  };

  return (
    <main className="Main">
      <header className="App-header">
        <h1>Papelera</h1>
      </header>

      <div className="notes-grid">
        {trash.length === 0 && (
          <p className="no-notes">La papelera está vacía.</p>
        )}

        {trash.map((note, index) => (
          <div key={index} className={`note-card ${note.variant || 'variant-1'}`}>
            <div className='note-text'>
              <p>{note.text}</p>
            </div>
            <div className="note-actions">
              <button
                className="view-btn"
                onClick={() => setViewNote(note.text)}
              >
                👁
              </button>
              <button
                className="edit-btn"
                onClick={() => recoverNote(index)}
              >
                ↻
              </button>
              <button
                className="delete-btn"
                onClick={() => deletePermanently(index)}
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

export default Papelera;

