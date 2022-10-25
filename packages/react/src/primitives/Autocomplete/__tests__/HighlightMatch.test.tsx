import { render, screen } from '@testing-library/react';
import * as React from 'react';

import { HighlightMatch } from '../HighlightMatch';
import { getTestId } from '../../utils/testUtils';

describe('HighlightMatch: ', () => {
  const testId = 'highlight-match-test-id';
  const query = 'query';
  it('should highlight matched substring in children', async () => {
    render(
      <HighlightMatch testId={testId} query={query}>
        There is a query.
      </HighlightMatch>
    );

    const match = screen.queryByTestId(getTestId(testId, 'match'));
    expect(match).toBeInTheDocument();
    expect(match?.nodeName).toBe('STRONG');
  });

  it('should not highlight any substring in children if there is no match', async () => {
    render(
      <HighlightMatch testId={testId} query={query}>
        There is no match.
      </HighlightMatch>
    );

    const match = screen.queryByTestId(getTestId(testId, 'match'));
    expect(match).toBeNull();
  });
});
