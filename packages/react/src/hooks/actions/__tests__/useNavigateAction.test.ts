import { Hub } from 'aws-amplify';
import { renderHook } from '@testing-library/react-hooks';

import {
  ACTION_NAVIGATE_FINISHED,
  ACTION_NAVIGATE_STARTED,
  EVENT_ACTION_CORE_NAVIGATE,
  UI_CHANNEL,
} from '../constants';
import {
  defaultTarget,
  windowFeatures,
  useNavigateAction,
  UseNavigateActionOptions,
} from '../useNavigateAction';
import { AMPLIFY_SYMBOL } from '../../../helpers/constants';

jest.mock('aws-amplify');

describe('useNavigateHook:', () => {
  let windowSpy: jest.SpyInstance;
  const url = 'https://www.amazon.com/';
  const target = '_blank';
  const anchor = '#about';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const testHubEventEmit = (data: UseNavigateActionOptions) => {
    expect(Hub.dispatch).toHaveBeenCalledTimes(2);
    expect(Hub.dispatch).toHaveBeenCalledWith(
      UI_CHANNEL,
      {
        event: ACTION_NAVIGATE_STARTED,
        data,
      },
      EVENT_ACTION_CORE_NAVIGATE,
      AMPLIFY_SYMBOL
    );
    expect(Hub.dispatch).toHaveBeenLastCalledWith(
      UI_CHANNEL,
      {
        event: ACTION_NAVIGATE_FINISHED,
        data,
      },
      EVENT_ACTION_CORE_NAVIGATE,
      AMPLIFY_SYMBOL
    );
  };

  it('Should call window.open', () => {
    windowSpy = jest.spyOn(window, 'open').mockImplementation(() => {
      return window;
    });

    const config: UseNavigateActionOptions = {
      type: 'url',
      url,
    };
    const { result } = renderHook(() => useNavigateAction(config));

    result.current();
    expect(windowSpy).toBeCalledTimes(1);
    expect(windowSpy).toBeCalledWith(url, defaultTarget, windowFeatures);

    testHubEventEmit(config);

    windowSpy.mockRestore();
  });

  it('Should call window.open with "_blank" as target', () => {
    windowSpy = jest.spyOn(window, 'open').mockImplementation(() => {
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
    expect(windowSpy).toBeCalledWith(url, target, windowFeatures);

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
    const { location } = window;
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
