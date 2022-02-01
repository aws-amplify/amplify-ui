import { Hub } from '@aws-amplify/core';
import { renderHook, act } from '@testing-library/react-hooks';

import {
  ACTIONS_CHANNEL,
  ACTION_NAVIGATE_FINISHED,
  ACTION_NAVIGATE_STARTED,
} from '../actions/constants';
import {
  defaultTarget,
  useNavigateAction,
  UseNavigateActionOptions,
} from '../actions/useNavigateAction';

jest.mock('@aws-amplify/core');

describe('useNavigateHook: ', () => {
  let windowSpy: jest.SpyInstance;
  const url = 'https://www.amazon.com/';
  const target = '_blank';
  const anchor = '#about';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const testHubEventEmit = (data: UseNavigateActionOptions) => {
    expect(Hub.dispatch).toHaveBeenCalledTimes(2);
    expect(Hub.dispatch).toHaveBeenCalledWith(ACTIONS_CHANNEL, {
      event: ACTION_NAVIGATE_STARTED,
      data,
    });
    expect(Hub.dispatch).toHaveBeenLastCalledWith(ACTIONS_CHANNEL, {
      event: ACTION_NAVIGATE_FINISHED,
      data,
    });
  };

  it('Should call window.open', () => {
    windowSpy = jest.spyOn(window, 'open').mockImplementation((url, target) => {
      console.log(url, target);
      return window;
    });

    const config: UseNavigateActionOptions = {
      type: 'url',
      url,
    };
    const { result } = renderHook(() => useNavigateAction(config));

    result.current();
    expect(windowSpy).toBeCalledTimes(1);
    expect(windowSpy).toBeCalledWith(url, defaultTarget);

    testHubEventEmit(config);

    windowSpy.mockRestore();
  });

  it('Should call window.open with "_blank" as target', () => {
    windowSpy = jest.spyOn(window, 'open').mockImplementation((url, target) => {
      console.log(url, target);
      return window;
    });

    const config: UseNavigateActionOptions = {
      type: 'url',
      url,
      target,
    };
    const { result } = renderHook(() => useNavigateAction(config));

    result.current();
    expect(windowSpy).toBeCalledTimes(1);
    expect(windowSpy).toBeCalledWith(url, target);

    testHubEventEmit(config);

    windowSpy.mockRestore();
  });

  it('Should change window location hash', () => {
    const config: UseNavigateActionOptions = {
      type: 'anchor',
      anchor,
    };
    const { result } = renderHook(() => useNavigateAction(config));

    expect(window.location.hash).toBe('');
    result.current();
    expect(window.location.hash).toBe(anchor);

    testHubEventEmit(config);
  });

  it('Should call window.reload', () => {
    const location = window.location;
    // reload is a read-only prop and thus cannot be simply spied on
    // https://stackoverflow.com/questions/55712640/jest-testing-window-location-reload
    // @ts-ignore
    delete window.location;

    window.location = {
      ...location,
      reload: jest.fn(),
    };

    const config: UseNavigateActionOptions = {
      type: 'reload',
    };
    const { result } = renderHook(() => useNavigateAction(config));

    result.current();
    expect(window.location.reload).toBeCalledTimes(1);

    testHubEventEmit(config);

    window.location = location;
  });
});
