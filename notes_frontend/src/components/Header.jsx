import React from 'react';

/**
 * PUBLIC_INTERFACE
 */
export default function Header({ theme, onToggleTheme, onOpenSettings, onOpenNotes }) {
  /** Header with brand, theme toggle and simple nav actions */
  return (
    <header className="header">
      <div className="brand" onClick={onOpenNotes} role="button" aria-label="Open notes">
        <div className="brand-badge" />
        <div>Ocean Notes</div>
      </div>
      <div className="header-actions">
        <button className="btn btn-ghost" onClick={onOpenNotes} title="Notes">Notes</button>
        <button className="btn btn-ghost" onClick={onOpenSettings} title="Settings">Settings</button>
        <button className="btn" onClick={onToggleTheme} aria-label="Toggle theme">
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </header>
  );
}
