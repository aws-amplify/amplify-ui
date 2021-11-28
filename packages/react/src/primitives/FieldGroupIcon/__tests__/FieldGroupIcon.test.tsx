import { render, screen } from '@testing-library/react';
import * as React from 'react';

import { FieldGroupIcon } from '../FieldGroupIcon';

import { ComponentClassNames } from '../../shared/constants';

describe('FieldGroupIcon component', () => {
  const testId = 'fieldGroupTestId';
  it('should render default and custom classname for FieldGroupIcon', async () => {
    render(<FieldGroupIcon className="custom-class" testId={testId} />);

    const fieldGroup = await screen.findByTestId(testId);

    expect(fieldGroup).toHaveClass('custom-class');
    expect(fieldGroup).toHaveClass(ComponentClassNames.FieldGroupIcon);
  });

  it('should forward ref to DOM element', async () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <FieldGroupIcon ref={ref} className="custom-class" testId={testId} />
    );
    await screen.findByTestId(testId);
    expect(ref.current.nodeName).toBe('DIV');
  });
});
