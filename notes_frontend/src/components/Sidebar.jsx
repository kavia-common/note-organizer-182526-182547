import React from 'react';
import SearchBar from './SearchBar';
import NoteList from './NoteList';

/**
 * PUBLIC_INTERFACE
 */
export default function Sidebar({
  notes,
  activeId,
  onSelect,
  onCreate,
  onSearch,
  search,
  showArchived,
  setShowArchived
}) {
  /** Sidebar container with actions and note list */
  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <SearchBar value={search} onChange={onSearch} />
        <button className="btn btn-primary" onClick={onCreate} title="New note">＋</button>
        <button
          className="btn"
          onClick={() => setShowArchived(v => !v)}
          title="Toggle archived filter"
        >
          {showArchived ? 'Unarchive' : 'Archived'}
        </button>
      </div>
      <div className="sidebar-content">
        <NoteList notes={notes} activeId={activeId} onSelect={onSelect} />
      </div>
    </aside>
  );
}
