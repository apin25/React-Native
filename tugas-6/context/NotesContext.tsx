
import React from "react";
import { Note } from "../types/note";

type NotexContextType = {
  notes: Note[];
  addNote: (text: string) => void;
  removeNote: (id: string) => void;
  editNote: (id: string, newText: string) => void;
}

const NotexContext = React.createContext<NotexContextType | undefined>(undefined);

export const NotesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notes, setNotes] = React.useState<Note[]>([]);

  const addNote = (text: string) => {
    const newNote: Note = {
      id: Math.random().toString(),
      text,
    };
    setNotes(prevNotes => [...prevNotes, newNote]);
  }

  // You can add more functions like removeNote, updateNote, etc. as needed
  const removeNote = (id: string) => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
  };
 const editNote = (id: string, newText: string) => {
    setNotes(prevNotes =>
      prevNotes.map(note =>
        note.id === id ? { ...note, text: newText } : note
      )
    );
  };
  return (
    <NotexContext.Provider value={{ notes, addNote, removeNote, editNote }}>
      {children}
    </NotexContext.Provider>
  );

}

export const useNotes = () => {
  const context = React.useContext(NotexContext);
  if (!context) {
    throw new Error("useNotex must be used within a NotexProvider");
  }
  return context;
}