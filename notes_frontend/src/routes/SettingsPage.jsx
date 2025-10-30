import React from 'react';

/**
 * PUBLIC_INTERFACE
 */
export default function SettingsPage({ theme, setTheme, onBack }) {
  /** Settings route with theme toggle and local reset */
  return (
    <div style={{ padding: 16, display: 'grid', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <button className="btn" onClick={onBack}>← Back</button>
        <h2 style={{ margin: 0 }}>Settings</h2>
      </div>

      <section style={{ border: '1px solid var(--border)', borderRadius: 12, padding: 16 }}>
        <h3>Theme</h3>
        <p>Switch between light and dark theme.</p>
        <button className="btn" onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>
          Current: {theme === 'light' ? 'Light' : 'Dark'}
        </button>
      </section>

      <section style={{ border: '1px solid var(--border)', borderRadius: 12, padding: 16 }}>
        <h3>Data</h3>
        <p>Reset local data storage for this app.</p>
        <button
          className="btn btn-danger"
          onClick={() => {
            localStorage.removeItem('notes_app_v1');
            window.location.hash = '#/notes';
            window.location.reload();
          }}
        >
          Reset Local Data
        </button>
      </section>
    </div>
  );
}
