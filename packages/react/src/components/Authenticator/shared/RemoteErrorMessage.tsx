import { ActorContextWithForms, getActorContext } from '@aws-amplify/ui';
import { useAmplify, useAuthenticator } from '../../../hooks';

export interface RemoteErrorMessageProps {
  amplifyNamespace: string;
}

export const RemoteErrorMessage = (
  props: RemoteErrorMessageProps
): JSX.Element => {
  const { amplifyNamespace } = props;
  const {
    components: { Alert },
  } = useAmplify(amplifyNamespace);

  const [_state] = useAuthenticator();
  const actorContext: ActorContextWithForms = getActorContext(_state);
  const { remoteError } = actorContext;

  return (
    <>
      {!!remoteError ? (
        <Alert variation="error" isDismissible={true}>
          {remoteError}
        </Alert>
      ) : null}
    </>
  );
};
