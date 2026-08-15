/** Hook for copying text with transient "copied" feedback. */
import { useCallback, useEffect, useRef, useState } from "react";
import { copyText } from "../utils/clipboard";

/** Returns a copy function and an isCopied check for a given id. */
export const useCopy = (duration = 2000) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const timer = useRef<number | undefined>(undefined);

  /** Copies text and briefly marks the given id as copied. */
  const copy = useCallback(
    async (text: string, id = "default") => {
      const ok = await copyText(text);
      if (!ok) return;
      setCopiedId(id);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopiedId(null), duration);
    },
    [duration]
  );

  /** Whether the given id is currently marked as copied. */
  const isCopied = useCallback(
    (id = "default") => copiedId === id,
    [copiedId]
  );

  useEffect(() => () => window.clearTimeout(timer.current), []);

  return { copy, isCopied };
};
