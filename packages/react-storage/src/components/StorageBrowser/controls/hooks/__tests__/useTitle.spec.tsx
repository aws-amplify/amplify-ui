import { useControlsContext } from '../../../controls/context';
import { useTitle } from '../useTitle';

jest.mock('../../../controls/context');

describe('useTitle', () => {
  const data = {
    title: 'ShinyNewTitle',
  };

  const emptyData = {};

  const actionsConfig = {
    isCancelable: true,
    type: 'BATCH_ACTION',
  };

  // assert mocks
  const mockUseControlsContext = useControlsContext as jest.Mock;

  afterEach(() => {
    mockUseControlsContext.mockReset();
  });

  it('returns Title data', () => {
    mockUseControlsContext.mockReturnValue({ data, actionsConfig });

    expect(useTitle()).toStrictEqual({
      props: {
        title: 'ShinyNewTitle',
      },
    });
  });

  it('returns empty string for children if title is missing from data', () => {
    mockUseControlsContext.mockReturnValue({ data: emptyData, actionsConfig });

    expect(useTitle()).toStrictEqual({
      props: {
        title: undefined,
      },
    });
  });
});
