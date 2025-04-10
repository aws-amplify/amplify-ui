import React from 'react';

import { STORAGE_BROWSER_BLOCK_TO_BE_UPDATED } from '../components';

interface ErrorBoundaryState {
  hasError: boolean;
}

const Fallback = (): React.JSX.Element => (
  <div className={STORAGE_BROWSER_BLOCK_TO_BE_UPDATED}>
    <div className={`${STORAGE_BROWSER_BLOCK_TO_BE_UPDATED}__error-boundary`}>
      Something went wrong.
    </div>
  </div>
);

export type ErrorBoundaryType = React.ComponentType<React.PropsWithChildren>;

export class ErrorBoundary extends React.Component<
  React.PropsWithChildren,
  ErrorBoundaryState
> {
  constructor(props: React.PropsWithChildren) {
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
