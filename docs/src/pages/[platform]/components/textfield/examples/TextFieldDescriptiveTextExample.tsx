import { Text, TextField, View } from '@aws-amplify/ui-react';

export const TextFieldDescriptiveTextExample = () => {
  return (
    <View width="100%">
      <TextField
        type="password"
        label="Password"
        descriptiveText={
          <Text
            as="span"
            color="purple.60"
            fontStyle="italic"
            fontSize="0.8rem"
          >
            Password length must be greater than 8 characters
          </Text>
        }
      />
    </View>
  );
};
