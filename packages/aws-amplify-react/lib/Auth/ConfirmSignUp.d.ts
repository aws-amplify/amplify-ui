import { AuthPiece, IAuthPieceProps, IAuthPieceState } from './AuthPiece';
export declare class ConfirmSignUp extends AuthPiece<
  IAuthPieceProps,
  IAuthPieceState
> {
  constructor(props: IAuthPieceProps);
  confirm(): void;
  resend(): void;
  showComponent(theme: any): JSX.Element;
}
/**
 * @deprecated use named import
 */
export default ConfirmSignUp;
