import * as React from 'react';
import { render } from '@testing-library/react';

import { View } from '@aws-amplify/ui-react';

import { Container } from '../Container';

const CHILD_CONTENT = 'Test Children';

const MockChildren = (): JSX.Element => {
  return <View>{CHILD_CONTENT}</View>;
};

const mockClassName = 'mockClassName';

describe('Container', () => {
  it('renders as expected', async () => {
    const { container, findByText } = render(
      <Container className={mockClassName}>
        <MockChildren />
      </Container>
    );

    expect(container).toMatchSnapshot();

    expect(container.getElementsByClassName(mockClassName)).toHaveLength(1);

    expect(await findByText(CHILD_CONTENT)).toBeVisible();
  });
});
