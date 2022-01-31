import * as React from 'react';
import { Hub } from '@aws-amplify/core';

import {
  ACTION_EVENT_STARTED,
  ACTION_EVENT_FINISHED,
  HUB_NAVIGATE_NAMESPACE,
} from './constants';

type NavigateType = 'url' | 'anchor' | 'reload';

type NavigateRun = () => void;

export interface UseNavigateActionProps {
  type: NavigateType;

  url?: string;

  anchor?: string;

  target?: React.HTMLAttributeAnchorTarget;
}

export const defaultTarget = '_self';

export const useNavigateAction = (props: UseNavigateActionProps) => {
  const { type, url, anchor, target } = props;
  let run: NavigateRun;
  switch (type) {
    case 'url':
      run = () => {
        window.open(url, target ? target : defaultTarget);
      };
      break;
    case 'anchor':
      run = () => {
        window.location.hash = anchor;
      };
      break;
    case 'reload':
      run = () => {
        window.location.reload();
      };
      break;
    default:
      run = () => {
        console.warn(
          'Please provide a valid navigate type. Available types are "url", "anchor" and "reload".'
        );
      };
  }

  const navigateAction = () => {
    Hub.dispatch(HUB_NAVIGATE_NAMESPACE, { event: ACTION_EVENT_STARTED });
    run();
    Hub.dispatch(HUB_NAVIGATE_NAMESPACE, { event: ACTION_EVENT_FINISHED });
  };

  return navigateAction;
};
