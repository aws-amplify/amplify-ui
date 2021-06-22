import { useState } from "react";
import { useAmplify, useAuth } from "@aws-amplify/ui-react";

function AmplifyIcon() {
  return (
    <svg
      width="21"
      height="18"
      viewBox="0 0 21 18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        id="02-Basic-Inputs"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g
          id="Bits-&amp;-Loaders-1312px-/-16-Copy-2"
          transform="translate(-287.000000, -2242.000000)"
          fill="#FFFFFF"
        >
          <path
            d="M307.648967,2256.27828 L299.66725,2243.21184 C299.202561,2242.45466 298.384621,2242 297.500172,2242 C296.615722,2242 295.797783,2242.45466 295.333093,2243.18986 L287.351377,2256.27836 C286.886687,2257.03555 286.886687,2257.96598 287.32892,2258.74506 C287.771145,2259.52423 288.589084,2260 289.517579,2260 L305.481676,2260 C306.388591,2260 307.20653,2259.52423 307.670336,2258.74506 C308.113423,2257.96589 308.113423,2257.03549 307.648742,2256.27836 L307.648967,2256.27828 Z M296.482789,2248.23069 C296.482789,2247.68984 296.947479,2247.23518 297.50026,2247.23518 C298.053041,2247.23518 298.517731,2247.68984 298.517731,2248.23069 L298.517731,2252.36319 C298.517731,2252.90404 298.053041,2253.3587 297.50026,2253.3587 C296.947479,2253.3587 296.482789,2252.90404 296.482789,2252.36319 L296.482789,2248.23069 Z M297.50026,2256.81913 C296.814458,2256.81913 296.261677,2256.27828 296.261677,2255.60728 C296.261677,2254.93629 296.814458,2254.39544 297.50026,2254.39544 C298.186062,2254.39544 298.738844,2254.93629 298.738844,2255.60728 C298.738844,2256.27828 298.186062,2256.81913 297.50026,2256.81913 Z"
            id="Fill-1"
          ></path>
        </g>
      </g>
    </svg>
  );
}

function Toast({ message, handleClose }) {
  return (
    <div className="toast" role="alert" aria-label="error">
      <AmplifyIcon />
      {message ? <span>{message}</span> : null}
      <slot />
      <button onClick={handleClose}>Click me</button>
    </div>
  );
}

export function SignIn() {
  const {
    components: {
      Box,
      Button,
      Fieldset,
      Footer,
      Form,
      Heading,
      Input,
      Label,
      Spacer,
      Text,
    },
  } = useAmplify("Authenticator.SignIn");

  const [errorMessage, updateError] = useState("");
  const [state, send] = useAuth();
  const isPending = state.matches("signIn.pending");

  if (!errorMessage && state.context.error === "User does not exist.") {
    updateError(state.context.error);
  }

  const handleClose = () => {
    updateError("");
  };

  return (
    // TODO Automatically add these namespaces again from `useAmplify`
    <>
      {errorMessage && (
        <Toast message={errorMessage} handleClose={handleClose} />
      )}
      <Form
        data-amplify-authenticator-signin=""
        method="post"
        onSubmit={event => {
          event.preventDefault();

          const formData = new FormData(event.target);

          send({
            type: "SUBMIT",
            // @ts-ignore Property 'fromEntries' does not exist on type 'ObjectConstructor'. Do you need to change your target library? Try changing the `lib` compiler option to 'es2019' or later.ts(2550)
            data: Object.fromEntries(formData),
          });
        }}
      >
        <Heading level={1}>Sign in to your account</Heading>

        <Fieldset disabled={isPending}>
          <Label data-amplify-username>
            <Text>Username</Text>
            <Input name="username" required type="text" />
          </Label>

          <Label data-amplify-password>
            <Text>Password</Text>
            <Input name="password" required type="password" />
            <Box>
              <Text>Forgot your password?</Text>{" "}
              <Button type="button">Reset Password</Button>
            </Box>
          </Label>
        </Fieldset>

        <Footer>
          <Text>No account?</Text>{" "}
          <Button onClick={() => send("SIGN_UP")} type="button">
            Create account
          </Button>
          <Spacer />
          <Button disabled={isPending} type="submit">
            {isPending ? <>Signing in&hellip;</> : <>Sign In</>}
          </Button>
        </Footer>
      </Form>
    </>
  );
}
