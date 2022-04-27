import * as React from 'react';
import { AmplifyProvider } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import './styles.css';

// This wraps the preview frames
export default function FrameComponent({ children }) {
  return <AmplifyProvider>{children}</AmplifyProvider>;
}
