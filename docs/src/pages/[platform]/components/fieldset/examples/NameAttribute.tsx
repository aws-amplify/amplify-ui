import { Flex, Fieldset, Text } from '@aws-amplify/ui-react';
import { useRef, useEffect, useState } from 'react';

export const NameAttribute = () => {
  const formRef = useRef(null);
  const [fieldsetName, setFieldsetName] = useState('');

  useEffect(() => {
    if (formRef.current) {
      setFieldsetName(formRef.current.elements[0].name);
    }
  }, [setFieldsetName]);
  return (
    <Flex as="form" ref={formRef} direction="column">
      <Fieldset
        legend="Fieldset with a name"
        name="Fieldset #1"
        variation="outlined"
      >
        Fieldset content
      </Fieldset>
      Fieldset name: {fieldsetName}
    </Flex>
  );
};
