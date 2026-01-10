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
  const [viewNote, setViewNote] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);


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
    const noteToTrash = notes[index];
    const trash = JSON.parse(localStorage.getItem('trash')) || [];
    localStorage.setItem('trash', JSON.stringify([...trash, noteToTrash]));
    setNotes(notes.filter((_, i) => i !== index));
  };

  //Funciones para eliminar
  const confirmDeleteNote = (index) => {
    setNoteToDelete(index);
    setShowConfirm(true);
  };

  const cancelDelete = () => {
    setNoteToDelete(null);
    setShowConfirm(false);
  };

  const acceptDelete = () => {
    if (noteToDelete !== null) {
      const noteToTrash = notes[noteToDelete];
      const trash = JSON.parse(localStorage.getItem('trash')) || [];
      localStorage.setItem('trash', JSON.stringify([...trash, noteToTrash]));
      setNotes(notes.filter((_, i) => i !== noteToDelete));
    }
    setNoteToDelete(null);
    setShowConfirm(false);
  };

  //Funciones para archivar
const archiveNote = (index) => {
  const noteToArchive = notes[index];
  const archive = JSON.parse(localStorage.getItem('archive')) || [];
  localStorage.setItem('archive', JSON.stringify([...archive, noteToArchive]));
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
        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Escribe tu nota aquí..."
          rows={3}
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
                    className="delete-btn"
                    onClick={() => confirmDeleteNote(index)}
                    title="Mandar a papelera"
                  >
                    ✕
                  </button>
                  <button
                    className="archive-btn"
                    onClick={() => archiveNote(index)}
                    title="Archivar"
                  >
                    ⤓
                  </button>

                </div>
              </>
            )}
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

       {/* Confirmación para eliminar nota */}
       {showConfirm && (
        <div className="modal">
          <div className="modal-content">
            <p>¿Estás seguro de eliminar?</p>
            <div className="modal-buttons">
              <button className="cancel-btn" onClick={cancelDelete}>Cancelar</button>
              <button className="confirm-btn" onClick={acceptDelete}>Aceptar</button>
            </div>
            <small>Puedes recuperar tus archivos eliminados en la papelera</small>
          </div>
        </div>
      )}
    </main>
  );
}

export default Main;
