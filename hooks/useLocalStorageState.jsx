import { useState, useEffect } from "react";

function useLocalStorageState(key, init) {
  // get the current value of the key in local storage, or the initial value if it doesn't exist
  const [state, setState] = useState(() => {
    try {
      const value = window.localStorage.getItem(key);
      return value ? JSON.parse(value) : init;
    } catch (e) {
      return init;
    }
  });

  useEffect(() => {
    // update the value in local storage whenever the state changes
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}

export default useLocalStorageState;
