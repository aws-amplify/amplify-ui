import { View } from '../View';
import { render, screen } from '@testing-library/react';
import { ComponentPropsToStylePropsMap } from '../../types';
import { kebabCase } from 'lodash';

describe('View: ', () => {
  const viewText = 'Hello from inside a view';

  it('renders correct defaults', async () => {
    const viewId = 'viewId';
    const viewTestId = 'viewTestId';
    render(
      <View id={viewId} testId={viewTestId}>
        {viewText}
      </View>
    );

    const view = await screen.findByText(viewText);
    expect(view.id).toBe(viewId);
    expect(view.dataset['testid']).toBe(viewTestId);
    expect(view.innerHTML).toBe(viewText);
    expect(view.nodeName).toBe('DIV');
  });

  it('can render a <button> HTML element', async () => {
    render(<View as="button">{viewText}</View>);
    const viewButton = await screen.findByRole('button');
    expect(viewButton.nodeName).toBe('BUTTON');
  });

  it('can render a <p> HTML element', async () => {
    render(
      <View as="p" testId="pTagTest">
        {viewText}
      </View>
    );
    const view = await screen.findByTestId('pTagTest');
    expect(view.nodeName).toBe('P');
  });

  it('can render any arbitrary data-* attribute', async () => {
    render(
      <View as="p" data-demo="true" testId="dataTest">
        {viewText}
      </View>
    );
    const view = await screen.findByTestId('dataTest');
    expect(view.dataset['demo']).toBe('true');
  });

  it('can render an aria-label for icon', async () => {
    render(
      <View as="i" ariaLabel="rocket">
        🚀
      </View>
    );
    const view = await screen.findByLabelText('rocket');
    expect(view.nodeName).toBe('I');
  });

  it('can be disabled', async () => {
    render(
      <View as="button" isDisabled={true}>
        Click me!
      </View>
    );
    const view = (await screen.findByRole('button')) as HTMLButtonElement;
    expect(view.disabled).toBe(true);
  });

  it("can set an 'alert' role", async () => {
    const alertMessage =
      '🚨 This is a test of the emergency broadcast system 🚨';
    render(<View role="alert">{alertMessage}</View>);
    const view = await screen.findByRole('alert');
    expect(view.innerHTML).toBe(alertMessage);
  });

  it('can apply styling via props', async () => {
    render(
      <View width="100%" opacity="0.5" borderRadius="6px" testId="stylingTest">
        {viewText}
      </View>
    );
    const view = await screen.findByTestId('stylingTest');
    expect(
      view.style.getPropertyValue(ComponentPropsToStylePropsMap.width)
    ).toBe('100%');
    expect(
      view.style.getPropertyValue(ComponentPropsToStylePropsMap.opacity)
    ).toBe('0.5');
    expect(
      view.style.getPropertyValue(
        kebabCase(ComponentPropsToStylePropsMap.borderRadius)
      )
    ).toBe('6px');
  });
});
