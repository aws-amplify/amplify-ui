import { ForwardRefExoticComponent } from 'react';

interface IdentityProps<T extends string = string>
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  providerName: T;
}

export interface IdentityControl<T extends string = string>
  extends ForwardRefExoticComponent<IdentityProps<T>> {}
