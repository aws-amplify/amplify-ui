import { useStatusDisplay } from '../useStatusDisplay';
import { useControl } from '../useControl';

jest.mock('../useStatusDisplay');

describe('useControl', () => {
  const statusDisplayProps = { props: {} };
  // assert mocks
  const mockUseStatusDisplay = useStatusDisplay as jest.Mock;

  beforeAll(() => {
    mockUseStatusDisplay.mockReturnValue(statusDisplayProps);
  });

  it('returns control data', () => {
    expect(useControl('StatusDisplay')).toBe(statusDisplayProps);
  });
});
