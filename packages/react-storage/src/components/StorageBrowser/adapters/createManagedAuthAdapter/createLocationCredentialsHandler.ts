import {
  GetLocationCredentials,
  GetLocationCredentialsInput,
} from '../../credentials/types';
import { getDataAccess, CredentialsProvider } from '../../storage-internal';
import { toAccessGrantPermission } from '../permissionParsers';
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
    const { scope, permissions } = input;

    return getDataAccess({
      accountId,
      credentialsProvider,
      permission: toAccessGrantPermission(permissions),
      region,
      scope,
      customEndpoint,
    });
  };
};
