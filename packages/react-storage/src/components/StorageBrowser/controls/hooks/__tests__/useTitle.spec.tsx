import { useControlsContext } from '../../../controls/context';
import { useTitle } from '../useTitle';
import { CLASS_BASE } from '../../../views/constants';

const BLOCK_NAME = `${CLASS_BASE}__title`;

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
        children: 'ShinyNewTitle',
        titleClassName: BLOCK_NAME,
      },
    });
  });

  it('returns empty string for children if title is missing from data', () => {
    mockUseControlsContext.mockReturnValue({ data: emptyData, actionsConfig });

    expect(useTitle()).toStrictEqual({
      props: {
        children: '',
        titleClassName: BLOCK_NAME,
      },
    });
  });
});
