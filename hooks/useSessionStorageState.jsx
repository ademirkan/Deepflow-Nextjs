import { useState, useEffect } from "react";

export default function useSessionStorageState(key, init) {
    // if exists in session storage, use that. Else, use init (make sure to account for string JSON).
    let currSessionStorageString = sessionStorage.getItem(key);

    // initial value to be stored in state
    init = currSessionStorageString
        ? JSON.parse(currSessionStorageString)
        : init;

    // State
    const [state, setState] = useState(init);

    // set initial storage value if nothing is currently stored in key
    useEffect(() => {
        if (!currSessionStorageString)
            sessionStorage.setItem(
                key,
                typeof init === "string" ? `"${init}"` : init
            );
    }, []);

    return [
        state,
        (value) => {
            setState(value);
            sessionStorage.setItem(
                key,
                typeof value === "string" ? `"${value}"` : JSON.stringify(value)
            );
        },
    ];
}
