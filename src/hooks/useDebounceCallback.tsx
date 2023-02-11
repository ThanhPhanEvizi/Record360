import debounce from 'lodash/debounce';
import {useMemo} from 'react';

export function useDebounceCallback<T extends (...args: any) => any>(callback: any, wait?: number) {
  return useMemo(() => debounce(callback, wait), [callback, wait]);
}
