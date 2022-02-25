import { getActorState, SignInContext, SignInState } from '@aws-amplify/ui';

import { useAuthenticator } from '..';
import { AttributeField } from '../shared/AttributeField';

export function FormFields() {
  const { _state } = useAuthenticator();

  const actorState = getActorState(_state) as SignInState;
  const { requiredAttributes: fieldNames } =
    actorState.context as SignInContext;

  return (
    <>
      {fieldNames.flatMap((name) => (
        // See: https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-settings-attributes.html#user-pool-settings-custom-attributes
        <AttributeField name={name} key={name} />
      ))}
    </>
  );
}
