import { createRoot } from 'react-dom/client';
import App from './App';
import { Amplify } from 'aws-amplify';
import aws_exports from '../../../../environments/auth-with-email/src/aws-exports.js';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);

Amplify.configure(aws_exports);
root.render(<App />);
