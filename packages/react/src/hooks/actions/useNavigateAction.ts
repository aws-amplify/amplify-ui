import * as React from 'react';
import { Hub } from 'aws-amplify';

import {
  ACTIONS_CHANNEL,
  ACTION_NAVIGATE_FINISHED,
  ACTION_NAVIGATE_STARTED,
} from './constants';

export type NavigateType = 'url' | 'anchor' | 'reload';

type NavigateRun = () => void;

export interface UseNavigateActionOptions {
  type: NavigateType;

  url?: string;

  anchor?: string;

  target?: React.HTMLAttributeAnchorTarget;
}

export const defaultTarget = '_self';

/**
 * Action to instruct user’s browser to change current location
 * @internal
 */
export const useNavigateAction = (options: UseNavigateActionOptions) => {
  const { type, url, anchor, target } = options;
  const run: NavigateRun = React.useMemo(() => {
    switch (type) {
      case 'url':
        return () => {
          window.open(url, target ? target : defaultTarget);
        };
      case 'anchor':
        return () => {
          window.location.hash = anchor;
        };
      case 'reload':
        return () => {
          window.location.reload();
        };
      default:
        return () => {
          console.warn(
            'Please provide a valid navigate type. Available types are "url", "anchor" and "reload".'
          );
        };
    }
  }, [anchor, target, type, url]);

  const navigateAction = () => {
    Hub.dispatch(ACTIONS_CHANNEL, {
      event: ACTION_NAVIGATE_STARTED,
      data: options,
    });
    run();
    Hub.dispatch(ACTIONS_CHANNEL, {
      event: ACTION_NAVIGATE_FINISHED,
      data: options,
    });
  };

  return navigateAction;
};
