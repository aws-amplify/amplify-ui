
import { ModelInit, MutableModel } from '@aws-amplify/datastore';

type UserPreferenceMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
};

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
};

export declare class UserPreference {
  readonly id: string;

  readonly favoriteColor?: string;

  readonly createdAt?: string;

  readonly updatedAt?: string;
  constructor(init: ModelInit<UserPreference, UserPreferenceMetaData>);
  static copyOf(
    source: UserPreference,
    mutator: (
      draft: MutableModel<UserPreference, UserPreferenceMetaData>,
    ) => MutableModel<UserPreference, UserPreferenceMetaData> | void,
  ): UserPreference;
}

export declare class User {
  readonly id: string;

  readonly firstName?: string;

  readonly lastName?: string;

  readonly age?: number;

  readonly isLoggedIn?: boolean;

  readonly loggedInColor?: string;

  readonly loggedOutColor?: string;

  readonly createdAt?: string;

  readonly updatedAt?: string;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(
    source: User,
    mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void,
  ): User;
}
