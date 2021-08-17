import { AuthPiece, IAuthPieceProps, IAuthPieceState } from './AuthPiece';
export declare class RequireNewPassword extends AuthPiece<
  IAuthPieceProps,
  IAuthPieceState
> {
  constructor(props: IAuthPieceProps);
  checkContact(user: any): void;
  change(): void;
  showComponent(theme: any): JSX.Element;
}
/**
 * @deprecated use named import
 */
export default RequireNewPassword;
