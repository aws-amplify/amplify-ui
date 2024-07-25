import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  // Should we add logic in here to try and clean up the credential store before we return the empty div?
  // componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
  //   console.error("Uncaught error:", error, errorInfo);
  // }

  render(): React.ReactNode {
    const { hasError } = this.state;
    const { children, fallback } = this.props;

    if (hasError) {
      return fallback;
    }

    return children;
  }
}

export const Fallback = (): React.JSX.Element => (
  <p>Something went wrong. Please try again.</p>
);
