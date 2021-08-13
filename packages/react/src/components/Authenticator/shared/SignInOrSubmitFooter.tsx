import { useAmplify, useAuth } from '../../../hooks';

export interface SignInOrSubmitFooterProps {
  amplifyNamespace: string;
  submitButtonText?: JSX.Element;
}

export const SignInOrSubmitFooter = (
  props: SignInOrSubmitFooterProps
): JSX.Element => {
  const { amplifyNamespace, submitButtonText } = props;

  const {
    components: { Button, Footer, Spacer },
  } = useAmplify(amplifyNamespace);

  const [state, send] = useAuth();
  const isPending = state.matches('resetPassword.pending');

  const defaultSubmitText = isPending ? <>Submitting&hellip;</> : <>Submit</>;
  const submitText = submitButtonText || defaultSubmitText;

  return (
    <Footer>
      <Button onClick={() => send({ type: 'SIGN_IN' })} type="button">
        Back to Sign In
      </Button>
      <Spacer />
      <Button isDisabled={isPending} type="submit">
        {submitText}
      </Button>
    </Footer>
  );
};
