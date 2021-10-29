import './styles.css';

export * from './components';
export * from './hooks';
export * from './primitives';

export * as components from './components';
export * as primitives from './primitives';

export { defaultTheme, createTheme } from '@aws-amplify/ui';

import { I18n } from 'aws-amplify';
import { translations } from '@aws-amplify/ui';
I18n.putVocabularies(translations);
