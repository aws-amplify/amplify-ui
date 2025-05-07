import { isFunction } from '@aws-amplify/ui';
import type {
  ActionHandler,
  CustomActionConfigs,
  ActionViewConfig,
  ExtendedActionConfigs,
} from '../actions';
import { isDefaultActionViewType } from '../actions';
import type { ActionHandlers } from './types';

const resolveHandler = <V extends ActionHandler | ActionViewConfig>(
  value: V
): ActionHandler => (isFunction(value) ? value : value.handler);

export const getActionHandlers = <
  T extends {
    default: Required<ExtendedActionConfigs>['default'];
    custom?: CustomActionConfigs;
  },
>(
  configs: T
): ActionHandlers => {
  const {
    copy: copyConfig,
    createFolder: createFolderConfig,
    delete: deleteConfig,
    download,
    upload: uploadConfig,
    listLocationItems,
    listLocations,
  } = configs.default;

  const defaultHandlers = {
    copy: copyConfig.handler,
    createFolder: createFolderConfig.handler,
    delete: deleteConfig.handler,
    download,
    listLocationItems,
    listLocations,
    upload: uploadConfig.handler,
  };

  return !configs.custom
    ? defaultHandlers
    : Object.entries(configs.custom).reduce(
        (handlers, [key, config]) =>
          isDefaultActionViewType(key)
            ? handlers
            : { ...handlers, [key]: resolveHandler(config) },
        defaultHandlers
      );
};
