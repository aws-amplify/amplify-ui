import React, { ComponentType, ComponentPropsWithRef } from 'react';
import { AmplifyAuthenticator } from './';
export declare function withAuthenticator<T extends object>(
  Component: ComponentType<T>,
  authenticatorProps?: ComponentPropsWithRef<typeof AmplifyAuthenticator>
): React.FunctionComponent<T>;
