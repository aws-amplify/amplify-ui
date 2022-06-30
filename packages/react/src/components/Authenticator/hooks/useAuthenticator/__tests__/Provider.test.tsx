import { render } from '@testing-library/react';
import * as React from 'react';
import { Hub } from 'aws-amplify';

import { Provider } from '../';

const hubListenSpy = jest.spyOn(Hub, 'listen');

describe('Authenticator.Provider', () => {
  it('listens to Auth Hub events on init', () => {
    render(
      <Provider>
        <></>
      </Provider>
    );

    expect(hubListenSpy).toBeCalledTimes(1);
    expect(hubListenSpy).toHaveBeenCalledWith(
      'auth',
      expect.any(Function),
      'authenticator-hub-handler'
    );
  });
});
