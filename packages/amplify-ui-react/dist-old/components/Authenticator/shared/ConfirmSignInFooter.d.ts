export interface ConfirmSignInFooterProps {
  amplifyNamespace: string;
  isPending: boolean;
  shouldHideReturnBtn?: boolean;
  send({ type: string }: { type: any }): void;
}
export declare const ConfirmSignInFooter: (
  props: ConfirmSignInFooterProps
) => JSX.Element;
