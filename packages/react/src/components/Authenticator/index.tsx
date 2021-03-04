import { useSpark } from "../../useSpark";

export function Authenticator() {
  const {
    components: {
      Box,
      Button,
      Fieldset,
      Form,
      Heading,
      Input,
      Label,
      Spacer,
      Text,
      Wrapper,
    },
  } = useSpark("Authenticator");

  const {
    components: { Footer },
  } = useSpark("Authenticator.Form");

  return (
    <Wrapper>
      <Form>
        <Heading level={1}>Sign in to your account</Heading>

        <Fieldset>
          <Label>
            <Text>Full name</Text>
            <Input name="username" required type="text" />
          </Label>

          <Label>
            <Text>Password</Text>
            <Input name="username" required type="password" />
            <Box className="flex flex-row space-x-1">
              <Text className="text-sm text-gray-500">
                Forgot your password?
              </Text>{" "}
              <Button className="text-sm text-blue-500">Reset Password</Button>
            </Box>
          </Label>
        </Fieldset>

        <Footer>
          <Text className="text-sm text-gray-500">No account?</Text>{" "}
          <Button className="text-sm text-blue-500">Create account</Button>
          <Spacer className="flex-1" />
          <Button
            className="px-8 py-2 text-white bg-gray-700 rounded"
            type="submit"
          >
            Sign In
          </Button>
        </Footer>
      </Form>
    </Wrapper>
  );
}
