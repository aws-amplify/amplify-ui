import { CheckboxField, Flex, IconsProvider } from '@aws-amplify/ui-react';
import { HiMinus, HiCheck } from 'react-icons/hi';

export const CheckboxFieldIconExample = () => (
  <IconsProvider
    icons={{
      checkbox: {
        checked: <HiCheck />,
        indeterminate: <HiMinus />,
      },
    }}
  >
    <Flex direction="column">
      <CheckboxField name="cat" label="Cat" value="cat" checked={true} />
      <CheckboxField
        name="cat"
        label="Cat"
        value="cat"
        checked={true}
        isIndeterminate
      />
    </Flex>
  </IconsProvider>
);
