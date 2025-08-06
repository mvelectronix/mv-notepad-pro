import React from 'react';
import { Edit3, Trash2, Calendar, Tag } from 'lucide-react';
import { Note } from '../types';

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
}

export function NoteCard({ note, onEdit, onDelete }: NoteCardProps) {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="group bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl hover:shadow-purple-500/10 hover:border-purple-300/50 dark:hover:border-purple-600/50 transition-all duration-300 hover:scale-[1.02]">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
          {note.title || 'Untitled'}
        </h3>
        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => onEdit(note)}
            className="p-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 transition-colors"
          >
            <Edit3 size={16} />
          </button>
          <button
            onClick={() => onDelete(note.id)}
            className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-4">
        {note.content || 'No content'}
      </p>

      {note.tags.length > 0 && (
        <div className="flex items-center space-x-2 mb-3">
          <Tag size={14} className="text-gray-400" />
          <div className="flex flex-wrap gap-1">
            {note.tags.map(tag => (
              <span
                key={tag}
                className="px-2 py-1 bg-gradient-to-r from-emerald-400/20 to-blue-400/20 text-emerald-700 dark:text-emerald-300 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
        <Calendar size={14} className="mr-1" />
        <span>Updated {formatDate(note.updatedAt)}</span>
      </div>
    </div>
  );
}
