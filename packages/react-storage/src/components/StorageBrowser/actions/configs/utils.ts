import { isObject } from '@aws-amplify/ui';
import type {
  ActionViewConfig,
  ExtendedActionConfigs,
  ActionViewConfigs,
} from './types';

const isActionConfig = (value: unknown): value is ActionViewConfig =>
  isObject(value);

export const getActionConfigs = (
  configs: ExtendedActionConfigs
): ActionViewConfigs => {
  return Object.entries({ ...configs.default, ...configs.custom }).reduce(
    (configs: ActionViewConfigs, [type, config]) =>
      !isActionConfig(config) ? configs : { ...configs, [type]: config },
    {}
  );
};
