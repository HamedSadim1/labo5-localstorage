/** Button that copies text to the clipboard with transient feedback. */
import React, { useEffect } from "react";
import { useCopy } from "../hooks/useCopy";
import { Button } from "./Button";
import { CheckIcon, CopyIcon, XIcon } from "./icons";
import { COPY_FEEDBACK_MS } from "../config";

type ButtonVariant = React.ComponentProps<typeof Button>["variant"];
type ButtonSize = React.ComponentProps<typeof Button>["size"];

interface CopyButtonProps {
  text: string;
  id?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  showLabel?: boolean;
  disabled?: boolean;
  duration?: number;
  resetKey?: unknown;
  className?: string;
}

/** Renders a copy button that handles copied/failed feedback internally. */
export const CopyButton: React.FC<CopyButtonProps> = ({
  text,
  id = "default",
  variant = "secondary",
  size = "md",
  showLabel = false,
  disabled = false,
  duration = COPY_FEEDBACK_MS,
  resetKey,
  className = "",
}) => {
  const { copy, isCopied, isFailed, reset } = useCopy(duration);

  // Clear stale feedback when the underlying content changes.
  useEffect(() => {
    reset();
  }, [resetKey, reset]);

  const copied = isCopied(id);
  const failed = isFailed(id);

  return (
    <Button
      variant={variant}
      size={size}
      onClick={() => copy(text, id)}
      disabled={disabled || !text}
      aria-label={
        showLabel
          ? undefined
          : copied
            ? "Copied"
            : failed
              ? "Copy failed"
              : "Copy joke"
      }
      className={className}
    >
      {copied ? (
        <CheckIcon className="h-4 w-4" />
      ) : failed ? (
        <XIcon className="h-4 w-4" />
      ) : (
        <CopyIcon className="h-4 w-4" />
      )}
      {showLabel && (copied ? "Copied!" : failed ? "Copy failed" : "Copy")}
    </Button>
  );
};
