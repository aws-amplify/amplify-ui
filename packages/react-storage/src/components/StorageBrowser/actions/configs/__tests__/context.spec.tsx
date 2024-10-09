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
        handler: someCoolHandler,
        isCancelable: false,
        title: 'Do Cool Action',
        type: 'BATCH_ACTION',
      },
    };

    const { result } = renderHook(useActionConfigs, {
      wrapper: (props) => <ActionConfigsProvider {...props} {...configs} />,
    });

    expect(result.current).toStrictEqual(configs);
  });
});
