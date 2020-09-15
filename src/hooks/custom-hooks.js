import { useState, useCallback, useEffect } from 'react';

// custom hook for Drawer
export function useModalState(defaultValue = false) {

  const [isOpen, setIsOpen] = useState(defaultValue);

  // useCallback hook to memoize function 
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return { isOpen, open, close }
}

// usage
// const is992px = useMediaQuery('(max-width: 992px)')
// this hook accesses the window.matchMedia api & it allows us to 
// manipulate media query programmatically
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
