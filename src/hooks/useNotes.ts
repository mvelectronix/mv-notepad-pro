import { useState, useCallback } from 'react';
import { Note } from '../types';
import { useLocalStorage } from './useLocalStorage';

export function useNotes() {
  const [notes, setNotes] = useLocalStorage<Note[]>('notepad-pro-notes', []);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const addNote = useCallback((noteData: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newNote: Note = {
      ...noteData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setNotes((prev: Note[]) => [newNote, ...prev]);
    return newNote;
  }, [setNotes]);

  const updateNote = useCallback((id: string, updates: Partial<Note>) => {
    setNotes((prev: Note[]) => 
      prev.map(note => 
        note.id === id 
          ? { ...note, ...updates, updatedAt: new Date() }
          : note
      )
    );
  }, [setNotes]);

  const deleteNote = useCallback((id: string) => {
    setNotes((prev: Note[]) => prev.filter(note => note.id !== id));
  }, [setNotes]);

  const filteredNotes = notes.filter(note => {
    const matchesSearch = searchQuery === '' || 
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTags = selectedTags.length === 0 ||
      selectedTags.every(tag => note.tags.includes(tag));
    
    return matchesSearch && matchesTags;
  });

  const allTags = Array.from(new Set(notes.flatMap(note => note.tags))).sort();

  return {
    notes: filteredNotes,
    searchQuery,
    setSearchQuery,
    selectedTags,
    setSelectedTags,
    allTags,
    addNote,
    updateNote,
    deleteNote,
  };
}
