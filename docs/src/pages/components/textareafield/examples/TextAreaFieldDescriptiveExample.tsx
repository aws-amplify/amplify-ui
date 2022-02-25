import { Text, TextAreaField, View } from '@aws-amplify/ui-react';

export const TextAreaFieldDescriptiveExample = () => {
  return (
    <View width="100%">
      <TextAreaField
        label="Address"
        descriptiveText={
          <Text
            as="span"
            fontStyle="italic"
            fontSize="var(--amplify-font-sizes-small)"
          >
            Please enter a USPS validated address
          </Text>
        }
      />
    </View>
  );
};
