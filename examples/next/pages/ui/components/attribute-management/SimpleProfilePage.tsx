import React from 'react';
import { useUserAttributes } from '@aws-amplify/ui-react-core';
import {
  Button,
  View,
  Flex,
  Heading,
  TextField,
  Divider,
} from '@aws-amplify/ui-react';
import { UserAttributeKey } from 'aws-amplify/auth';

export const SimpleProfilePage = () => {
  const [state, handleAttributes] = useUserAttributes();
  const [isEditMode, setIsEditMode] = React.useState(false);
  const [isConfirmMode, setIsConfirmMode] = React.useState(false);
  const formRef = React.useRef<HTMLFormElement>(null);

  const editableAttributes: UserAttributeKey[] = [
    'family_name',
    'given_name',
    'locale',
    'name',
    'nickname',
    'birthdate',
    'middle_name',
    'gender',
    'preferred_username',
    'website',
  ];

  const handleAttributeDelete = (key: UserAttributeKey) => {
    handleAttributes({
      type: 'DELETE',
      userAttributeKeys: [key],
    });
    // Add logic to clear input field on deletion
    const input = formRef.current?.querySelector(
      `input[name="${key}"]`
    ) as HTMLInputElement;
    input.value = '';
  };

  const handleUpdateEmailSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userAttributes = Object.fromEntries(formData.entries()) as Record<
      UserAttributeKey,
      string
    >;
    handleAttributes({ type: 'UPDATE', userAttributes });
    setIsConfirmMode(true);
    e.currentTarget.reset();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userAttributes = Object.fromEntries(formData.entries()) as Record<
      UserAttributeKey,
      string
    >;
    handleAttributes({ type: 'UPDATE', userAttributes });
  };

  const handleVerifySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const confirmationCode = formData.get('confirmationCode') as string;
    handleAttributes({
      type: 'CONFIRM',
      userAttributeKey: 'email',
      confirmationCode,
    });
    setIsConfirmMode(false);
    e.currentTarget.reset();
  };

  React.useEffect(() => {
    handleAttributes({ type: 'FETCH' });
  }, []);

  if (state.isLoading && !state.data.attributes) {
    return <div>Loading...</div>;
  }

  if (state.message) {
    return <div>Error: {state.message}</div>;
  }

  if (!state.data.attributes) {
    return <div>No data</div>;
  }

  return (
    <Flex direction="column" alignItems="center">
      <Heading level={1}>Profile</Heading>
      <View
        backgroundColor="blue.10"
        padding="1rem"
        borderRadius="1rem"
        border="2px solid var(--amplify-colors-black)"
        maxWidth="450px"
      >
        <Heading level={5} textAlign={'center'} marginBottom="10px">
          User Attributes
        </Heading>
        <Divider orientation="horizontal" marginBottom="5px" />
        {!isEditMode ? (
          <>
            {Object.entries(state.data.attributes)
              .filter(
                ([key]) =>
                  key !== 'phone_number_verified' &&
                  key !== 'sub' &&
                  key !== 'email_verified' &&
                  key !== 'phone_number'
              )
              .map(([key, value]) => (
                <Flex key={key} alignItems="center" marginBottom="0.5rem">
                  <View
                    width="200px"
                    textAlign="right"
                    marginRight="1"
                    fontWeight="bold"
                  >
                    {key
                      .replace(/_/g, ' ')
                      .replace(/(^|\s)\S/g, (match) => match.toUpperCase())}
                    :
                  </View>
                  <View textAlign="right">{value as string}</View>
                </Flex>
              ))}
            <Button
              border="2px solid var(--amplify-colors-black)"
              onClick={() => setIsEditMode(true)}
            >
              Edit
            </Button>
          </>
        ) : (
          <View>
            <Flex
              as="form"
              direction="column"
              alignItems="left"
              ref={formRef}
              onSubmit={handleSubmit}
            >
              <Flex justifyContent="space-between" marginTop="1rem">
                <Button
                  isLoading={state.isLoading}
                  type="submit"
                  border="1.5px solid var(--amplify-colors-black)"
                >
                  Submit Updates
                </Button>
                <Divider orientation="vertical" />
                <Button
                  border="1.5px solid var(--amplify-colors-black)"
                  isLoading={state.isLoading}
                  type="button"
                  onClick={() => setIsEditMode(false)}
                >
                  Done Editing
                </Button>
              </Flex>
              {editableAttributes.map((key) => (
                <Flex
                  key={key}
                  alignItems="center"
                  marginBottom="0"
                  marginTop="0"
                >
                  <Flex alignItems="end">
                    <TextField
                      label={key
                        .replace(/_/g, ' ')
                        .replace(/(^|\s)\S/g, (match) => match.toUpperCase())}
                      paddingTop="0"
                      paddingBottom="0"
                      lineHeight={1}
                      name={key}
                      defaultValue={state.data.attributes[key] || ''}
                    />
                    <Button
                      isLoading={state.isLoading}
                      type="button"
                      onClick={() => {
                        handleAttributeDelete(key);
                      }}
                      border="1.5px solid var(--amplify-colors-black)"
                    >
                      Delete
                    </Button>
                  </Flex>
                </Flex>
              ))}
              <Divider orientation="horizontal" />
            </Flex>
            <Flex
              as="form"
              direction="column"
              onSubmit={handleUpdateEmailSubmit}
              marginTop="1rem"
            >
              <TextField
                type="email"
                name="email"
                label="Email:"
                descriptiveText="Enter your new email address:"
              />
              <Button
                isLoading={state.isLoading}
                type="submit"
                border="1.5px solid var(--amplify-colors-black)"
              >
                Update Email
              </Button>
            </Flex>
            {isConfirmMode && state.data.pendingVerification && (
              <Flex
                as="form"
                direction="column"
                onSubmit={handleVerifySubmit}
                marginTop="1rem"
              >
                <TextField
                  type="text"
                  name="confirmationCode"
                  label={`Verification Code for ${state.data.pendingVerification[0].codeDeliveryDetails?.destination}`}
                  descriptiveText="Enter the verification code sent to your email"
                />
                <Button
                  isLoading={state.isLoading}
                  type="submit"
                  border="1.5px solid var(--amplify-colors-black)"
                >
                  Verify Email
                </Button>
              </Flex>
            )}
          </View>
        )}
      </View>
    </Flex>
  );
};
