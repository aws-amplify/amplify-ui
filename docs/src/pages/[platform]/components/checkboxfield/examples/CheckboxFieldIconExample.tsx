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
      <CheckboxField name="cat" label="Cat" value="cat" defaultChecked={true} />
      <CheckboxField name="dog" label="Dog" value="dog" isIndeterminate />
    </Flex>
  </IconsProvider>
);
