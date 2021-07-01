import { useAmplify, useAuth } from "@aws-amplify/ui-react";
import { UserNameAliasNames } from "../../primitives/shared/constants";
export function UserNameAlias({ components, usernameAlias = "", ...attrs }) {
  const {
    components: { Label, Text, Input },
  } = useAmplify(components);

  const [state] = useAuth();
  const userNameAliasConfig = state.context.config || "username";
  const alias = usernameAlias
    ? UserNameAliasNames[usernameAlias]
    : UserNameAliasNames[userNameAliasConfig];

  function getAliasInput() {
    if (alias === UserNameAliasNames.email) {
      return <Input name="username" required type="email" />;
    } else if (alias === UserNameAliasNames.phone_number) {
      return <Input name="username" required type="tel" />;
    } else {
      return <Input name="username" required type="text" />;
    }
  }

  return (
    <Label {...attrs}>
      <Text>{alias || UserNameAliasNames.username}</Text>
      {getAliasInput()}
    </Label>
  );
}
