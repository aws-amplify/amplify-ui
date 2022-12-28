import * as React from 'react';
import kebabCase from 'lodash/kebabCase';
import { render, screen } from '@testing-library/react';

import {
  ComponentPropsToStylePropsMap,
  FlexContainerStyleProps,
} from '../../types';
import { errorMessageWrapper } from '../../utils/testUtils';
import { Flex } from '../Flex';

export const testFlexProps: FlexContainerStyleProps = {
  direction: 'column-reverse',
  gap: '10%',
  justifyContent: 'flex-end',
  alignItems: 'center',
  alignContent: 'space-between',
  wrap: 'wrap',
};

export const expectFlexContainerStyleProps = (element: HTMLElement): void => {
  Object.keys(testFlexProps).forEach((key) => {
    errorMessageWrapper(
      () =>
        expect(
          element.style.getPropertyValue(
            kebabCase(ComponentPropsToStylePropsMap[key])
          )
        ).toBe(testFlexProps[key]),
      `Flex container "${key}" style prop error (see above)`
    );
  });
};

describe('Flex: ', () => {
  const flexText = 'Flex primitive';

  it('can apply styling via props', async () => {
    render(<Flex {...testFlexProps}>{flexText}</Flex>);
    const flex = await screen.findByText(flexText);
    expectFlexContainerStyleProps(flex);
  });

  it('can apply a custom className', async () => {
    render(<Flex className="custom-flex">{flexText}</Flex>);
    const flex = await screen.findByText(flexText);
    expect(flex.classList.contains('custom-flex')).toBe(true);
  });

  it('should forward ref to DOM element', async () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Flex ref={ref}>{flexText}</Flex>);

    await screen.findByText(flexText);
    expect(ref.current?.nodeName).toBe('DIV');
  });

  it('can render any arbitrary data-* attribute', async () => {
    render(
      <Flex data-demo="true" testId="dataTest">
        {flexText}
      </Flex>
    );
    const view = await screen.findByTestId('dataTest');
    expect(view.dataset['demo']).toBe('true');
  });
});
