import { Amplify } from 'aws-amplify';

import {
  // Access the default `Authenticator.SignUp.FormFields` for re-use
  Authenticator,
  // Amplify UI Primitives to simplify the custom fields
  Button,
  CheckboxField,
  Image,
  // React hook to get access to validation errors
  Text,
  Heading,
  View,
  useAuthenticator,
  useTheme,
} from '@aws-amplify/ui-react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from '@environments/auth-with-federated/src/aws-exports';
Amplify.configure(awsExports);

function App({ signOut }) {
  return <button onClick={signOut}>Sign out</button>;
}

export default withAuthenticator(App, {
  components: {
    Header() {
      const { tokens } = useTheme();

      return (
        <View textAlign="center" padding={`${tokens.space.large}`}>
          <Image
            alt="Amplify logo"
            src="https://docs.amplify.aws/assets/logo-dark.svg"
          />
        </View>
      );
    },
    SignIn: {
      Header() {
        const { tokens } = useTheme();

        return (
          <Heading
            padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
            level={3}
          >
            Sign in to your account
          </Heading>
        );
      },
      Footer() {
        const { toResetPassword } = useAuthenticator();

        return (
          <View textAlign="center">
            <Button
              fontWeight="normal"
              onClick={toResetPassword}
              size="small"
              variation="link"
            >
              Reset Password
            </Button>
          </View>
        );
      },
    },
    Footer() {
      const { tokens } = useTheme();

      return (
        <View textAlign="center" padding={`${tokens.space.large}`}>
          <Text color={`${tokens.colors.neutral['80']}`}>
            &copy; {new Date().getFullYear()}
          </Text>
        </View>
      );
    },
    // Customize `Authenticator.SignUp.FormFields`
    SignUp: {
      FormFields() {
        const { validationErrors } = useAuthenticator();

        return (
          <>
            {/* Re-use default `Authenticator.SignUp.FormFields` */}
            <Authenticator.SignUp.FormFields />

            {/* Append & require Terms & Conditions field to sign up  */}
            <CheckboxField
              errorMessage={validationErrors.acknowledgement}
              hasError={!!validationErrors.acknowledgement}
              name="acknowledgement"
              value="yes"
            >
              I agree with the Terms & Conditions
            </CheckboxField>
          </>
        );
      },
    },
  },
  services: {
    async validateCustomSignUp(formData) {
      if (!formData.acknowledgement) {
        return {
          acknowledgement: 'You must agree to the Terms & Conditions',
        };
      }
    },
  },
});
