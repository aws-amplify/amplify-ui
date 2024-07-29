export interface ProviderControl<T extends string = string> {
  (props: { providerName?: T; children?: React.ReactNode }): JSX.Element;
}
