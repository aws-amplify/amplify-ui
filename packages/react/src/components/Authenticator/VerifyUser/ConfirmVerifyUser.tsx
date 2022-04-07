import { translate } from '@aws-amplify/ui';

import { Flex } from '../../../primitives/Flex';
import { Heading } from '../../../primitives/Heading';
import { useAuthenticator } from '../hooks/useAuthenticator';
import { useCustomComponents } from '../hooks/useCustomComponents';
import { useFormHandlers } from '../hooks/useFormHandlers';
import { RemoteErrorMessage } from '../shared/RemoteErrorMessage';
import { TwoButtonSubmitFooter } from '../shared/TwoButtonSubmitFooter';
import { FormFields } from '../shared/FormFields';

export const ConfirmVerifyUser = (): JSX.Element => {
  const { isPending } = useAuthenticator((context) => [context.isPending]);
  const { handleChange, handleSubmit } = useFormHandlers();

  const {
    components: {
      ConfirmVerifyUser: {
        Header = ConfirmVerifyUser.Header,
        Footer = ConfirmVerifyUser.Footer,
      },
    },
  } = useCustomComponents();

  return (
    <form
      data-amplify-form=""
      data-amplify-authenticator-confirmverifyuser=""
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
          <FormFields route="confirmVerifyUser" />
        </Flex>

        <RemoteErrorMessage />

        <TwoButtonSubmitFooter
          cancelButtonText={translate('Skip')}
          cancelButtonSendType="SKIP"
        />
        <Footer />
      </fieldset>
    </form>
  );
};

ConfirmVerifyUser.Header = () => {
  return (
    <Heading level={3}>
      {translate('Account recovery requires verified contact information')}
    </Heading>
  );
};

ConfirmVerifyUser.Footer = (): JSX.Element => null;
