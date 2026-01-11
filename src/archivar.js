// archivar.js
import React, { useState, useEffect } from 'react';
import './App.css';

function Archivar() {
/* ================================
     Estados
  ================================= */

  // Guarda las notas archivadas
  const [archive, setArchive] = useState(() => {
    return JSON.parse(localStorage.getItem('archive')) || [];
  });

  // Para ver la nota en grande
  const [viewNote, setViewNote] = useState(null);

  // Para edición con modal
const [editingNote, setEditingNote] = useState(null);
const [editingIndex, setEditingIndex] = useState(null);
const [editText, setEditText] = useState('');

 /* ================================
     Efectos
  ================================= */

  // Guarda cambios automáticamente
  useEffect(() => {
    localStorage.setItem('archive', JSON.stringify(archive));
  }, [archive]);

  /* ================================
     Funciones de notas
  ================================= */

  // Recuperar nota: mover a notes
  const recoverNote = (index) => {
    const noteToRecover = archive[index];
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    localStorage.setItem('notes', JSON.stringify([...notes, noteToRecover]));

    setArchive(archive.filter((_, i) => i !== index));
  };

// Mover nota a papelera
const moveToTrash = (index) => {
  const noteToTrash = archive[index];
  const trash = JSON.parse(localStorage.getItem('trash')) || [];
  localStorage.setItem('trash', JSON.stringify([...trash, noteToTrash]));

  setArchive(archive.filter((_, i) => i !== index));
};

/* ================================
     Funciones de edición con modal
  ================================= */

const startEditing = (index, currentText) => {
  setEditingIndex(index);
  setEditText(currentText);
  setEditingNote(true);
};

const cancelEditing = () => {
  setEditingNote(null);
  setEditingIndex(null);
  setEditText('');
};

const saveEdit = () => {
  if (editText.trim() === '') return;

  const updatedArchive = [...archive];
  updatedArchive[editingIndex].text = editText.trim();
  setArchive(updatedArchive);

  cancelEditing();
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
    onClick={() => startEditing(index, note.text)}
    title="Editar"
  >
    ✎
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
    onClick={() => moveToTrash(index)}
    title="Enviar a la papelera"
  >
    🗑
  </button>
</div>
</div>
))}
</div>

      {/* Modal para ver nota */}
{viewNote && (
  <div className="modal">
    <div className="modal-content">
      {/* Botón cerrar arriba */}
      <button className="close-top" onClick={() => setViewNote(null)}>✕</button>

      {/* Contenido de la nota */}
      <div className="view-text">
        {viewNote}
      </div>
    </div>
  </div>
)}

{editingNote && (
  <div className="modal">
    <div className="modal-content">
      <h3>Editar nota</h3>
      <textarea
        className="edit-textarea"
        value={editText}
        onChange={(e) => setEditText(e.target.value)}
        rows={6}
        autoFocus
      />
      <div className="modal-buttons">
        <button className="cancel-btn" onClick={cancelEditing}>Cancelar</button>
        <button className="confirm-btn" onClick={saveEdit}>Guardar</button>
      </div>
    </div>
  </div>
)}

    </main>
  );
}

export default Archivar;