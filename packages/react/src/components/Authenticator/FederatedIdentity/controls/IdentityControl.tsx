export interface IdentityControl<T extends string = string> {
  (props: { providerName?: T; children?: React.ReactNode }): JSX.Element;
}
