import React from 'react';
import { create } from 'react-test-renderer';

import Checkbox from '../Checkbox';

const onChange = jest.fn();

describe('Checkbox', () => {
  [true, false].forEach((value) => {
    it(`renders as expected when selected is ${value}`, () => {
      const checkbox = create(
        <Checkbox selected={value} value={value} onChange={onChange} />
      );
      expect(checkbox.toJSON()).toMatchSnapshot();
    });
  });

  it('renders as expected when disabled', () => {
    const checkbox = create(<Checkbox disabled value="" onChange={onChange} />);
    expect(checkbox.toJSON()).toMatchSnapshot();
  });
});
