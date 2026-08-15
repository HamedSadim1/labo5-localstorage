/** Hook for showing a transient toast notice. */
import { useState } from "react";
import { useTimeout } from "./useTimeout";
import { TOAST_DURATION_MS } from "../config";

/** Returns the current notice and a function to show one. */
export const useNotice = () => {
  const [notice, setNotice] = useState<string | null>(null);
  const { schedule } = useTimeout();

  const showNotice = (message: string) => {
    setNotice(message);
    schedule(() => setNotice(null), TOAST_DURATION_MS);
  };

  return { notice, showNotice };
};
