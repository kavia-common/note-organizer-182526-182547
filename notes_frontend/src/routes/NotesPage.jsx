import React, { useMemo } from 'react';
import NoteEditor from '../components/NoteEditor';
import EmptyState from '../components/EmptyState';

/**
 * PUBLIC_INTERFACE
 */
export default function NotesPage({ route, navigate, notesApi }) {
  /** Main notes route; selects current note via route.id */
  const note = useMemo(() => {
    return notesApi.notes.find(n => n.id === route.id);
  }, [notesApi.notes, route.id]);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {route.id && note ? (
        <NoteEditor
          note={note}
          onUpdate={notesApi.updateNote}
          onDelete={notesApi.deleteNote}
          onPinToggle={notesApi.togglePin}
          onArchiveToggle={notesApi.toggleArchive}
        />
      ) : (
        <EmptyState onCreate={notesApi.createNoteNavigate} />
      )}
    </div>
  );
}
