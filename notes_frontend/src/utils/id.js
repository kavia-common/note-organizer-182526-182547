 /**
  * PUBLIC_INTERFACE
  */
export function generateId() {
  /** Generates a random url-safe id */
  return (
    Date.now().toString(36) +
    Math.random().toString(36).slice(2, 8)
  );
}
