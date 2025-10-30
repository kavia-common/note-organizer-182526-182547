# Ocean Notes (React)

A lightweight notes application built with React following the Ocean Professional theme. Supports localStorage-backed CRUD with a service abstraction and hash-based routing.

## Features

- Local-first notes (create, read, update, delete)
- Pinned and archived flags per note
- Search across title, content, and tags
- Hash routing (no external router)
- Pluggable storage adapter (local by default, API placeholder ready)
- Light/Dark theme toggle

## Quickstart

In the project directory:

- `npm start` — start dev server at http://localhost:3000
- `npm test` — run tests
- `npm run build` — production build

## Using the App

- Click “＋” to create a new note.
- Use the search field (left) to filter notes by title, content, or tags.
- Use “Pin”/“Archive” in the editor toolbar to toggle note state.
- Manage tags below the editor: add via input, remove via the × button on each tag.
- Settings page offers theme toggle and local data reset.

Routing:
- Notes list: `#/notes`
- Specific note: `#/notes/:id`
- Settings: `#/settings`

If no hash is present, the app will normalize to `#/notes`.

## Storage Adapter Toggle

The notes service is adapter-based and defaults to localStorage. You can switch to an API adapter interface (placeholder; implement HTTP calls when backend is ready).

Environment variables (Create React App):
- `REACT_APP_NOTES_STORAGE` — 'local' (default) or 'api'
- `REACT_APP_NOTES_API_URL` — API base URL when using 'api'

Example (local, default):
- No env vars required. Data is saved to `localStorage` under key `notes_app_v1`.

Example (switch to API placeholder):
- Create a `.env` file (do not commit secrets) with:
  ```
  REACT_APP_NOTES_STORAGE=api
  REACT_APP_NOTES_API_URL=https://your-api.example.com
  ```
- Restart the dev server.

Important: The API adapter methods currently throw “not implemented” errors as placeholders. To enable API mode, implement HTTP calls in `src/services/notesService.js` inside `createApiAdapter`.

## Service API (Public Interface)

Methods exposed by the service (both adapters share these signatures):
- `list(): Note[]`
- `get(id: string): Note | undefined`
- `create(partial: Partial<Note>): Note`
- `update(note: Note): Note | undefined`
- `remove(id: string): boolean`
- `togglePin(id: string): Note | undefined`
- `toggleArchive(id: string): Note | undefined`

## Reset Local Data

From Settings:
- Use “Reset Local Data” to clear localStorage and reload the app.

Manually:
- Open DevTools > Application > Local Storage and remove the key `notes_app_v1`.

## Styling

Theme variables are defined in `src/index.css` and component styles in `src/theme.css`.

## Notes

- Do not hardcode configuration values; use the environment variables above.
- Hash routing is implemented internally without external dependencies.
