import { generateId } from '../utils/id';

const STORAGE_KEY = 'notes_app_v1';

/**
 * Factory to create the localStorage-backed adapter.
 * Implements the same interface as the API adapter.
 */
function createLocalAdapter() {
  const readAll = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : { notes: [], meta: {} };
    } catch {
      return { notes: [], meta: {} };
    }
  };

  const writeAll = (data) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };

  // PUBLIC_INTERFACE
  const list = () => {
    /** Returns array of notes */
    return readAll().notes;
  };

  // PUBLIC_INTERFACE
  const get = (id) => {
    /** Returns a single note by id or undefined */
    return list().find(n => n.id === id);
  };

  // PUBLIC_INTERFACE
  const create = (partial = {}) => {
    /** Creates a new note and persists it */
    const now = Date.now();
    const note = {
      id: generateId(),
      title: partial.title || '',
      content: partial.content || '',
      tags: partial.tags || [],
      pinned: !!partial.pinned,
      archived: !!partial.archived,
      createdAt: now,
      updatedAt: now
    };
    const data = readAll();
    data.notes.push(note);
    writeAll(data);
    return note;
  };

  // PUBLIC_INTERFACE
  const update = (updated) => {
    /** Updates an existing note */
    const data = readAll();
    const idx = data.notes.findIndex(n => n.id === updated.id);
    if (idx >= 0) {
      data.notes[idx] = { ...data.notes[idx], ...updated, updatedAt: Date.now() };
      writeAll(data);
      return data.notes[idx];
    }
    return undefined;
  };

  // PUBLIC_INTERFACE
  const remove = (id) => {
    /** Deletes a note by id */
    const data = readAll();
    const before = data.notes.length;
    data.notes = data.notes.filter(n => n.id !== id);
    writeAll(data);
    return data.notes.length < before;
  };

  // PUBLIC_INTERFACE
  const togglePin = (id) => {
    /** Toggles pin on a note */
    const n = get(id);
    if (!n) return undefined;
    return update({ ...n, pinned: !n.pinned });
  };

  // PUBLIC_INTERFACE
  const toggleArchive = (id) => {
    /** Toggles archive on a note */
    const n = get(id);
    if (!n) return undefined;
    return update({ ...n, archived: !n.archived, pinned: n.archived ? n.pinned : false });
  };

  return { list, get, create, update, remove, togglePin, toggleArchive };
}

/**
 * Placeholder API adapter with clear signatures.
 * Replace the bodies with real HTTP calls when backend is available.
 */
function createApiAdapter(baseUrl) {
  // Helpers could be added here for fetch with JSON handling.
  // For now, throw to signal unimplemented calls.
  const notImpl = (name) => () => {
    throw new Error(`API adapter method ${name} is not implemented. Configure a backend and implement HTTP calls.`);
  };

  // PUBLIC_INTERFACE
  const list = notImpl('list');

  // PUBLIC_INTERFACE
  const get = notImpl('get');

  // PUBLIC_INTERFACE
  const create = notImpl('create');

  // PUBLIC_INTERFACE
  const update = notImpl('update');

  // PUBLIC_INTERFACE
  const remove = notImpl('remove');

  // PUBLIC_INTERFACE
  const togglePin = notImpl('togglePin');

  // PUBLIC_INTERFACE
  const toggleArchive = notImpl('toggleArchive');

  return { list, get, create, update, remove, togglePin, toggleArchive, __baseUrl: baseUrl };
}

// PUBLIC_INTERFACE
export function createNotesService() {
  /**
   * This service abstracts CRUD operations for notes.
   * Adapter toggle:
   * - Default: localStorage
   * - Optional: API (placeholder), set REACT_APP_NOTES_STORAGE=api and REACT_APP_NOTES_API_URL
   *
   * Env variables (handled by CRA build-time):
   * - REACT_APP_NOTES_STORAGE: 'local' | 'api'
   * - REACT_APP_NOTES_API_URL: base URL for API adapter (when using 'api')
   */
  const mode = (process.env.REACT_APP_NOTES_STORAGE || 'local').toLowerCase();
  if (mode === 'api') {
    const baseUrl = process.env.REACT_APP_NOTES_API_URL || '';
    return createApiAdapter(baseUrl);
  }
  return createLocalAdapter();
}
