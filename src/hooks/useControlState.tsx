import {Dispatch, SetStateAction, useEffect, useState} from 'react';

/**
 * @param initState
 * @param observables Our deps in which, the first item is our observable. Usually, it's a component prop or redux prop.
 * When the deps changed, our hook will update new obs' value to the component local state.
 * This is called: ControlledState (Control a local state from outside of component)
 */
export function useControlState<S>(
  initState: S | (() => S),
  observables?: [S?, ...Array<any>],
): [S, Dispatch<SetStateAction<S>>, boolean] {
  const [state, setState] = useState<S>(initState);
  useEffect(() => {
    const obs = observables?.[0];
    if (obs !== undefined) {
      setState(obs);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, observables);

  /**
   * @param isAutoControl Means you are using react local state only.
   */
  const isAutoControl = observables?.[0] === undefined;

  return [state, setState, isAutoControl];
}
