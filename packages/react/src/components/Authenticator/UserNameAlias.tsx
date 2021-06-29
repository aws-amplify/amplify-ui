import { useAmplify, useAuth } from "@aws-amplify/ui-react";
import { UserNameAliasNames } from "../../primitives/shared/constants";
export function UserNameAlias({ components, usernameAlias = "", ...attrs }) {
  const {
    components: { Label, Text, Input },
  } = useAmplify(components);

  const [state] = useAuth();
  const userNameAliasConfig = state.context.config || "username";
  const userNameAlias = usernameAlias
    ? UserNameAliasNames[usernameAlias]
    : UserNameAliasNames[userNameAliasConfig];

  return (
    <Label {...attrs}>
      <Text>{userNameAlias || UserNameAliasNames.username}</Text>
      {userNameAlias === UserNameAliasNames.email ? (
        <Input name="email" required type="email" />
      ) : userNameAlias === UserNameAliasNames.phone_number ? (
        <Input name="phone_number" type="tel" />
      ) : (
        <Input name="username" required type="text" />
      )}
    </Label>
  );
}
