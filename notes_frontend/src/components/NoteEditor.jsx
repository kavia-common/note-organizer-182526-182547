import React, { useEffect, useMemo, useState } from 'react';
import TagChips from './TagChips';
import ConfirmDialog from './ConfirmDialog';
import { debounce } from '../utils/debounce';

/**
 * PUBLIC_INTERFACE
 */
export default function NoteEditor({ note, onUpdate, onDelete, onPinToggle, onArchiveToggle }) {
  /** Editor area with debounced autosave for title/content */
  const [local, setLocal] = useState(note);
  const [confirm, setConfirm] = useState(false);

  useEffect(() => setLocal(note), [note?.id]); // sync when note changes

  const saveDebounced = useMemo(
    () => debounce((patch) => onUpdate({ ...local, ...patch }), 400),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [local?.id]
  );

  const setField = (key, val) => {
    const next = { ...local, [key]: val, updatedAt: Date.now() };
    setLocal(next);
    if (key === 'title' || key === 'content') {
      saveDebounced({ [key]: val, updatedAt: next.updatedAt });
    } else {
      onUpdate(next);
    }
  };

  if (!note) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div className="editor-toolbar">
        <button className="btn" onClick={() => onPinToggle(note.id)} title="Pin">
          {note.pinned ? 'Unpin' : 'Pin'}
        </button>
        <button className="btn" onClick={() => onArchiveToggle(note.id)} title="Archive">
          {note.archived ? 'Unarchive' : 'Archive'}
        </button>
        <div style={{ flex: 1 }} />
        <button className="btn btn-danger" onClick={() => setConfirm(true)} title="Delete">Delete</button>
      </div>
      <div className="editor-inputs">
        <input
          className="input editor-title"
          placeholder="Note title"
          value={local.title}
          onChange={(e) => setField('title', e.target.value)}
        />
        <textarea
          className="editor-content"
          placeholder="Write your note..."
          value={local.content}
          onChange={(e) => setField('content', e.target.value)}
        />
        <TagChips
          tags={local.tags}
          onAdd={(t) => setField('tags', Array.from(new Set([...(local.tags || []), t])))}
          onRemove={(t) => setField('tags', (local.tags || []).filter(x => x !== t))}
        />
      </div>

      <ConfirmDialog
        open={confirm}
        title="Delete note"
        message="This action cannot be undone. Are you sure you want to delete this note?"
        onCancel={() => setConfirm(false)}
        onConfirm={() => { setConfirm(false); onDelete(note.id); }}
      />
    </div>
  );
}
