import { Component } from 'react';

import type { ReactNode, ErrorInfo } from 'react';

type Props = {
  children?: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

export default class ErrorBoundary extends Component<
  Props,
  ErrorBoundaryState
> {
  constructor(props: Props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    const data = {
      path: window.location.pathname,
      error: {
        msg: error.message,
        stack: errorInfo.componentStack.split('\n'),
      },
    };

    console.log(data);
    // send data to server / logger
  }

  render(): ReactNode {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return <div>Error</div>;
    }

    return children;
  }
}
