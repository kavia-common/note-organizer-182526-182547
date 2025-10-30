import { useCallback, useEffect, useMemo, useState } from 'react';
import { createNotesService } from '../services/notesService';

/**
 * PUBLIC_INTERFACE
 */
export function useNotes() {
  /**
   * Provides notes state derived from notesService with search and filters.
   * All mutations go through the notesService abstraction.
   */
  const service = useMemo(() => createNotesService(), []);
  const [version, setVersion] = useState(0); // bump to refresh from storage
  const [search, setSearch] = useState('');
  const [showArchived, setShowArchived] = useState(false);

  const notes = useMemo(() => service.list(), [service, version]);

  const filteredNotes = useMemo(() => {
    const q = search.trim().toLowerCase();
    return notes.filter(n => {
      if (showArchived !== !!n.archived) return false;
      if (!q) return true;
      const inTitle = (n.title || '').toLowerCase().includes(q);
      const inContent = (n.content || '').toLowerCase().includes(q);
      const inTags = (n.tags || []).some(t => t.toLowerCase().includes(q));
      return inTitle || inContent || inTags;
    });
  }, [notes, search, showArchived]);

  const refresh = () => setVersion(v => v + 1);

  // PUBLIC_INTERFACE
  const createNote = useCallback((partial) => {
    const created = service.create(partial);
    refresh();
    return created;
  }, [service]);

  // PUBLIC_INTERFACE
  const createNoteNavigate = useCallback(() => {
    const n = createNote({ title: '', content: '' });
    window.location.hash = `#/notes/${n.id}`;
  }, [createNote]);

  // PUBLIC_INTERFACE
  const updateNote = useCallback((note) => {
    service.update(note);
    refresh();
  }, [service]);

  // PUBLIC_INTERFACE
  const deleteNote = useCallback((id) => {
    service.remove(id);
    refresh();
    // If deleted selected, route back to list root
    const current = window.location.hash;
    if (current.includes(id)) {
      window.location.hash = '#/notes';
    }
  }, [service]);

  // PUBLIC_INTERFACE
  const togglePin = useCallback((id) => {
    service.togglePin(id);
    refresh();
  }, [service]);

  // PUBLIC_INTERFACE
  const toggleArchive = useCallback((id) => {
    service.toggleArchive(id);
    refresh();
  }, [service]);

  // Initialize storage shape if missing
  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    notes,
    filteredNotes,
    search,
    setSearch,
    showArchived,
    setShowArchived,
    createNote,
    createNoteNavigate,
    updateNote,
    deleteNote,
    togglePin,
    toggleArchive
  };
}
