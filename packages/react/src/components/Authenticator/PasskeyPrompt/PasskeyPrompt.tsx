import React from 'react';
import {
  associateWebAuthnCredential,
  listWebAuthnCredentials,
} from 'aws-amplify/auth';
import type { AuthWebAuthnCredential } from 'aws-amplify/auth';

import { Button } from '../../../primitives/Button';
import { Flex } from '../../../primitives/Flex';
import { Heading } from '../../../primitives/Heading';
import { Text } from '../../../primitives/Text';
import { View } from '../../../primitives/View';
import { useAuthenticator } from '@aws-amplify/ui-react-core';
import { IconCheckCircleFill, IconPasskey } from '../../../primitives/Icon';
import { RemoteErrorMessage } from '../shared/RemoteErrorMessage';
import type { RouteProps } from '../RouteContainer';
import { RouteContainer } from '../RouteContainer';

export function PasskeyPrompt({
  className,
  variation,
}: RouteProps): React.JSX.Element {
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [isRegistering, setIsRegistering] = React.useState(false);
  const [credentials, setCredentials] = React.useState<
    AuthWebAuthnCredential[]
  >([]);
  const { submitForm, isPending } = useAuthenticator((context) => [
    context.submitForm,
    context.isPending,
  ]);

  const loadCredentials = React.useCallback(async () => {
    try {
      const result = await listWebAuthnCredentials();
      setCredentials(result.credentials || []);
    } catch {
      // Silently fail - credentials list is optional
    }
  }, []);

  React.useEffect(() => {
    if (success) {
      void loadCredentials();
    }
  }, [success, loadCredentials]);

  const handleSkip = React.useCallback(() => {
    submitForm({ type: 'SKIP' });
  }, [submitForm]);

  const handleContinue = React.useCallback(() => {
    submitForm({ type: 'SUBMIT' });
  }, [submitForm]);

  const handleRegister = React.useCallback(async () => {
    try {
      setError(null);
      setIsRegistering(true);
      await associateWebAuthnCredential();
      setSuccess(true);
    } catch (err) {
      const error = err as Error & { name?: string };
      const errorName = error.name ?? '';
      const errorMessage = error.message ?? 'Failed to register passkey';

      // If user canceled, skip silently without showing error
      if (
        errorName === 'PasskeyRegistrationCanceled' ||
        errorName === 'NotAllowedError' ||
        errorMessage.includes('canceled') ||
        errorMessage.includes('cancelled') ||
        errorMessage.includes('ceremony has been canceled') ||
        errorMessage.includes('not allowed')
      ) {
        handleSkip();
        return;
      }

      setError(errorMessage);
    } finally {
      setIsRegistering(false);
    }
  }, [handleSkip]);

  if (success) {
    return (
      <RouteContainer className={className} variation={variation}>
        <Flex direction="column" padding="1.5rem">
          <Flex direction="column" gap="0.5rem">
            <IconCheckCircleFill fontSize="3em" color="#34A853" />
            <Heading level={4}>Passkey created successfully!</Heading>
            <Text>Your passkey has been successfully registered.</Text>
          </Flex>
          {credentials.length > 0 && (
            <View marginTop="1.5rem">
              <Heading level={5}>Existing Passkeys</Heading>
              <Flex direction="column" gap="0.5rem" marginTop="0.5rem">
                {credentials.map((cred, index) => (
                  <View
                    key={cred.credentialId}
                    padding="0.75rem"
                    backgroundColor="var(--amplify-colors-background-secondary)"
                    borderRadius="0.25rem"
                  >
                    <Text fontSize="0.875rem">
                      {cred.friendlyCredentialName ?? `Passkey ${index + 1}`}
                    </Text>
                  </View>
                ))}
              </Flex>
            </View>
          )}
          <Flex direction="column" gap="1rem" marginTop="1.5rem">
            <Button
              onClick={() => {
                setSuccess(false);
                handleRegister();
              }}
              variation="link"
            >
              Setup another Passkey
            </Button>
            <Button onClick={handleContinue} variation="primary" isFullWidth>
              Continue
            </Button>
          </Flex>
        </Flex>
      </RouteContainer>
    );
  }

  return (
    <RouteContainer className={className} variation={variation}>
      <form data-amplify-form="" data-amplify-authenticator-passkeyprompt="">
        <Flex direction="column" gap="1rem">
          <Heading level={4}>Sign in faster with Passkey</Heading>
          <Text>
            Passkeys are WebAuthn credentials that validate your identity using
            biometric data like touch or facial recognition or device
            authentication like passwords or PINs, serving as a secure password
            replacement.
          </Text>
          <Flex justifyContent="center">
            <IconPasskey fontSize="18rem" />
          </Flex>

          <Flex direction="column" gap="1rem">
            <Button
              onClick={() => void handleRegister()}
              variation="primary"
              isDisabled={isPending || isRegistering}
              isLoading={isRegistering}
              loadingText="Registering..."
            >
              Create a Passkey
            </Button>
            <Button
              onClick={handleSkip}
              variation="link"
              isDisabled={isPending || isRegistering}
            >
              Continue without a Passkey
            </Button>

            {error && (
              <Text color="red" fontSize="0.875rem">
                {error}
              </Text>
            )}

            <RemoteErrorMessage />
          </Flex>
        </Flex>
      </form>
    </RouteContainer>
  );
}
