import { ActorContextWithForms, getActorContext } from '@aws-amplify/ui';
import { useAmplify, useAuthenticator } from '../../../hooks';

export interface ErrorTextProps {
  amplifyNamespace: string;
}

export const ErrorText = (props: ErrorTextProps): JSX.Element => {
  const { amplifyNamespace } = props;
  const {
    components: { Text },
  } = useAmplify(amplifyNamespace);

  const [_state] = useAuthenticator();
  const actorContext: ActorContextWithForms = getActorContext(_state);
  const { remoteError } = actorContext;

  return (
    <>{remoteError ? <Text variation="error">{remoteError}</Text> : null}</>
  );
};
