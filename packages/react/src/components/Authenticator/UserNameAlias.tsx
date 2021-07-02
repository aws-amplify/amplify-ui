import { useAmplify, useAuth } from "@aws-amplify/ui-react";
import { UserNameAliasNames } from "../../primitives/shared/constants";
export function UserNameAlias({ components, usernameAlias = null, ...attrs }) {
  const {
    components: { Label, Text, Input },
  } = useAmplify(components);

  const [state] = useAuth();
  let alias = null;
  if (usernameAlias) {
    alias = Array.isArray(usernameAlias) ? usernameAlias : [usernameAlias];
  }

  const loginMechanisms = alias ?? state.context.config ?? ["username"];

  let type = "text";
  const name = loginMechanisms
    .map(
      v => UserNameAliasNames[v]?.name ?? UserNameAliasNames["username"].name
    )
    .join(" or ");

  if (loginMechanisms.length === 1) {
    type = UserNameAliasNames[loginMechanisms[0]]?.type ?? "text";
  }

  return (
    <Label {...attrs}>
      <Text>{name}</Text>
      <Input name="username" required type={type} />
    </Label>
  );
}
