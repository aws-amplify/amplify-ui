import React from 'react';

import { CLASS_BASE } from '../Views/constants';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

const Fallback = (): React.JSX.Element => (
  <div className={CLASS_BASE}>
    <div className={`${CLASS_BASE}__error`}>
      Something went wrong. Please try again.
    </div>
  </div>
);

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

  render(): React.ReactNode {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      return <Fallback />;
    }

    return children;
  }
}
