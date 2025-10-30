import React from 'react';

/**
 * PUBLIC_INTERFACE
 */
export default function ConfirmDialog({ open, title = 'Confirm', message, onConfirm, onCancel }) {
  /** Simple inline confirm dialog */
  if (!open) return null;
  return (
    <div role="dialog" aria-modal="true" style={{
      position: 'fixed', inset: 0, display: 'grid', placeItems: 'center',
      background: 'rgba(0,0,0,0.25)', zIndex: 50
    }}>
      <div style={{ background: 'var(--bg-surface)', color: 'var(--text-primary)', border: '1px solid var(--border)', borderRadius: 12, width: 360, boxShadow: 'var(--shadow)', overflow: 'hidden' }}>
        <div style={{ padding: 14, borderBottom: '1px solid var(--border)', fontWeight: 700 }}>{title}</div>
        <div style={{ padding: 14, color: 'var(--text-secondary)' }}>{message}</div>
        <div style={{ padding: 14, display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
          <button className="btn" onClick={onCancel}>Cancel</button>
          <button className="btn btn-danger" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}
