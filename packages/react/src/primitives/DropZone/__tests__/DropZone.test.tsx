import * as React from 'react';
import { render } from '@testing-library/react';
import { DropZone } from '../DropZone';
import { ComponentClassNames } from '../../shared';

describe('DropZone', () => {
  it('should match snapshot', () => {
    const { container } = render(
      <DropZone onDrop={() => {}} maxFileCount={1} />
    );
    expect(container).toMatchSnapshot();
  });
});
