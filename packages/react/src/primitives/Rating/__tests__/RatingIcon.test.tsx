import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { RatingIcon } from '../RatingIcon';
import { ComponentClassName } from '@aws-amplify/ui';

const CustomIcon = ({ className }: { className: string }) => (
  <svg className={className}></svg>
);

describe('RatingIcon', () => {
  it('should render rating icon class', async () => {
    const { container } = render(
      <div data-testid="custom-element">
        <RatingIcon
          icon={<CustomIcon className="my-custom-component" />}
          className="test-class"
        ></RatingIcon>
      </div>
    );
    const iconSpan = container.getElementsByClassName(
      'test-class'
    )[0] as HTMLElement;
    expect(iconSpan).toHaveClass(ComponentClassName['RatingIcon']);
  });
});
