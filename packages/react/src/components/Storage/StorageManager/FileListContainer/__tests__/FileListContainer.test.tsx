import * as React from 'react';
import { render } from '@testing-library/react';

import { FileListContainer } from '../FileListContainer';
import { View } from '../../../../../primitives';

const CHILD_CONTENT = 'Test Children';

const MockChildren = (): JSX.Element => {
  return <View>{CHILD_CONTENT}</View>;
};

const mockClassName = 'mockClassName';

describe('FileListContainer', () => {
  it('renders as expected', async () => {
    const { container, findByText } = render(
      <FileListContainer className={mockClassName}>
        <MockChildren />
      </FileListContainer>
    );

    expect(container).toMatchSnapshot();

    expect(container.getElementsByClassName(mockClassName)).toHaveLength(1);

    expect(await findByText(CHILD_CONTENT)).toBeVisible();
  });
});
