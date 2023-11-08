import React from 'react';

import { render, waitFor } from '@testing-library/react';
import { RenderNothing } from '@aws-amplify/ui-react-core';

import { createProvider, Variant } from '../../createProvider';

import { mockUseMachineOutput } from '../../context/Machine/__mock__/useMachine';
import * as MachineContext from '../../context/Machine';

const useMachineSpy = jest.spyOn(MachineContext, 'useMachine');

// mock '@aws-amplify/auth' to turn off missing `config` console errors
jest.mock('@aws-amplify/auth');

const CHILD_CONTENT = 'contented';

function TestChildren() {
  return <>{CHILD_CONTENT}</>;
}

const PRIMITIVES = {
  Actions: {
    ButtonGroup: RenderNothing,
    PrimaryButton: RenderNothing,
    SecondaryButton: RenderNothing,
  },
  Container: RenderNothing,
  Description: RenderNothing,
  FederatedProviders: {
    ButtonGroup: RenderNothing,
    Button: RenderNothing,
    Divider: RenderNothing,
  },
  Field: RenderNothing,
  Fieldset: RenderNothing,
  Form: RenderNothing,
  Message: RenderNothing,
  Title: RenderNothing,
  Links: {
    Button: RenderNothing,
    ButtonGroup: RenderNothing,
  },
  SetupTotp: {
    Container: RenderNothing,
    CopyButton: RenderNothing,
    InstructionTextOne: RenderNothing,
    InstructionTextTwo: RenderNothing,
    InstructionTextThree: RenderNothing,
    Loader: RenderNothing,
    Image: RenderNothing,
  },
  VerifyContactMethod: { RadioGroup: RenderNothing },
};

const variants: Variant[] = ['default', 'composable'];

describe('createProvider', () => {
  beforeEach(() => {
    useMachineSpy.mockClear();
  });

  it.each(variants)(
    '%s variant Provider does not render `children` for a non-component route',
    async (variant) => {
      // default `route` is `idle`
      useMachineSpy.mockReturnValue(mockUseMachineOutput);

      const Provider = createProvider({
        platform: 'react',
        primitives: PRIMITIVES,
        variant,
      });

      const { queryByText } = render(
        <Provider>
          <TestChildren />
        </Provider>
      );

      await waitFor(() => {
        expect(queryByText(CHILD_CONTENT)).toBeNull();
      });
    }
  );

  it.each(variants)(
    '%s variant Provider renders `children` for a component route',
    async (variant) => {
      useMachineSpy.mockReturnValue({
        ...mockUseMachineOutput,
        route: 'signIn',
      });

      const Provider = createProvider({
        platform: 'react',
        primitives: PRIMITIVES,
        variant,
      });

      const { queryByText } = render(
        <Provider>
          <TestChildren />
        </Provider>
      );

      await waitFor(() => {
        expect(queryByText(CHILD_CONTENT)).toBeDefined();
      });
    }
  );
});
