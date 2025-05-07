import { renderHook } from '@testing-library/react';

import { TitleProps } from '../../../components/composables/Title';
import { useControlsContext } from '../../context';

import { useTitle } from '../useTitle';

jest.mock('../../../controls/context');

describe('useTitle', () => {
  const data = { title: 'title' };

  const mockUseControlsContext = jest.mocked(useControlsContext);

  beforeEach(() => {
    mockUseControlsContext.mockReturnValue({ data });
  });

  afterEach(() => {
    mockUseControlsContext.mockReset();
  });

  it('returns Title props', () => {
    const { result } = renderHook(() => useTitle());

    const expected: TitleProps = { title: data.title };

    expect(result.current).toStrictEqual(expected);
  });
});
