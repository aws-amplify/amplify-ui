import { Fieldset } from '@aws-amplify/ui-react';

export const FieldsetStylePropsExample = () => {
  return (
    <Fieldset
      legend="Fieldset with style props"
      borderColor="teal.60"
      backgroundColor="teal.10"
    >
      Fieldset content
    </Fieldset>
  );
};
