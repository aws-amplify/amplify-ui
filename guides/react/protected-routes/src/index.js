import { createRoot } from 'react-dom/client';
import App from './App';
import { Amplify } from 'aws-amplify';

/**
 * Following along with the
 * tutorial https://ui.docs.amplify.aws/react/guides/auth-protected?
 * Update this import to match the path to your aws-exports.js file:
 * import aws_exports from "./aws-exports";
 */
import aws_exports from '../../../../environments/auth/auth-with-email/src/aws-exports';

import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);

Amplify.configure(aws_exports);
root.render(<App />);
