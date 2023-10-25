import * as UserAgentModule from '@aws-amplify/core/internals/utils';
import { SetUserAgentOptions } from '@aws-amplify/ui/src/utils/setUserAgent/setUserAgent';
import { renderHook } from '@testing-library/react-hooks';

import useSetUserAgent from '../useSetUserAgent';

describe('useSetUserAgent', () => {
  const setCustomUserAgentSpy = jest.spyOn(
    UserAgentModule,
    'setCustomUserAgent'
  );

  beforeEach(() => {
    setCustomUserAgentSpy.mockReset();
  });

  it('should call setUserAgent when component mounts', () => {
    const details: SetUserAgentOptions = {
      componentName: 'Authenticator',
      packageName: 'vue',
      version: '1.0.0',
    };
    renderHook(() => useSetUserAgent(details));
    expect(setCustomUserAgentSpy).toHaveBeenCalledTimes(1);
  });
});
