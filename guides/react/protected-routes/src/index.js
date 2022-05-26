import { createRoot } from 'react-dom/client';
import App from './App';
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);

Amplify.configure(awsExports);
root.render(<App />);
