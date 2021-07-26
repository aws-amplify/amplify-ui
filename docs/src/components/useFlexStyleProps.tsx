import { FlexStyleProps } from '@aws-amplify/ui-react';
import { useState } from 'react';
import { FieldControl } from './GetFieldControls';

interface UseFlexStyleProps {
  (initialValues: FlexStyleProps): FieldControl[];
}

export const useFlexStyleProps: UseFlexStyleProps = (initialValues) => {
  return [
    [
      ...useState<FlexStyleProps['alignItems']>(initialValues.alignItems),
      'alignItems',
    ],
    [
      ...useState<FlexStyleProps['alignContent']>(initialValues.alignContent),
      'alignContent',
    ],
    [
      ...useState<FlexStyleProps['direction']>(initialValues.direction),
      'direction',
    ],
    [...useState<FlexStyleProps['gap']>(initialValues.gap), 'gap'],
    [
      ...useState<FlexStyleProps['justifyContent']>(
        initialValues.justifyContent
      ),
      'justifyContent',
    ],
    [...useState<FlexStyleProps['wrap']>(initialValues.wrap), 'wrap'],
  ];
};
