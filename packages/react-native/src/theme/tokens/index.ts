import { components } from './components';
import { ComponentStyles } from '../types';

interface BaseTokens {}

export interface Tokens extends BaseTokens {
  components: ComponentStyles;
}

export const tokens: Tokens = {
  components,
};
