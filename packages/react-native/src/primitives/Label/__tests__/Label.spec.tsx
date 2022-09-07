import React from 'react';
import TestRenderer from 'react-test-renderer';
import Label from '../Label';

describe('Heading', () => {
  it('renders a level 6 Heading by default', () => {
    const defaultLabel = TestRenderer.create(<Label>Default Label</Label>);

    expect(defaultLabel.toJSON()).toMatchSnapshot();
  });

  it('applies style props', () => {
    const customStyle = { color: 'red' };

    const styledLabel = TestRenderer.create(
      <Label style={customStyle}>Red Label</Label>
    );

    expect(styledLabel.toJSON()).toMatchSnapshot();
    expect(styledLabel.root.props.style).toBe(customStyle);
  });
});
