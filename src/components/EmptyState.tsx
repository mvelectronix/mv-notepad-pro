import React from 'react';
import { FileText, PlusCircle } from 'lucide-react';

interface EmptyStateProps {
  onCreateNote: () => void;
  hasNotes: boolean;
  isFiltered: boolean;
}

export function EmptyState({ onCreateNote, hasNotes, isFiltered }: EmptyStateProps) {
  if (isFiltered) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-full flex items-center justify-center mb-6">
          <FileText size={40} className="text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          No notes match your search
        </h3>
        <p className="text-gray-600 dark:text-gray-400 max-w-md">
          Try adjusting your search terms or filters to find the notes you're looking for.
        </p>
      </div>
    );
  }

  if (!hasNotes) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/20 dark:to-blue-900/20 rounded-full flex items-center justify-center mb-6">
          <FileText size={40} className="text-purple-500" />
        </div>
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          Welcome to NotePad Pro
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
          Your beautiful note-taking experience starts here. Create your first note and organize your thoughts with style.
        </p>
        <button
          onClick={onCreateNote}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg"
        >
          <PlusCircle size={20} />
          <span className="font-medium">Create Your First Note</span>
        </button>
      </div>
    );
  }

  return null;
}
