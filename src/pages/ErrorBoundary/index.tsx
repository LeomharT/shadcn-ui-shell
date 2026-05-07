import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { IconAlertTriangle } from '@tabler/icons-react';
import React, { type ErrorInfo } from 'react';

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error; errorInfo?: ErrorInfo }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: undefined, errorInfo: undefined };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    this.setState({ ...this.state, error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <Alert className='w-full border-red-200 bg-red-50 text-red-900 dark:border-red-900 dark:bg-red-950 dark:text-red-50'>
          <IconAlertTriangle />
          <AlertTitle>
            {this.state.error?.name}: {this.state.error?.message}
          </AlertTitle>
          <AlertDescription>
            <pre>{this.state.errorInfo?.componentStack}</pre>
          </AlertDescription>
        </Alert>
      );
    }

    return this.props.children;
  }
}
