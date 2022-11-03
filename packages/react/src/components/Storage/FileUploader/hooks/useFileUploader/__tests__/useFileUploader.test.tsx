import { renderHook } from '@testing-library/react-hooks';
import { useFileUploader } from '..';

// mock `aws-amplify` to prevent logging auth errors during test runs
jest.mock('aws-amplify');

describe('useFileUploader', () => {
  beforeEach(() => {});

  it('exists', () => {
    const { result } = renderHook(() => useFileUploader(200, [], true));

    expect(result).toBeTruthy();
  });
});
