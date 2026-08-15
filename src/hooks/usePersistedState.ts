/** Hook for state that is persisted to localStorage (single source of truth). */
import { useEffect, useRef, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { storageGet, storageSet } from "@/utils/storage";

interface PersistedStateOptions<T> {
  key: string;
  parse: (raw: string | null) => T;
  serialize: (value: T) => string;
}

/**
 * Returns persisted state plus a setter. Skips persisting the initial mount
 * so a first-visit default isn't written back prematurely.
 */
export const usePersistedState = <T>(
  options: PersistedStateOptions<T>
): [T, Dispatch<SetStateAction<T>>] => {
  const { key, parse, serialize } = options;
  const [state, setState] = useState<T>(() => parse(storageGet(key)));
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (!storageSet(key, serialize(state))) {
      console.warn(`Could not persist "${key}" to localStorage.`);
    }
  }, [key, state, serialize]);

  return [state, setState];
};
