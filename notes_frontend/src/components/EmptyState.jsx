import React from 'react';

/**
 * PUBLIC_INTERFACE
 */
export default function EmptyState({ onCreate }) {
  /** Empty state prompting to create a note with helpful hint */
  return (
    <div className="empty">
      <div style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>No note selected</div>
      <div style={{ marginBottom: 16 }}>Create a new note to get started.</div>
      <button className="btn btn-primary" onClick={onCreate}>New Note</button>
      <div style={{ marginTop: 16, fontSize: 12, color: 'var(--text-secondary)' }}>
        Tip: Use <span className="kbd">Search</span> to filter by title, content, or tags.
      </div>
    </div>
  );
}
