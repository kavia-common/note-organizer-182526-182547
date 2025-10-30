import React from 'react';

/**
 * PUBLIC_INTERFACE
 */
export default function NoteListItem({ note, active, onClick }) {
  /** One row in the notes list with title preview and tags */
  return (
    <li className={`note-item ${active ? 'active' : ''}`}>
      <button className="btn btn-ghost" onClick={onClick} style={{ width: '100%', textAlign: 'left' }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontWeight: 700, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {note.title || 'Untitled'}
            </div>
            <div style={{ color: 'var(--text-secondary)', fontSize: 12, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {(note.content || '').replace(/\n+/g, ' ').slice(0, 80)}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {note.pinned ? <span title="Pinned">📌</span> : null}
            {note.archived ? <span title="Archived">🗄️</span> : null}
          </div>
        </div>
      </button>
    </li>
  );
}
