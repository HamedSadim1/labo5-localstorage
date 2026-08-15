/** Hook for copying text with transient "copied"/"failed" feedback. */
import { useCallback, useEffect, useRef, useState } from "react";
import { copyText } from "../utils/clipboard";

/** Returns a copy function plus copied/failed checks for a given id. */
export const useCopy = (duration = 2000) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [failedId, setFailedId] = useState<string | null>(null);
  const timer = useRef<number | undefined>(undefined);

  /** Copies text and briefly marks the given id as copied or failed. */
  const copy = useCallback(
    async (text: string, id = "default") => {
      const ok = await copyText(text);
      window.clearTimeout(timer.current);
      setCopiedId(ok ? id : null);
      setFailedId(ok ? null : id);
      timer.current = window.setTimeout(() => {
        setCopiedId(null);
        setFailedId(null);
      }, duration);
    },
    [duration]
  );

  /** Whether the given id is currently marked as copied. */
  const isCopied = useCallback(
    (id = "default") => copiedId === id,
    [copiedId]
  );

  /** Whether the given id is currently marked as failed. */
  const isFailed = useCallback(
    (id = "default") => failedId === id,
    [failedId]
  );

  useEffect(() => () => window.clearTimeout(timer.current), []);

  return { copy, isCopied, isFailed };
};
