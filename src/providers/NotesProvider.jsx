import { useState, useEffect } from "react";
import { NotesContext } from "../context/NotesContext";

export function NotesProvider({ children }) {
    const [notes, setNotes] = useState(() => {
        try {
            const saved = localStorage.getItem("my-notes");
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            console.error("Failed to parse notes from local storage", e);
            return [];
        }
    });

    const [activeNoteId, setActiveNoteId] = useState(null);

    useEffect(() => {
        localStorage.setItem("my-notes", JSON.stringify(notes));
    }, [notes]);

    const addNote = (text) => {
        const newNote = {
            id: Date.now(),
            text: text || "New Note",
            title: text ? text.split('\n')[0].substring(0, 20) : "New Note", // Simple title extraction
            date: new Date().toLocaleDateString(),
            content: text || ""
        };
        setNotes([newNote, ...notes]);
        setActiveNoteId(newNote.id); // Auto-select new note
        return newNote;
    };

    const deleteNote = (id) => {
        setNotes(notes.filter(n => n.id !== id));
        if (activeNoteId === id) {
            setActiveNoteId(null);
        }
    };

    const value = {
        notes,
        setNotes,
        addNote,
        deleteNote,
        activeNoteId,
        setActiveNoteId
    };

    return (
        <NotesContext.Provider value={value}>
            {children}
        </NotesContext.Provider>
    );
}
