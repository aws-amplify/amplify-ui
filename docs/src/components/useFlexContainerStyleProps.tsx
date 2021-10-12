import { FlexContainerStyleProps } from '@aws-amplify/ui-react';
import { useState } from 'react';
import { FieldControl } from './GetFieldControls';

interface UseFlexContainerStyleProps {
  (initialValues: FlexContainerStyleProps): FieldControl[];
}

export const useFlexContainerStyleProps: UseFlexContainerStyleProps = (
  initialValues
) => {
  return [
    [
      ...useState<FlexContainerStyleProps['alignItems']>(
        initialValues.alignItems
      ),
      'alignItems',
    ],
    [
      ...useState<FlexContainerStyleProps['alignContent']>(
        initialValues.alignContent
      ),
      'alignContent',
    ],
    [
      ...useState<FlexContainerStyleProps['direction']>(
        initialValues.direction
      ),
      'direction',
    ],
    [...useState<FlexContainerStyleProps['gap']>(initialValues.gap), 'gap'],
    [
      ...useState<FlexContainerStyleProps['justifyContent']>(
        initialValues.justifyContent
      ),
      'justifyContent',
    ],
    [...useState<FlexContainerStyleProps['wrap']>(initialValues.wrap), 'wrap'],
  ];
};
