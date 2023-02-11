import {useCallback, useState} from 'react';

export function useBoolBag(initState: {[key: string]: boolean} = {}) {
  const [bag, setBag] = useState(initState);

  const toggleBoolBag = useCallback(
    (item: string) => {
      const newBag = {
        ...bag,
        [item]: !bag[item],
      };
      setBag(newBag);
    },
    [bag],
  );

  const setBoolBag = useCallback((item: {[key: string]: boolean}) => {
    setBag(prev => ({...prev, ...item}));
  }, []);
  return {boolBag: bag, toggleBoolBag, setBoolBag};
}
