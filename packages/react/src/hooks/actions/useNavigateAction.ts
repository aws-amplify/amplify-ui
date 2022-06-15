import * as React from 'react';
import { Hub } from 'aws-amplify';

import {
  ACTION_NAVIGATE_FINISHED,
  ACTION_NAVIGATE_STARTED,
  EVENT_ACTION_CORE_NAVIGATE,
  UI_CHANNEL,
} from './constants';
import { AMPLIFY_SYMBOL } from '../../helpers/constants';

export type NavigateType = 'url' | 'anchor' | 'reload';

type NavigateRun = () => void;

export interface UseNavigateActionOptions {
  type: NavigateType;

  url?: string;

  anchor?: string;

  target?: React.HTMLAttributeAnchorTarget;
}

export const windowFeatures = 'noopener noreferrer';
export const defaultTarget = '_self';

/**
 * Action to instruct user’s browser to change current location
 * @internal
 */
export const useNavigateAction = (
  options: UseNavigateActionOptions
): (() => void) => {
  const { type, url, anchor, target } = options;
  const run: NavigateRun = React.useMemo(() => {
    switch (type) {
      case 'url':
        return () => {
          window.open(url, target ? target : defaultTarget, windowFeatures);
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
          // eslint-disable-next-line no-console
          console.warn(
            'Please provide a valid navigate type. Available types are "url", "anchor" and "reload".'
          );
        };
    }
  }, [anchor, target, type, url]);

  const navigateAction = () => {
    Hub.dispatch(
      UI_CHANNEL,
      {
        event: ACTION_NAVIGATE_STARTED,
        data: options,
      },
      EVENT_ACTION_CORE_NAVIGATE,
      AMPLIFY_SYMBOL
    );
    run();
    Hub.dispatch(
      UI_CHANNEL,
      {
        event: ACTION_NAVIGATE_FINISHED,
        data: options,
      },
      EVENT_ACTION_CORE_NAVIGATE,
      AMPLIFY_SYMBOL
    );
  };

  return navigateAction;
};
