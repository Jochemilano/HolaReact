// Main.js
import React, { useState, useEffect } from 'react';
import './App.css';

function Main() {
  const [notes, setNotes] = useState(() => {
    return JSON.parse(localStorage.getItem('notes')) || [];
  });

  const [newNote, setNewNote] = useState('');
  
  // Estados para manejar la edición
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (newNote.trim() === '') return;

    const variants = ['variant-1', 'variant-2', 'variant-3', 'variant-4'];
    const randomVariant = variants[Math.floor(Math.random() * variants.length)];

    setNotes([
      ...notes,
      { text: newNote.trim(), variant: randomVariant }
    ]);

    setNewNote('');
  };

  const deleteNote = (index) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  // Funciones para la edición
  const startEditing = (index, currentText) => {
    setEditingIndex(index);
    setEditText(currentText);
  };

  const cancelEditing = () => {
    setEditingIndex(null);
    setEditText('');
  };

  const saveEdit = (index) => {
    if (editText.trim() === '') return;
    const updatedNotes = [...notes];
    updatedNotes[index].text = editText.trim();
    setNotes(updatedNotes);
    setEditingIndex(null);
    setEditText('');
  };

  return (
    <main className="Main">
      <header className="App-header">
        <h1>Tus notas</h1>
      </header>

      <div className="note-form">
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Escribe una nota..."
        />
        <button onClick={addNote}>Agregar</button>
      </div>

      <div className="notes-grid">
        {notes.length === 0 && (
          <p className="no-notes">No hay notas aún.</p>
        )}

        {notes.map((note, index) => (
          <div key={index} className={`note-card ${note.variant}`}>
            {editingIndex === index ? (
              // Vista de edición
              <div className="edit-container">
                <input
                  className="edit-input"
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  autoFocus
                />
                <div className="edit-buttons">
                  <button className="save-btn" onClick={() => saveEdit(index)}>Guardar</button>
                  <button className="cancel-btn" onClick={cancelEditing}>Cancelar</button>
                </div>
              </div>
            ) : (
              // Vista normal
              <>
                <div className='note-text'>
                  <p>{note.text}</p>
                </div>
                <div className="note-actions">
                  
                  <button
                    className="edit-btn"
                    onClick={() => startEditing(index, note.text)}
                  >
                    ✎
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => deleteNote(index)}
                  >
                    ✕
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}

export default Main;
