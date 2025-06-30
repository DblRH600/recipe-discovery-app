// custom hook
import { useState, useEffect } from "react";

function useLocalStorage (key, initialValue) {
    // set the state & logic variables
    const [storedData, setStoredData] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (e) {
            return initialValue;
        }
    });

    useEffect (() => {
        window.localStorage.setItem(key, JSON.stringify(storedData));
    }, [key, storedData]);

    return [storedData, setStoredData];
}

export default useLocalStorage;