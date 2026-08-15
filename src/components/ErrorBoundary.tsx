/** Error boundary that catches unexpected render errors. */
import React from "react";
import { Button } from "./Button";
import { FrownIcon } from "./icons";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

/** Shows a reload fallback instead of a blank screen on unexpected errors. */
class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("Unexpected render error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#faf6f0] px-6 text-center dark:bg-[#0b0c0f]">
          <FrownIcon className="h-10 w-10 text-orange-500" />
          <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            Something went wrong
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            An unexpected error occurred. Please reload the page.
          </p>
          <Button variant="primary" onClick={() => window.location.reload()}>
            Reload
          </Button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
