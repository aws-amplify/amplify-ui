import { FlexContainerStyleProps } from '@aws-amplify/ui-react';
import * as React from 'react';

import { FieldControl } from './GetFieldControls';

interface UseFlexContainerStyleProps {
  (initialValues: FlexContainerStyleProps): FieldControl[];
}

// @ts-ignore // IGNORE
export const useFlexContainerStyleProps: UseFlexContainerStyleProps = (
  initialValues
) => {
  return [
    [
      ...React.useState<FlexContainerStyleProps['alignItems']>(
        initialValues.alignItems
      ),
      'alignItems',
    ],
    [
      ...React.useState<FlexContainerStyleProps['alignContent']>(
        initialValues.alignContent
      ),
      'alignContent',
    ],
    [
      ...React.useState<FlexContainerStyleProps['direction']>(
        initialValues.direction
      ),
      'direction',
    ],
    [
      ...React.useState<FlexContainerStyleProps['gap']>(initialValues.gap),
      'gap',
    ],
    [
      ...React.useState<FlexContainerStyleProps['justifyContent']>(
        initialValues.justifyContent
      ),
      'justifyContent',
    ],
    [
      ...React.useState<FlexContainerStyleProps['wrap']>(initialValues.wrap),
      'wrap',
    ],
  ];
};
