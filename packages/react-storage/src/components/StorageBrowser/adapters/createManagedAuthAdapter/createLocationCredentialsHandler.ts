import {
  GetLocationCredentials,
  GetLocationCredentialsInput,
} from '../../credentials/types';
import { getDataAccess, CredentialsProvider } from '../../storage-internal';

interface CreateLocationCredentialsHandlerInput {
  accountId: string;
  credentialsProvider: CredentialsProvider;
  region: string;
  customEndpoint?: string;
}

export const createLocationCredentialsHandler = (
  handlerInput: CreateLocationCredentialsHandlerInput
): GetLocationCredentials => {
  const { accountId, region, credentialsProvider, customEndpoint } =
    handlerInput;

  /**
   * Retrieves credentials for the specified scope & permission.
   *
   * @param input - An object specifying the requested scope & permission.
   *
   * @returns A promise which will resolve with the requested credentials.
   */
  return (input: GetLocationCredentialsInput) => {
    const { scope, permission } = input;

    return getDataAccess({
      accountId,
      credentialsProvider,
      permission,
      region,
      scope,
      customEndpoint,
    });
  };
};
