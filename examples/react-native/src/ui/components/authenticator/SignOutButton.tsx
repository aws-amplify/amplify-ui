import React from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react-native';

import { Pressable, Text } from 'react-native';

export function SignOutButton() {
  const { signOut } = useAuthenticator();
  return (
    <Pressable onPress={signOut}>
      <Text>Sign out</Text>
    </Pressable>
  );
}
