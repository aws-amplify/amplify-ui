import React from 'react';
import { Placeholder } from '@aws-amplify/ui-react';

export function PreviewPlaceholder(): React.JSX.Element {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}
    >
      <div
        style={{
          height: '400px',
          backgroundColor: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Placeholder width="100%" height="100%" />
      </div>

      <div
        style={{
          height: '200px',
          backgroundColor: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Placeholder width="20px" height="20px" />
          <Placeholder width="120px" height="16px" />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Placeholder width="200px" height="14px" />
          <Placeholder width="150px" height="14px" />
          <Placeholder width="180px" height="14px" />
          <Placeholder width="100px" height="14px" />
        </div>

        <div style={{ display: 'flex', gap: '12px', marginTop: 'auto' }}>
          <Placeholder width="100px" height="32px" />
          <Placeholder width="80px" height="32px" />
        </div>
      </div>
    </div>
  );
}
