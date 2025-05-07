import type React from 'react';
import { capitalize, isFunction, isObject } from '@aws-amplify/ui';

import type { CustomActionConfigs } from '../../actions';
import { DEFAULT_ACTION_VIEWS } from './actionViews';
import { DEFAULT_PRIMARY_VIEWS } from './primaryViews';
import type {
  DefaultActionViewsByActionName,
  StorageBrowserViews,
} from '../types';
import type { ViewsContextType } from './types';

export const getViews = (
  views?: StorageBrowserViews,
  customConfigs?: CustomActionConfigs
): ViewsContextType => {
  const resolvedDefaultActionViews = Object.entries(
    DEFAULT_ACTION_VIEWS
  ).reduce((output, [actionName, component]) => {
    // use viewName to lookup overrides for default action views
    const viewName = capitalize(
      `${actionName}View` as keyof StorageBrowserViews
    );
    return {
      ...output,
      [actionName]: (views?.[viewName] ?? component) as React.ComponentType,
    };
  }, {} as DefaultActionViewsByActionName);

  const customActionViews = !isObject(customConfigs)
    ? {}
    : Object.entries(customConfigs).reduce((acc, [key, config]) => {
        // ignore custom actions that are only handlers
        return !isObject(config) || isFunction(config)
          ? acc
          : {
              ...acc,
              [key]: views?.[config.viewName as keyof StorageBrowserViews],
            };
      }, {});

  return {
    action: { ...resolvedDefaultActionViews, ...customActionViews },
    primary: {
      LocationActionView:
        views?.LocationActionView ?? DEFAULT_PRIMARY_VIEWS.LocationActionView,
      LocationDetailView:
        views?.LocationDetailView ?? DEFAULT_PRIMARY_VIEWS.LocationDetailView,
      LocationsView:
        views?.LocationsView ?? DEFAULT_PRIMARY_VIEWS.LocationsView,
    },
  };
};
