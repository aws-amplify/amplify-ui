import { StatusDisplay } from './StatusDisplay';
import { Title } from './Title';

const composables = {
  StatusDisplay,
  Title,
};

export type ComposableTypes = typeof composables;

export interface Composables {
  composables?: ComposableTypes;
}
