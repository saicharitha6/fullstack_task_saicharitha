import React, { useState, useEffect } from 'react';
import './App.css'; // Import CSS file for basic styling

function App(): JSX.Element {
  const [notes, setNotes] = useState<string[]>([]); // Array of strings
  const [newNote, setNewNote] = useState<string>(''); // String

  useEffect(() => {
    // Fetch all notes from backend when component mounts
    fetchAllNotes();
  }, []);

  const fetchAllNotes = async () => {
    try {
      const response = await fetch('http://localhost:3000/fetchAllNotes'); // Replace with actual backend API endpoint
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const addNote = async () => {
    if (newNote.trim() === '') return;
    try {
      // Send new note to backend
      await fetch('http://localhost:3000/addNote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ note: newNote }),
      });
      // Fetch all notes again to update the list
      fetchAllNotes();
      // Clear input field
      setNewNote('');
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  return (
    <div className="container">
      <h1 className="text-2xl font-bold text-center mb-4">
        <span role="img" aria-label="note icon">📝</span> Note App
      </h1>
      <div className="add-note-container">
        <input
          type="text"
          placeholder="Enter your note"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          className="note-input"
        />
        <button onClick={addNote} className="add-note-btn">
          Add Note
        </button>
      </div>
      <div className="notes-container">
        <h1 className="text-xl text-left mb-4">Notes</h1>
        <hr className="note-divider" /> 
        {notes.map((note, index) => (
          <div key={index} className="note">
            {note}
            <hr className="note-divider" /> {/* Add a horizontal line */}
          </div>
        ))}
      </div>

    </div>
  );
}

export default App;
