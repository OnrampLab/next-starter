import { useRef, useState, useEffect, Dispatch } from 'react';

export function useAsync<T extends Function, DispatchValue = PromiseResolve<T>>({
  callback,
  initState = false,
  dispatchFn = () => {},
}: {
  callback: T;
  initState?: boolean;
  dispatchFn?: Dispatch<DispatchValue>;
}) {
  const [state, setState] = useState(initState);
  const fn = useRef<any>(null);
  const _setStateRef = useRef(setState);
  const fnToDispatch = useRef<typeof dispatchFn>(dispatchFn);

  _setStateRef.current = setState;
  fnToDispatch.current = dispatchFn;

  useEffect(() => {
    fn.current = async (...arg: any) => {
      _setStateRef.current(true);
      try {
        const result = await callback(...arg);
        fnToDispatch.current(result);
        return result;
      } catch (error) {
        throw error;
      } finally {
        _setStateRef.current(false);
      }
    };
  }, [callback]);

  useEffect(
    () => () => {
      // prevent memory stack overflow
      fn.current = async () => {};
      fnToDispatch.current = _setStateRef.current = () => {};
    },
    [],
  );

  return {
    fetchingState: state,
    requestMethod: () => (fn.current as T)(),
  };
}
