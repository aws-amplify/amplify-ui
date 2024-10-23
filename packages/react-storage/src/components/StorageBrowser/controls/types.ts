import { ComposableTypes } from '../composables/types';
import { INITIAL_STATUS_COUNTS } from '../views/LocationActionView/constants';

export interface ControlProps {
  className?: string;
}

export interface Controls {
  props: React.ComponentProps<ComposableTypes[keyof ComposableTypes]>;
}

export type ControlKey = keyof ComposableTypes;

export type TaskCounts = typeof INITIAL_STATUS_COUNTS;

export interface ControlsContext {
  data: {
    taskCounts?: TaskCounts;
  };
  actionsConfig: {
    type: 'SINGLE_ACTION' | 'BATCH_ACTION';
    isCancelable: boolean;
    dataRefresh?: {
      onClick?: () => void;
      disabled?: boolean;
    };
  };
}
