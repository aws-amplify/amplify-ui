import React from 'react';
import { renderHook } from '@testing-library/react';

import { defaultActionConfigs } from '../defaults';
import { ActionViewConfigs } from '../types';

import { ActionConfigsProvider, useActionConfigs } from '../context';

describe('useActionConfigs', () => {
  it('returns default and custom config values passed to `ActionConfigsProvider`', () => {
    const someCoolHandler = jest.fn();
    const configs: ActionViewConfigs = {
      copy: defaultActionConfigs.copy,
      upload: defaultActionConfigs.upload,
      SomeCoolAction: {
        viewName: 'SomeCoolView',
        handler: someCoolHandler,
        actionListItem: {
          icon: 'info',
          label: 'Do something cool',
        },
      },
    };

    const { result } = renderHook(useActionConfigs, {
      wrapper: (props) => (
        <ActionConfigsProvider {...props} actionConfigs={configs} />
      ),
    });

    expect(result.current.actionConfigs).toStrictEqual(configs);
  });
});
