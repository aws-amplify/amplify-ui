import { AuthPiece, IAuthPieceProps, IAuthPieceState } from './AuthPiece';
export declare class Loading extends AuthPiece<
  IAuthPieceProps,
  IAuthPieceState
> {
  constructor(props: IAuthPieceProps);
  showComponent(theme: any): JSX.Element;
}
