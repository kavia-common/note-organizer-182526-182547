import React from 'react';

/**
 * PUBLIC_INTERFACE
 */
export default function SearchBar({ value, onChange }) {
  /** Text input to filter notes by title/content/tags */
  return (
    <input
      className="search"
      type="search"
      placeholder="Search notes…"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Search notes"
    />
  );
}
