import * as React from 'react';

export const useCollectionProps = (defaultValues) => {
  const [direction, setDirection] = React.useState(defaultValues.direction);
  const [gap, setGap] = React.useState(defaultValues.gap);
  const [wrap, setWrap] = React.useState(defaultValues.wrap);

  return {
    direction,
    setDirection,
    gap,
    setGap,
    wrap,
    setWrap,
  };
};
