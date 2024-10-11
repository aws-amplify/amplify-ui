import { StatusDisplay } from './StatusDisplay';

const composables = {
  StatusDisplay,
};

export type ComposableTypes = typeof composables;

export interface Composables {
  components?: ComposableTypes;
}
