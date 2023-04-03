import React from 'react';
import { LivenessClassNames } from '../types/classNames';

interface MatchIndicatorProps {
  percentage: number;
}

export const MatchIndicator: React.FC<MatchIndicatorProps> = ({
  percentage,
}) => {
  const percentageStyles = {
    '--percentage': `${percentage}%`,
  } as React.CSSProperties;

  return (
    <div className={LivenessClassNames.MatchIndicator}>
      <div
        className={`${LivenessClassNames.MatchIndicator}__bar`}
        style={percentageStyles}
      ></div>
      <div
        className={`${LivenessClassNames.MatchIndicator}__pin`}
        style={percentageStyles}
      ></div>
    </div>
  );
};
