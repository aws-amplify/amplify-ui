import { AuthInterpreter } from '@aws-amplify/ui-core/dist';
import { createContext } from 'react';

export const AuthenticatorContext = createContext<AuthInterpreter>(null);
