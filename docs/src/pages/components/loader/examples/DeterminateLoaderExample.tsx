import * as React from 'react';
import { Loader } from '@aws-amplify/ui-react';

export const DeterminateLoaderExample = () => {
  const [percentage, setPercentage] = React.useState(0);
  React.useEffect(() => {
    const clearID = setInterval(() => {
      setPercentage((percentage) => {
        if (percentage < 100) {
          return percentage + 1;
        }
        return 0;
      });
    }, 1000);
    return () => clearInterval(clearID);
  }, []);
  return (
    <>
      <Loader percentage={percentage} isDeterminate />
      <Loader variation="linear" percentage={percentage} isDeterminate />
    </>
  );
};
