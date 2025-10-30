import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import './theme.css';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import NotesPage from './routes/NotesPage';
import SettingsPage from './routes/SettingsPage';
import { useNotes } from './hooks/useNotes';

// Basic hash router without external deps
function useHashRoute() {
  const [hash, setHash] = useState(() => window.location.hash || '#/notes');

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash || '#/notes');
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const route = useMemo(() => {
    // normalize
    const current = hash.startsWith('#') ? hash.slice(1) : hash;
    const [path, query] = current.split('?');
    const parts = path.split('/').filter(Boolean); // e.g. ["notes", "123"]
    const page = parts[0] || 'notes';
    const id = parts[1] || null;
    return { page, id, query: query || '' };
  }, [hash]);

  // PUBLIC_INTERFACE
  const navigate = (to) => {
    /** Navigate to a new hash path. Example: navigate('/notes/123') */
    window.location.hash = `#${to}`;
  };

  return { route, navigate };
}

// PUBLIC_INTERFACE
function App() {
  /** Root application: sets theme, routing, and composes UI layout. */
  const [theme, setTheme] = useState('light');
  const { route, navigate } = useHashRoute();
  const notesApi = useNotes(); // service-backed state

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Set default route
  useEffect(() => {
    if (!window.location.hash) {
      navigate('/notes');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onOpenSettings = () => navigate('/settings');
  const onOpenNotes = () => navigate('/notes');

  const pageEl = route.page === 'settings'
    ? <SettingsPage theme={theme} setTheme={setTheme} onBack={onOpenNotes} />
    : <NotesPage
        route={route}
        navigate={navigate}
        notesApi={notesApi}
        theme={theme}
        setTheme={setTheme}
      />;

  return (
    <div className="app-shell">
      <Header
        theme={theme}
        onToggleTheme={() => setTheme(t => (t === 'light' ? 'dark' : 'light'))}
        onOpenSettings={onOpenSettings}
        onOpenNotes={onOpenNotes}
      />
      <div className="app-body">
        <Sidebar
          notes={notesApi.filteredNotes}
          activeId={route.id}
          onSelect={(id) => navigate(`/notes/${id}`)}
          onCreate={notesApi.createNoteNavigate}
          onSearch={notesApi.setSearch}
          search={notesApi.search}
          showArchived={notesApi.showArchived}
          setShowArchived={notesApi.setShowArchived}
        />
        <main className="app-main">
          {pageEl}
        </main>
      </div>
    </div>
  );
}

export default App;
