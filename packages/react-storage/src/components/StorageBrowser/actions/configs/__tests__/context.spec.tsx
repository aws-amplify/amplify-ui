import React from 'react';
import { renderHook } from '@testing-library/react';

import { defaultActionConfigs } from '../defaults';
import { ActionConfigs } from '../types';

import { ActionConfigsProvider, useActionConfigs } from '../context';

describe('useActionConfigs', () => {
  it('returns default and custom config values passed to `ActionConfigsProvider`', () => {
    const someCoolHandler = jest.fn();
    const configs: ActionConfigs = {
      ...defaultActionConfigs,
      SomeCoolAction: {
        componentName: 'SomeCoolView',
        handler: someCoolHandler,
        isCancelable: false,
        displayName: 'Do Cool Action',
      },
    };

    const { result } = renderHook(useActionConfigs, {
      wrapper: (props) => (
        <ActionConfigsProvider {...props} actions={configs} />
      ),
    });

    expect(result.current.actions).toStrictEqual(configs);
  });
});
