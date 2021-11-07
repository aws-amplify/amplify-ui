import { Card, Button } from '@aws-amplify/ui-react';

interface ExampleProps {
  children: React.ReactNode;
  className?: string;
}

export function ExampleWithCode({ children }) {
  return (
    <Card
      style={{ marginBottom: '1.5rem', width: '100%' }}
      padding="0"
      className="example-card"
    >
      {children}
    </Card>
  );
}

export function Example({ children, className = '' }: ExampleProps) {
  return (
    <div
      className={`example ${className}`}
      style={{
        padding: '1rem',
        borderBottom: 'var(--amplify-borders-primary)',
      }}
    >
      {children}
    </div>
  );
}

export function Code({ children }) {
  return (
    <div className="example-code">
      <Button size="small" className="example-copy-button">
        Copy
      </Button>
      {children}
    </div>
  );
}
