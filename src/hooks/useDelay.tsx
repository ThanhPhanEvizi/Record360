import {useCallback, useState} from 'react';

export function useDelay(delayTime = 2000) {
  const [isDelaying, setIsDelaying] = useState(false);

  const startDelay = useCallback(() => {
    setIsDelaying(true);
    setTimeout(() => {
      setIsDelaying(false);
    }, delayTime);
  }, [delayTime]);

  return {
    isDelaying,
    startDelay,
  };
}
