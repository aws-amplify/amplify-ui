import * as React from 'react';
import { ScrollView, ScrollViewProps } from '@aws-amplify/ui-react';

import { ScrollViewPropControlsProp } from './ScrollViewPropControls';
import { demoState } from '@/utils/demoState';

interface UseScrollViewProps {
  (initialValues?: ScrollViewProps): ScrollViewPropControlsProp;
}

export const useScrollViewProps: UseScrollViewProps = (initialValues) => {
  const [orientation, setOrientation] = React.useState(
    initialValues.orientation
  );

  React.useEffect(() => {
    demoState.set(ScrollView.displayName, { orientation });
  }, [orientation]);

  return React.useMemo(
    () => ({
      orientation,
      setOrientation,
    }),
    [orientation, setOrientation]
  );
};
