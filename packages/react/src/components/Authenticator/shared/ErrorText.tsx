import { getActorState } from '@aws-amplify/ui-core';
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
  const actorState = getActorState(_state);
  const { remoteError } = actorState?.context;

  return (
    <Text className="errorText" variant="error">
      {remoteError}
    </Text>
  );
};
