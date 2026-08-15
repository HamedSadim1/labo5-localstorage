/** Hook for scheduling a single transient timer that auto-clears on unmount. */
import { useCallback, useEffect, useRef } from "react";

/** Returns `schedule` (replaces any pending timer) and `cancel`. */
export const useTimeout = () => {
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const schedule = useCallback((callback: () => void, ms: number) => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(callback, ms);
  }, []);

  const cancel = useCallback(() => {
    window.clearTimeout(timer.current);
  }, []);

  return { schedule, cancel };
};
