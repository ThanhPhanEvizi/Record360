import React, {useEffect, useRef} from 'react';

// still in development
export function useIsDirty(inputs: any) {
  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current += 1;
  }, [inputs]);

  return renderCount.current > 1;
}
