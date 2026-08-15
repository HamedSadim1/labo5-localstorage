/** Hook for copying text with transient "copied"/"failed" feedback. */
import { useCallback, useState } from "react";
import { copyText } from "@/utils/clipboard";
import { useTimeout } from "@/hooks/useTimeout";
import { COPY_FEEDBACK_MS } from "@/config";

/** Returns a copy function plus copied/failed checks for a given id. */
export const useCopy = (duration = COPY_FEEDBACK_MS) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [failedId, setFailedId] = useState<string | null>(null);
  const { schedule, cancel } = useTimeout();

  /** Copies text and briefly marks the given id as copied or failed. */
  const copy = useCallback(
    async (text: string, id = "default") => {
      const ok = await copyText(text);
      setCopiedId(ok ? id : null);
      setFailedId(ok ? null : id);
      schedule(() => {
        setCopiedId(null);
        setFailedId(null);
      }, duration);
    },
    [duration, schedule]
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

  /** Clears any copied/failed feedback immediately. */
  const reset = useCallback(() => {
    cancel();
    setCopiedId(null);
    setFailedId(null);
  }, [cancel]);

  return { copy, isCopied, isFailed, reset };
};
