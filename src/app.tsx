import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { SearchAndFilter } from './components/SearchAndFilter';
import { NoteCard } from './components/NoteCard';
import { NoteModal } from './components/NoteModal';
import { EmptyState } from './components/EmptyState';
import { useNotes } from './hooks/useNotes';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Note } from './types';

function App() {
  const [isDark, setIsDark] = useLocalStorage('notepad-pro-theme', false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | undefined>();
  
  const {
    notes,
    searchQuery,
    setSearchQuery,
    selectedTags,
    setSelectedTags,
    allTags,
    addNote,
    updateNote,
    deleteNote,
  } = useNotes();

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const handleCreateNote = () => {
    setEditingNote(undefined);
    setIsModalOpen(true);
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setIsModalOpen(true);
  };

  const handleSaveNote = (noteData: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingNote) {
      updateNote(editingNote.id, noteData);
    } else {
      addNote(noteData);
    }
  };

  const handleDeleteNote = (id: string) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      deleteNote(id);
    }
  };

  const hasAnyNotes = notes.length > 0 || searchQuery !== '' || selectedTags.length > 0;
  const isFiltered = searchQuery !== '' || selectedTags.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-emerald-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20 transition-all duration-500">
      <Header
        isDark={isDark}
        toggleTheme={toggleTheme}
        onCreateNote={handleCreateNote}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <SearchAndFilter
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
                allTags={allTags}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {notes.length === 0 ? (
              <EmptyState
                onCreateNote={handleCreateNote}
                hasNotes={hasAnyNotes}
                isFiltered={isFiltered}
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {notes.map((note) => (
                  <NoteCard
                    key={note.id}
                    note={note}
                    onEdit={handleEditNote}
                    onDelete={handleDeleteNote}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <NoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveNote}
        note={editingNote}
      />
    </div>
  );
}

export default App;
