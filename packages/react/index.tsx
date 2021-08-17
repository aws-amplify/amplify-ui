import { I18n } from '@aws-amplify/core';
import { dict } from '../core';

export * from './src';

I18n.putVocabularies(dict);
