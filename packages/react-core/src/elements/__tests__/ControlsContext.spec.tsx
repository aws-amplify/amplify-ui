import React from 'react';
import { render, renderHook } from '@testing-library/react';

import {
  ControlsContext,
  ControlsProvider,
  withControls,
} from '../ControlsContext';

const ButtonElement = () => <button data-testid="btn-ctrl" />;
const ViewElement = () => <button />;

const controls = { Button: ButtonElement, View: ViewElement };

describe('ControlsContext', () => {
  it('provides the value of `ControlsContext` to consumers', () => {
    const wrapper = ({ children }: { children?: React.ReactNode }) => (
      <ControlsProvider controls={controls}>{children}</ControlsProvider>
    );

    const {
      result: { current: Button },
    } = renderHook(() => React.useContext(ControlsContext)?.['Button'], {
      wrapper,
    });
    expect(Button).toBe(ButtonElement);

    const {
      result: { current: View },
    } = renderHook(() => React.useContext(ControlsContext)?.['View'], {
      wrapper,
    });

    expect(View).toBe(ViewElement);
  });
});

describe('withControls', () => {
  it('renders override Control provided by `ControlsContext`', () => {
    const testId = 'override-control';
    const OverrideControl = () => <button data-testid={testId} />;

    const ButtonControl = withControls(ButtonElement, 'BtnCtrl');

    const { getByTestId } = render(
      <ControlsProvider controls={{ BtnCtrl: OverrideControl }}>
        <ButtonControl />
      </ControlsProvider>
    );

    expect(getByTestId(testId)).toBeDefined();
  });

  it('renders default Control when no override is provided by `ControlsContext`', () => {
    const testId = 'btn-ctrl';
    const ButtonControl = withControls(
      () => <button data-testid="btn-ctrl" />,
      'BtnCtrl'
    );

    const { queryByTestId } = render(
      <ControlsProvider>
        <ButtonControl />
      </ControlsProvider>
    );

    expect(queryByTestId(testId)).toBeDefined();
  });
});
