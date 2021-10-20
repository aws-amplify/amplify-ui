import { Card, Button } from '@aws-amplify/ui-react';

interface ExampleProps {
  children: React.ReactNode;
  className?: string;
}


export function ExampleWithCode({ children }) {
  return (
    <Card
      // backgroundColor="rgba(249, 250, 251, 1)"
      // borderRadius="0.25rem"
      // boxShadow="inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)"
      style={{ marginBottom: '1.5rem', width:'100%' }}
      padding="0"
      className="example-card"
    >
      {children}
    </Card>
  );
}

export function Example({ children, className = '' }: ExampleProps) {
  return (
    <div className={`example ${className}`}
      style={{padding: '1rem', borderBottom:'var(--amplify-borders-primary)'}}>
      {children}
    </div>
  )
}

export function Code({ children }) {
  return (
    <div className="example-code">
      <Button size="small" className="example-copy-button">Copy</Button>
      {children}
    </div>
  )
}
