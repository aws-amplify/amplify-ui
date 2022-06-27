import { render, screen } from '@testing-library/react';
import * as React from 'react';
import { Hub } from 'aws-amplify';

import { Provider } from '../';
import * as UI from '@aws-amplify/ui';

jest.mock('@aws-amplify/ui', () => ({
  ...(jest.requireActual('@aws-amplify/ui') as {}),
  defaultAuthHubHandler: jest.fn(),
}));

const hubListenSpy = jest.spyOn(Hub, 'listen');
const hubHandlerSpy = jest.spyOn(UI, 'defaultAuthHubHandler');

describe('Authenticator.Provider', () => {
  it('listens to Auth Hub events on init', () => {
    render(
      <Provider>
        <></>
      </Provider>
    );

    expect(hubListenSpy).toBeCalledTimes(1);
  });

  it('responds to tokenRefresh event', () => {
    render(
      <Provider>
        <></>
      </Provider>
    );

    Hub.dispatch('auth', {
      event: 'tokenRefresh',
    });

    expect(hubHandlerSpy).toHaveBeenCalledTimes(1);
  });
});
