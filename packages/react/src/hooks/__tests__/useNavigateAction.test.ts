import { Hub } from '@aws-amplify/core';

import {
  ACTION_EVENT_STARTED,
  ACTION_EVENT_FINISHED,
  HUB_NAVIGATE_NAMESPACE,
} from '../actions/constants';
import {
  defaultTarget,
  useNavigateAction,
  UseNavigateActionProps,
} from '../actions/useNavigateAction';

jest.mock('@aws-amplify/core');

describe('useNavigateHook: ', () => {
  let windowSpy: jest.SpyInstance;
  const url = 'https://www.amazon.com/';
  const target = '_blank';
  const anchor = '#about';

  const testHubEventEmit = () => {
    expect(Hub.dispatch).toHaveBeenCalledTimes(2);
    expect(Hub.dispatch).toHaveBeenCalledWith(HUB_NAVIGATE_NAMESPACE, {
      event: ACTION_EVENT_STARTED,
    });
    expect(Hub.dispatch).toHaveBeenLastCalledWith(HUB_NAVIGATE_NAMESPACE, {
      event: ACTION_EVENT_FINISHED,
    });
  };

  it('Should call window.open', () => {
    windowSpy = jest.spyOn(window, 'open');

    const config: UseNavigateActionProps = {
      type: 'url',
      url,
    };
    const navigateAction = useNavigateAction(config);

    navigateAction();
    expect(windowSpy).toBeCalledTimes(1);
    expect(windowSpy).toBeCalledWith(url, defaultTarget);

    testHubEventEmit();

    windowSpy.mockRestore();
  });

  it('Should call window.open with "_blank" as target', () => {
    windowSpy = jest.spyOn(window, 'open');

    const config: UseNavigateActionProps = {
      type: 'url',
      url,
      target,
    };
    const navigateAction = useNavigateAction(config);

    navigateAction();
    expect(windowSpy).toBeCalledTimes(1);
    expect(windowSpy).toBeCalledWith(url, target);

    testHubEventEmit();

    windowSpy.mockRestore();
  });

  it('Should change window location hash', () => {
    const config: UseNavigateActionProps = {
      type: 'anchor',
      anchor,
    };
    const navigateAction = useNavigateAction(config);

    navigateAction();
    expect(window.location.hash).toBe(anchor);

    testHubEventEmit();
  });

  it.only('Should call window.reload', () => {
    const location = window.location;
    // reload is a read-only prop and thus cannot be simply spied on
    // @ts-ignore
    delete window.location;

    window.location = {
      ...location,
      reload: jest.fn(),
    };

    const config: UseNavigateActionProps = {
      type: 'reload',
    };
    const navigateAction = useNavigateAction(config);

    navigateAction();
    expect(window.location.reload).toBeCalledTimes(1);

    testHubEventEmit();

    window.location = location;
  });
});
