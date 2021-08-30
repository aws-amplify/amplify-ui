import { getActorContext } from '@aws-amplify/ui';
// TODO This needs to be replaced with a helper to get the current error
import { ActorContextWithForms } from '@aws-amplify/ui/src/types/authMachine';
import { useAmplify, useAuth } from '../../../hooks';

export interface ErrorTextProps {
  amplifyNamespace: string;
}

export const ErrorText = (props: ErrorTextProps): JSX.Element => {
  const { amplifyNamespace } = props;
  const {
    components: { Text },
  } = useAmplify(amplifyNamespace);

  const [_state] = useAuth();
  const actorContext: ActorContextWithForms = getActorContext(_state);
  const { remoteError } = actorContext;

  return (
    <Text className="errorText" variant="error">
      {remoteError}
    </Text>
  );
};
