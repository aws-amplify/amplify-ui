import { renderHook } from '@testing-library/react-hooks';

import * as UserAgentModule from '@aws-amplify/ui';

import useSetUserAgent from '../useSetUserAgent';

describe('useSetUserAgent', () => {
  it('should call setUserAgent when component mounts', () => {
    const setCustomUserAgentSpy = jest.spyOn(UserAgentModule, 'setUserAgent');

    const details: UserAgentModule.SetUserAgentOptions = {
      componentName: 'Authenticator',
      packageName: 'vue',
      version: '1.0.0',
    };

    renderHook(() => useSetUserAgent(details));

    expect(setCustomUserAgentSpy).toHaveBeenCalledTimes(1);
    expect(setCustomUserAgentSpy).toHaveBeenCalledWith(details);
  });
});
