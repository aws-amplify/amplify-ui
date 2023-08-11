import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { LivenessClassNames } from '../../types/classNames';

import { MatchIndicator } from '../MatchIndicator';

describe('MatchIndicator', () => {
  it('should render the component and apply appropriate style properties', async () => {
    const testId = 'match';
    const percentage = 35;
    const { container } = render(
      <MatchIndicator testId={testId} percentage={percentage} />
    );

    const matchIndicator = await screen.findByTestId(testId);
    const matchIndicatorBar = container.getElementsByClassName(
      `${LivenessClassNames.MatchIndicator}__bar`
    );

    expect(matchIndicator).toBeInTheDocument();
    expect(matchIndicatorBar).toHaveLength(1);
    expect(matchIndicatorBar[0]).toHaveStyle({
      '--percentage': `${percentage}%`,
    });
  });

  it('should not render progress over 100', async () => {
    const testId = 'match';
    const percentage = 120;
    const { container } = render(
      <MatchIndicator testId={testId} percentage={percentage} />
    );

    const matchIndicatorBar = container.getElementsByClassName(
      `${LivenessClassNames.MatchIndicator}__bar`
    );

    expect(matchIndicatorBar[0]).toHaveStyle({
      '--percentage': '100%',
    });
  });

  it('should not render progress less than 0', async () => {
    const testId = 'match';
    const percentage = -20;
    const { container } = render(
      <MatchIndicator testId={testId} percentage={percentage} />
    );

    const matchIndicatorBar = container.getElementsByClassName(
      `${LivenessClassNames.MatchIndicator}__bar`
    );

    expect(matchIndicatorBar[0]).toHaveStyle({
      '--percentage': '0%',
    });
  });
});
