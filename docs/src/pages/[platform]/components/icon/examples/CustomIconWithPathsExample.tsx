import { Icon } from '@aws-amplify/ui-react';

export const CustomIconWithPathsExample = () => {
  return (
    <Icon
      ariaLabel="tag"
      viewBox={{ width: 23, height: 15 }}
      paths={[
        {
          d: 'M1 0.5C0.723858 0.5 0.5 0.723858 0.5 1V14C0.5 14.2761 0.723858 14.5 1 14.5H14C14.1148 14.5 14.2262 14.4605 14.3153 14.3881L22.3153 7.88806C22.4322 7.79311 22.5 7.65056 22.5 7.5C22.5 7.34944 22.4322 7.20689 22.3153 7.11194L14.3153 0.611943C14.2262 0.539529 14.1148 0.5 14 0.5H1Z',
          strokeLinejoin: 'bevel',
          strokeLinecap: 'round',
          strokeDasharray: '4 4',
          fill: 'transparent',
          stroke: 'currentColor',
        },
      ]}
    />
  );
};
