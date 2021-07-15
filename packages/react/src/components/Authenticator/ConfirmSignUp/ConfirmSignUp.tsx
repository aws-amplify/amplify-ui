import { useState } from "react";

import { useAmplify, useAuth } from "@aws-amplify/ui-react";

import {
  ConfirmationCodeInput,
  ConfirmationCodeInputProps,
  ConfirmSignInFooter,
  ConfirmSignInFooterProps,
  UserNameAlias,
} from "../shared";

export function ConfirmSignUp() {
  const [usernameAlias, setUsernameAlias] = useState<string>("");
  const amplifyNamespace = "Authenticator.ConfirmSignUp";
  const {
    components: { Box, Button, Fieldset, Form, Heading, Label, Text },
  } = useAmplify(amplifyNamespace);

  const [state, send] = useAuth();
  const isPending = state.matches("confirmSignUp.pending");

  const footerProps: ConfirmSignInFooterProps = {
    amplifyNamespace,
    isPending,
    shouldHideReturnBtn: true,
    send,
  };

  const confirmationCodeInputProps: ConfirmationCodeInputProps = {
    amplifyNamespace,
    label: "Confirmation Code",
    placeholder: "Enter your code",
  };

  const handleUsernameInputChange = (event): void => {
    setUsernameAlias(event.target.value);
  };

  return (
    // TODO Automatically add these namespaces again from `useAmplify`
    <Form
      data-amplify-authenticator-confirmsignup=""
      method="post"
      onSubmit={(event) => {
        event.preventDefault();

        const formData = new FormData(event.target);

        send({
          type: "SUBMIT",
          // @ts-ignore Property 'fromEntries' does not exist on type 'ObjectConstructor'. Do you need to change your target library? Try changing the `lib` compiler option to 'es2019' or later.ts(2550)
          data: Object.fromEntries(formData),
        });
      }}
    >
      <Heading level={1}>Confirm Sign Up</Heading>

      <Fieldset disabled={isPending}>
        <UserNameAlias
          handleInputChange={handleUsernameInputChange}
          data-amplify-usernamealias
        />

        <Label data-amplify-confirmationcode>
          <ConfirmationCodeInput {...confirmationCodeInputProps} />
          <Box>
            <Text>Lost your code?</Text>{" "}
            <Button
              onClick={() => {
                send({
                  type: "RESEND",
                  data: {
                    username: usernameAlias,
                  },
                });
              }}
              type="button"
            >
              Reset Code
            </Button>
          </Box>
        </Label>
      </Fieldset>

      <ConfirmSignInFooter {...footerProps} />
    </Form>
  );
}
