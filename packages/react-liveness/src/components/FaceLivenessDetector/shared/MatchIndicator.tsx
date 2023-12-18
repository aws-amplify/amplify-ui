import React from 'react';
import { LivenessClassNames } from '../types/classNames';

interface MatchIndicatorProps {
  percentage: number;
  initialPercentage?: number;
  testId?: string;
}

export const MatchIndicator: React.FC<MatchIndicatorProps> = ({
  percentage,
  initialPercentage = 25,
  testId,
}) => {
  const [matchPercentage, setMatchPercentage] =
    React.useState<number>(initialPercentage);

  React.useEffect(() => {
    if (percentage < 0) {
      setMatchPercentage(0);
    } else if (percentage > 100) {
      setMatchPercentage(100);
    } else {
      setMatchPercentage(percentage);
    }
  }, [percentage]);

  const percentageStyles = {
    '--percentage': `${matchPercentage}%`,
  } as React.CSSProperties;

  return (
    <div className={LivenessClassNames.MatchIndicator} data-testid={testId}>
      <div
        className={`${LivenessClassNames.MatchIndicator}__bar`}
        style={percentageStyles}
        role="progressbar"
        aria-label="MatchIndicator"
        aria-valuenow={percentage}
        aria-valuetext={`${percentage}% face fit`}
      ></div>
    </div>
  );
};
