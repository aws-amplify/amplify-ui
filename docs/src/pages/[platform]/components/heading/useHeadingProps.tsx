import * as React from 'react';
import { Heading, HeadingLevel, HeadingProps } from '@aws-amplify/ui-react';
import { demoState } from '@/utils/demoState';

export const useHeadingProps = (initialValues) => {
  const [level, setLevel] = React.useState<HeadingLevel>(initialValues.level);
  const [isTruncated, setIsTruncated] = React.useState<
    HeadingProps['isTruncated']
  >(initialValues.isTruncated);
  const [value, setValue] = React.useState<string>(initialValues.value);

  React.useEffect(() => {
    demoState.set(Heading.displayName, { level, isTruncated, value });
  }, [level, isTruncated, value]);

  return React.useMemo(
    () => ({ level, setLevel, isTruncated, setIsTruncated, value, setValue }),
    [level, setLevel, isTruncated, setIsTruncated, value, setValue]
  );
};
