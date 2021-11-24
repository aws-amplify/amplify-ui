import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { Button } from '../../Button';
import { ComponentClassNames } from '../../shared';
import { FieldGroup } from '../FieldGroup';
import { Text } from '../../Text';

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
    expect(fieldGroup).toHaveClass(ComponentClassNames.FieldGroup);
  });

  it('should forward ref to DOM element', async () => {
    const ref = React.createRef<HTMLDivElement>();
    const innerText = '<span>hello</span>';
    render(
      <FieldGroup
        ref={ref}
        testId={testId}
        outerStartComponent={<Button>Click me</Button>}
      >
        {innerText}
      </FieldGroup>
    );

    await screen.findByTestId(testId);
    expect(ref.current.nodeName).toBe('DIV');
    expect(ref.current).toHaveClass(ComponentClassNames.FieldGroup);
  });

  it('should not render hasInnerStart/End ClassName when inner components not provided', async () => {
    render(
      <FieldGroup testId={testId}>
        <Text>Hello</Text>
      </FieldGroup>
    );

    const fieldGroup = await screen.findByTestId(testId);
    expect(fieldGroup).toHaveClass(ComponentClassNames.FieldGroup);
    expect(fieldGroup).not.toHaveClass(
      ComponentClassNames.FieldGroupHasInnerEnd
    );
    expect(fieldGroup).not.toHaveClass(
      ComponentClassNames.FieldGroupHasInnerStart
    );
  });

  it('should render hasInnerStart/End classnames when inner components provided', async () => {
    const innerStart = 'innerStart';
    const innerEnd = 'innerEnd';

    render(
      <FieldGroup
        testId={testId}
        innerEndComponent={innerEnd}
        innerStartComponent={innerStart}
      >
        <Text>Hello</Text>
      </FieldGroup>
    );

    const fieldGroup = await screen.findByTestId(testId);
    expect(fieldGroup).toHaveClass(ComponentClassNames.FieldGroup);
    expect(fieldGroup).toHaveClass(ComponentClassNames.FieldGroupHasInnerStart);
    expect(fieldGroup).toHaveClass(ComponentClassNames.FieldGroupHasInnerEnd);
  });

  it('should render inner components when provided', async () => {
    const innerStart = 'innerStart';
    const innerEnd = 'innerEnd';

    render(
      <FieldGroup
        testId={testId}
        innerEndComponent={innerEnd}
        innerStartComponent={innerStart}
      >
        <Text>Hello</Text>
      </FieldGroup>
    );

    const innerStartComponent = await screen.queryByText(innerStart);
    const innerEndComponent = await screen.queryByText(innerEnd);

    expect(innerStartComponent).not.toBeNull();
    expect(innerEndComponent).not.toBeNull();
    expect(innerStartComponent).toHaveClass(
      ComponentClassNames.FieldGroupInnerStart
    );
    expect(innerEndComponent).toHaveClass(
      ComponentClassNames.FieldGroupInnerEnd
    );
  });

  it('should render outer components when provided', async () => {
    const outerStart = 'outerStart';
    const outerEnd = 'outerEnd';

    render(
      <FieldGroup
        testId={testId}
        outerStartComponent={outerStart}
        outerEndComponent={outerEnd}
      >
        <Text>Hello</Text>
      </FieldGroup>
    );

    const outerStartComponent = await screen.queryByText(outerStart);
    const outerEndComponent = await screen.queryByText(outerEnd);

    expect(outerStartComponent).not.toBeNull();
    expect(outerEndComponent).not.toBeNull();
    expect(outerStartComponent).toHaveClass(
      ComponentClassNames.FieldGroupOuterStart
    );
    expect(outerEndComponent).toHaveClass(
      ComponentClassNames.FieldGroupOuterEnd
    );
  });

  it('should set default horizontal orientation', async () => {
    render(
      <FieldGroup testId={testId}>
        <Text>Hello</Text>
      </FieldGroup>
    );
    const fieldGroup = await screen.findByTestId(testId);
    expect(fieldGroup).toHaveAttribute('data-orientation', 'horizontal');
  });

  it('should set vertical orientation', async () => {
    render(
      <FieldGroup testId={testId} orientation="vertical">
        <Text>Hello</Text>
      </FieldGroup>
    );
    const fieldGroup = await screen.findByTestId(testId);
    expect(fieldGroup).toHaveAttribute('data-orientation', 'vertical');
  });
});
