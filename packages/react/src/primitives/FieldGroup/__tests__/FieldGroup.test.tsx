import { render, screen } from '@testing-library/react';

import { FieldGroup } from '../FieldGroup';
import { Text } from '../../Text';
import { Button } from '../../Button';

import { ComponentClassNames } from '../../shared';

describe('FieldGroup component', () => {
  const testId = 'fieldGroupTestId';
  it('should render custom classname for FieldGroup', async () => {
    render(
      <FieldGroup className="custom-class" testId={testId}>
        <Text>Hello</Text>
      </FieldGroup>
    );

    const fieldGroup = await screen.findByTestId(testId);

    expect(fieldGroup).toHaveClass('custom-class');
  });

  it('should not render FieldGroup classname when outerStartComponent and outerEndComponent are undefined', async () => {
    render(
      <FieldGroup testId={testId}>
        <Text>Hello</Text>
      </FieldGroup>
    );

    const fieldGroup = await screen.findByTestId(testId);
    expect(fieldGroup).not.toHaveClass(ComponentClassNames.FieldGroup);
  });

  it('should render FieldGroup classname when outerStartComponent provided', async () => {
    render(
      <FieldGroup
        testId={testId}
        outerStartComponent={<Button>Click me</Button>}
      >
        <Text>Hello</Text>
      </FieldGroup>
    );

    const fieldGroup = await screen.findByTestId(testId);
    expect(fieldGroup).toHaveClass(ComponentClassNames.FieldGroup);
  });

  it('should render FieldGroup classname when outerEndComponent provided', async () => {
    render(
      <FieldGroup testId={testId} outerEndComponent={<Button>Click me</Button>}>
        <Text>Hello</Text>
      </FieldGroup>
    );

    const fieldGroup = await screen.findByTestId(testId);
    expect(fieldGroup).toHaveClass(ComponentClassNames.FieldGroup);

    const button = await screen.findByRole('button');
    expect(button.innerHTML).toBe('Click me');
  });

  it('should render FieldGroup classname when outerEndComponent and outerStartComponent provided', async () => {
    render(
      <FieldGroup
        testId={testId}
        outerEndComponent={<Button>Click me</Button>}
        outerStartComponent={<Button>Click me</Button>}
      >
        <Text>Hello</Text>
      </FieldGroup>
    );

    const fieldGroup = await screen.findByTestId(testId);
    expect(fieldGroup).toHaveClass(ComponentClassNames.FieldGroup);

    const buttons = await screen.findAllByRole('button');
    buttons.forEach((button) => {
      expect(button.innerHTML).toBe('Click me');
    });
    expect(buttons.length).toBe(2);
  });
});
