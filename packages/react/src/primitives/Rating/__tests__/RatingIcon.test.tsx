import * as React from 'react';
import { render } from '@testing-library/react';

import { ComponentClassName } from '@aws-amplify/ui';
import { RatingIcon } from '../RatingIcon';

const CustomIcon = ({ className }: { className: string }) => (
  <svg className={className}></svg>
);

describe('RatingIcon', () => {
  it('should render rating icon class', () => {
    const { container } = render(
      <RatingIcon
        className="test-class"
        icon={<CustomIcon className="dummy-icon" />}
      />
    );

    const iconSpan = container.getElementsByClassName(
      'test-class'
    )[0] as HTMLElement;
    expect(iconSpan).toHaveClass(ComponentClassName['RatingIcon']);
  });
});
