import { useAuthenticator } from '..';
import { Alert } from '../../..';

export const RemoteErrorMessage = (): JSX.Element => {
  const { error } = useAuthenticator();

  return (
    <>
      {error ? (
        <Alert variation="error" isDismissible={true}>
          {error}
        </Alert>
      ) : null}
    </>
  );
};
