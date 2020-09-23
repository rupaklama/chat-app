import { useState, useCallback, useEffect } from 'react';

// custom hook to apply on Modal in react suite
// returning boolean values
export function useModalState(defaultValue = false) {

  const [isOpen, setIsOpen] = useState(defaultValue);

  // useCallback hook to memoize function 
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return { isOpen, open, close }
}

// usage
// const is992px = useMediaQuery('(max-width: 992px)')
// this hook accesses the window.matchMedia method api & it allows us to 
// manipulate media query programmatically

// The window.matchMedia() method returns a MediaQueryList object representing the results 
// of the specified CSS media query string.
// e.g window.matchMedia("(max-width: 700px)").matches

export const useMediaQuery = query => {
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches
  );

  useEffect(() => {
    const queryList = window.matchMedia(query);
    setMatches(queryList.matches);

    const listener = evt => setMatches(evt.matches);

    queryList.addListener(listener);
    
    return () => queryList.removeListener(listener);
  }, [query]);

  return matches;
};

// The MediaQueryList object has two properties and two methods:
// 1. matches - Used to check the results of a query. 
// Returns a boolean value: true if the document matches the media query list, otherwise false
// 2. media - A String, representing the serialized media query list

// To use window.matchMedia() in a responsive manner, 
// to make your code react to a CSS media query whenever the window state changes, 
// you can use its methods/event handlers

// addListener(functionref)	- Adds a new listener function, which is executed whenever 
// the media query's evaluated result changes
// removeListener(functionref) - Removes a previously added listener function from the media query list. 
// Does nothing if the specified listener is not already in the list