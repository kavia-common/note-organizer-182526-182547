import React, { useState } from 'react';

/**
 * PUBLIC_INTERFACE
 */
export default function TagChips({ tags, onAdd, onRemove }) {
  /** Chips for tags with inline add control */
  const [value, setValue] = useState('');
  const add = () => {
    const v = value.trim();
    if (v) {
      onAdd(v);
      setValue('');
    }
  };
  return (
    <div className="tag-chips">
      {tags.map(t => (
        <span key={t} className="tag-chip">
          {t}
          <button onClick={() => onRemove(t)} aria-label={`Remove ${t}`}>×</button>
        </span>
      ))}
      <input
        className="input"
        placeholder="Add tag"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && add()}
        style={{ maxWidth: 160 }}
      />
      <button className="btn" onClick={add}>Add</button>
    </div>
  );
}
