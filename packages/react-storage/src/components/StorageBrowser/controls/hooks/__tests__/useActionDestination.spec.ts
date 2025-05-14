import { renderHook } from '@testing-library/react';
import { LocationPermissions } from '../../../actions';
import { ActionDestinationProps } from '../../../components/composables/ActionDestination';
import { useControlsContext } from '../../context';
import { getNavigationItems } from '../getNavigationItems';
import { getNavigationParts } from '../getNavigationParts';
import { useActionDestination } from '../useActionDestination';

jest.mock('../../../controls/context');
jest.mock('../getNavigationItems');
jest.mock('../getNavigationParts');

describe('useActionDestination', () => {
  const actionDestinationLabel = 'action-destination-label';
  const bucket = 'bucket';
  const data = {
    actionDestinationLabel,
    destination: {
      current: {
        bucket,
        id: 'id',
        permissions: ['delete', 'get', 'list', 'write'] as LocationPermissions,
        prefix: 'prefix/',
        type: 'PREFIX',
      },
      path: 'path/',
      key: 'prefix/path/',
    } as const,
  };
  const mockGetNavigationItems = jest.mocked(getNavigationItems);
  const mockGetNavigationParts = jest.mocked(getNavigationParts);
  const mockUseControlsContext = jest.mocked(useControlsContext);

  beforeEach(() => {
    mockUseControlsContext.mockReturnValue({
      data,
      onSelectDestination: jest.fn(),
    });
    mockGetNavigationItems.mockReturnValue([
      { name: bucket, onNavigate: jest.fn(), isCurrent: true },
    ]);
  });

  afterEach(() => {
    mockUseControlsContext.mockReset();
    mockGetNavigationItems.mockClear();
    mockGetNavigationParts.mockClear();
  });

  it('returns ActionDestination props', () => {
    const { result } = renderHook(() => useActionDestination());

    const expected: ActionDestinationProps = {
      label: actionDestinationLabel,
      items: [
        { name: bucket, onNavigate: expect.any(Function), isCurrent: true },
      ],
      isNavigable: undefined,
    };

    expect(result.current).toStrictEqual(expected);
  });

  it('returns empty items if current location is undefined', () => {
    mockUseControlsContext.mockReturnValue({ data: {} });

    const { result } = renderHook(() => useActionDestination());

    expect(result.current).toStrictEqual({ items: [] });
  });
});
