import { useControlsContext } from '../../../controls/context';
import { useTitle } from '../useTitle';

jest.mock('../../../controls/context');

describe('useTitle', () => {
  const data = {
    title: 'ShinyNewTitle',
  };

  const mockUseControlsContext = jest.mocked(useControlsContext);

  afterEach(() => {
    mockUseControlsContext.mockReset();
  });

  it('returns Title data', () => {
    mockUseControlsContext.mockReturnValue({ data });

    expect(useTitle()).toStrictEqual({
      title: 'ShinyNewTitle',
    });
  });

  it('returns an undefined value for title when missing from data', () => {
    mockUseControlsContext.mockReturnValue({ data: {} });

    expect(useTitle()).toStrictEqual({
      title: undefined,
    });
  });
});
