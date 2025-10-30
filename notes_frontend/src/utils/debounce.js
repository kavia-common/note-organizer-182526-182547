 /**
  * PUBLIC_INTERFACE
  */
export function debounce(fn, wait = 300) {
  /** Returns a debounced version of fn */
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
}
