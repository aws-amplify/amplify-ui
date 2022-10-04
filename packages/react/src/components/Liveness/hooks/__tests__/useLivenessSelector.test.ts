import { renderHook } from '@testing-library/react-hooks';
import { useSelector } from '@xstate/react';

import { getMockedFunction } from '../../utils/test-utils';
import { useFaceLivenessDetector } from '../../providers';
import { useLivenessSelector } from '../useLivenessSelector';

jest.mock('@xstate/react');
jest.mock('../../providers');

const mockedUseLivenessFlow = getMockedFunction(useFaceLivenessDetector);
const mockedUseSelector = getMockedFunction(useSelector);

describe('useLivenessSelector', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return the selector', () => {
    const selector = jest.fn();
    const service = {};
    const value = {};

    mockedUseLivenessFlow.mockReturnValue({ service } as any);
    mockedUseSelector.mockReturnValue(value);

    const { result } = renderHook(() => useLivenessSelector(selector));

    expect(result.current).toBe(value);
    expect(mockedUseLivenessFlow).toHaveBeenCalledTimes(1);
    expect(mockedUseSelector).toHaveBeenCalledWith(service, selector);
  });
});
