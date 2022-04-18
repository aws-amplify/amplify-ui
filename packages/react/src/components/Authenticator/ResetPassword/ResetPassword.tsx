import { translate } from '@aws-amplify/ui';

import { Flex } from '../../../primitives/Flex';
import { Heading } from '../../../primitives/Heading';
import { useAuthenticator } from '../hooks/useAuthenticator';
import { useCustomComponents } from '../hooks/useCustomComponents';
import { useFormHandlers } from '../hooks/useFormHandlers';
import { RemoteErrorMessage } from '../shared/RemoteErrorMessage';
import { TwoButtonSubmitFooter } from '../shared/TwoButtonSubmitFooter';
import { FormFields } from '../shared/FormFields';

export const ResetPassword = (): JSX.Element => {
  const { isPending } = useAuthenticator((context) => [context.isPending]);
  const { handleChange, handleSubmit } = useFormHandlers();

  const {
    components: {
      ResetPassword: {
        Header = ResetPassword.Header,
        Footer = ResetPassword.Footer,
      },
    },
  } = useCustomComponents();

  return (
    <form
      data-amplify-form=""
      data-amplify-authenticator-resetpassword=""
      method="post"
      onChange={handleChange}
      onSubmit={handleSubmit}
    >
      <fieldset
        style={{ display: 'flex', flexDirection: 'column' }}
        className="amplify-flex"
        disabled={isPending}
      >
        <Header />

        <Flex direction="column">
          <FormFields route="resetPassword" />
        </Flex>

        <RemoteErrorMessage />
        <TwoButtonSubmitFooter
          cancelButtonText={translate('Back to Sign In')}
          cancelButtonSendType="SIGN_IN"
          submitButtonText={
            isPending ? (
              <>{translate('Sending')}&hellip;</>
            ) : (
              <>{translate('Send code')}</>
            )
          }
        />
        <Footer />
      </fieldset>
    </form>
  );
};

ResetPassword.Header = () => {
  return <Heading level={3}>{translate('Reset your password')}</Heading>;
};

ResetPassword.Footer = (): JSX.Element => null;
