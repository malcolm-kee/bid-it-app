import * as React from 'react';

/**
 * `useInterval` is based on [Dan Abromov's blog](https://overreacted.io/making-setinterval-declarative-with-react-hooks/)
 * with additional ability to reset the interval
 * @param callback the callback you want to invoke for each interval
 * @param timeout pass down `null` to pause the interval
 * @return function to reset the current interval
 */
export function useInterval(callback: () => void, timeout: number | null) {
  const savedCallback = React.useRef<typeof callback | null>(null);
  const [resetCount, setResetCount] = React.useState(0);

  // Remember the latest function.
  savedCallback.current = callback;

  // Set up the interval.
  React.useEffect(() => {
    function tick() {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }
    if (timeout !== null) {
      let id = window.setInterval(tick, timeout);
      return () => clearInterval(id);
    }
  }, [timeout, resetCount]);

  return function reset() {
    setResetCount(lastCount => lastCount + 1);
  };
}
