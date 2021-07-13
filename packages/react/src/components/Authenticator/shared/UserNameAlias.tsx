import { useAuth } from "@aws-amplify/ui-react";
import { UserNameAliasNames } from "../../../primitives/shared/constants";
import { Label, Text, Input, ErrorText } from "../../../primitives";

export function UserNameAlias({ ...attrs }) {
  const [{ context }] = useAuth();

  const error = context.validationError["username"];
  const loginMechanisms = context.config?.login_mechanisms ?? ["username"];

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
      <ErrorText>{error}</ErrorText>
    </Label>
  );
}
