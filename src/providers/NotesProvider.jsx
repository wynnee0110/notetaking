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
            title: text ? text.split('\n')[0].substring(0, 20) : "New Note",
            date: new Date().toLocaleDateString(),
            content: text || "",
            pinned: false
        };
        setNotes([newNote, ...notes]);
        setActiveNoteId(newNote.id);
        return newNote;
    };

    const deleteNote = (id) => {
        setNotes(notes.filter(n => n.id !== id));
        if (activeNoteId === id) {
            setActiveNoteId(null);
        }
    };

    const togglePin = (id) => {
        setNotes(prev =>
            prev.map(n => n.id === id ? { ...n, pinned: !n.pinned } : n)
        );
    };

    // Sort: pinned first, then by id (newest)
    const sortedNotes = [...notes].sort((a, b) => {
        if (a.pinned && !b.pinned) return -1;
        if (!a.pinned && b.pinned) return 1;
        return b.id - a.id;
    });

    const value = {
        notes: sortedNotes,
        setNotes,
        addNote,
        deleteNote,
        togglePin,
        activeNoteId,
        setActiveNoteId
    };

    return (
        <NotesContext.Provider value={value}>
            {children}
        </NotesContext.Provider>
    );
}
