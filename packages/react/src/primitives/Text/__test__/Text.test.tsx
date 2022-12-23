import * as React from 'react';
import kebabCase from 'lodash/kebabCase';
import { render, screen } from '@testing-library/react';

import { Text } from '../Text';
import { ComponentClassNames } from '../../shared';
import { ComponentPropsToStylePropsMap } from '../../types';

describe('Text: ', () => {
  const textText = 'This is a Text primitive';

  it('renders correct defaults', async () => {
    render(<Text>{textText}</Text>);

    const text = await screen.findByText(textText);
    expect(text.innerHTML).toBe(textText);
    expect(text.nodeName).toBe('P');
    expect(text.className).toContain(ComponentClassNames.Text);
  });

  it('should render variation classes for Text', async () => {
    render(
      <div>
        <Text testId="primary" variation="primary">
          primary
        </Text>
        <Text testId="secondary" variation="secondary">
          secondary
        </Text>
        <Text testId="tertiary" variation="tertiary">
          tertiary
        </Text>
        <Text testId="error" variation="error">
          error
        </Text>
        <Text testId="warning" variation="warning">
          warning
        </Text>
        <Text testId="info" variation="info">
          info
        </Text>
        <Text testId="success" variation="success">
          success
        </Text>
      </div>
    );

    const primary = await screen.findByTestId('primary');
    const secondary = await screen.findByTestId('secondary');
    const tertiary = await screen.findByTestId('tertiary');
    const error = await screen.findByTestId('error');
    const warning = await screen.findByTestId('warning');
    const info = await screen.findByTestId('info');
    const success = await screen.findByTestId('success');

    expect(primary.classList).toContain(
      `${ComponentClassNames['Text']}--primary`
    );
    expect(secondary.classList).toContain(
      `${ComponentClassNames['Text']}--secondary`
    );
    expect(tertiary.classList).toContain(
      `${ComponentClassNames['Text']}--tertiary`
    );
    expect(error.classList).toContain(`${ComponentClassNames['Text']}--error`);
    expect(warning.classList).toContain(
      `${ComponentClassNames['Text']}--warning`
    );
    expect(info.classList).toContain(`${ComponentClassNames['Text']}--info`);
    expect(success.classList).toContain(
      `${ComponentClassNames['Text']}--success`
    );
  });

  it('should render the truncated class on Text', async () => {
    render(
      <div>
        <Text testId="truncated" isTruncated={true}>
          truncated
        </Text>
      </div>
    );

    const truncated = await screen.findByTestId('truncated');

    expect(truncated.classList).toContain(
      `${ComponentClassNames['Text']}--truncated`
    );
  });

  it('should forward ref to DOM element', async () => {
    const ref = React.createRef<HTMLParagraphElement>();
    render(<Text ref={ref}>{textText}</Text>);

    await screen.findByText(textText);
    expect(ref.current?.nodeName).toBe('P');
  });

  it('can render a classname for Text', async () => {
    render(<Text className="my-text-component">{textText}</Text>);

    const text = await screen.findByText(textText);
    expect(text.className).toContain('my-text-component');
  });

  it('can render an id for Text', async () => {
    render(<Text id="myTextComponent">{textText}</Text>);

    const text = await screen.findByText(textText);
    expect(text.id).toContain('myTextComponent');
  });

  it('can set the data-truncate attribute', async () => {
    render(<Text isTruncated={true}>{textText}</Text>);

    const text = await screen.findByText(textText);
    expect(text.dataset['truncate']).toBe('true');
  });

  it('can set the data-variation attribute', async () => {
    render(<Text variation="primary">{textText}</Text>);

    const text = await screen.findByText(textText);
    expect(text.dataset['variation']).toBe('primary');
  });

  it('can apply font-family via props', async () => {
    render(<Text fontFamily="Arial">{textText}</Text>);
    const text = await screen.findByText(textText);
    expect(
      text.style.getPropertyValue(
        kebabCase(ComponentPropsToStylePropsMap.fontFamily)
      )
    ).toBe('Arial');
  });

  it('can apply font-style via props', async () => {
    render(<Text fontStyle="italic">{textText}</Text>);
    const text = await screen.findByText(textText);
    expect(
      text.style.getPropertyValue(
        kebabCase(ComponentPropsToStylePropsMap.fontStyle)
      )
    ).toBe('italic');
  });

  it('can apply font-weight via props', async () => {
    render(<Text fontWeight="bold">{textText}</Text>);
    const text = await screen.findByText(textText);
    expect(text).toHaveStyle({
      fontWeight: 'var(--amplify-font-weights-bold)',
    });
  });

  it('can apply font-size via props', async () => {
    const fontSize = '1.2rem';

    render(<Text fontSize={fontSize}>{textText}</Text>);
    const text = await screen.findByText(textText);
    expect(
      text.style.getPropertyValue(
        kebabCase(ComponentPropsToStylePropsMap.fontSize)
      )
    ).toBe(fontSize);
  });

  it('can apply letter-spacing via props', async () => {
    render(<Text letterSpacing="1rem">{textText}</Text>);
    const text = await screen.findByText(textText);
    expect(
      text.style.getPropertyValue(
        kebabCase(ComponentPropsToStylePropsMap.letterSpacing)
      )
    ).toBe('1rem');
  });

  it('can apply line-height via props', async () => {
    render(<Text lineHeight="1rem">{textText}</Text>);
    const text = await screen.findByText(textText);
    expect(
      text.style.getPropertyValue(
        kebabCase(ComponentPropsToStylePropsMap.lineHeight)
      )
    ).toBe('1rem');
  });

  it('can apply text-decoration via props', async () => {
    render(<Text textDecoration="underline">{textText}</Text>);
    const text = await screen.findByText(textText);
    expect(
      text.style.getPropertyValue(
        kebabCase(ComponentPropsToStylePropsMap.textDecoration)
      )
    ).toBe('underline');
  });
});
