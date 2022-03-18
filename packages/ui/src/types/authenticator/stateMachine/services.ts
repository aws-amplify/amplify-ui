import { CognitoUserAmplify } from '../user';

/** Service types for parent authMachine */
export type AuthServices = {
  getCurrentUser: {
    evedata: CognitoUserAmplify;
  };
  getAmplifyConfig: {
    data: Record<PropertyKey, any>;
  };
};
