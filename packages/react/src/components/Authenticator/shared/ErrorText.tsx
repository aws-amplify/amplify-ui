import { useAmplify, useAuth } from '../../../hooks';

export interface ErrorTextProps {
  amplifyNamespace: string;
}

export const ErrorText = (props: ErrorTextProps): JSX.Element => {
  const { amplifyNamespace } = props;
  const {
    components: { Text },
  } = useAmplify(amplifyNamespace);

  const [state] = useAuth();
  const { remoteError } = state.context;

  return (
    <Text className="errorText" variant="error">
      {remoteError}
    </Text>
  );
};
