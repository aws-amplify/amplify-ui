import { Menu, MenuItem, View, useTheme } from '@aws-amplify/ui-react';

export const StylePropsExample = () => {
  const { tokens } = useTheme();

  return (
    <View width="4rem">
      <Menu direction="row">
        <MenuItem>Download</MenuItem>
        <MenuItem fontStyle="italic">Create a Copy</MenuItem>
        <MenuItem backgroundColor={tokens.colors.red[40]}>Delete</MenuItem>
      </Menu>
    </View>
  );
};
