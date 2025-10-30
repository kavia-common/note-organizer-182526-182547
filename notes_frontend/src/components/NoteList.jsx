import React, { useMemo } from 'react';
import NoteListItem from './NoteListItem';

/**
 * PUBLIC_INTERFACE
 */
export default function NoteList({ notes, activeId, onSelect }) {
  /** Renders sorted list of notes, pinned first then by updatedAt desc */
  const sorted = useMemo(() => {
    return [...notes].sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return (b.updatedAt || 0) - (a.updatedAt || 0);
    });
  }, [notes]);

  return (
    <ul className="note-list">
      {sorted.map(n => (
        <NoteListItem
          key={n.id}
          note={n}
          active={n.id === activeId}
          onClick={() => onSelect(n.id)}
        />
      ))}
    </ul>
  );
}
