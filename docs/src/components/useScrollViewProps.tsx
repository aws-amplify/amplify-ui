import * as React from 'react';

import { ScrollViewProps } from '@aws-amplify/ui-react';

import { ScrollViewPropControlsProp } from './ScrollViewPropControls';

interface UseScrollViewProps {
  (initialValues?: ScrollViewProps): ScrollViewPropControlsProp;
}

export const useScrollViewProps: UseScrollViewProps = (initialValues) => {
  const [orientation, setOrientation] = React.useState(
    initialValues.orientation
  );
  return { orientation, setOrientation };
};
