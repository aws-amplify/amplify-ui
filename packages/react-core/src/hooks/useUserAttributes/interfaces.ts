import {
  confirmUserAttributeAction,
  deleteUserAttributesAction,
  fetchUserAttributesAction,
  sendUserAttributeVerificationCodeAction,
  updateUserAttributesAction,
} from './constants';

import {
  UseConfirmUserAttribute,
  UseDeleteUserAttributes,
  UseFetchUserAttributes,
  UseSendUserAttributeVerificationCode,
  UseUpdateUserAttributes,
} from './types';

// Describes actions passed to useDataState
export interface Actions {
  confirm: typeof confirmUserAttributeAction;
  delete: typeof deleteUserAttributesAction;
  sendCode: typeof sendUserAttributeVerificationCodeAction;
  update: typeof updateUserAttributesAction;
  fetch: typeof fetchUserAttributesAction;
}

export interface UseActions {
  confirm: UseConfirmUserAttribute;
  delete: UseDeleteUserAttributes;
  fetch: UseFetchUserAttributes;
  sendCode: UseSendUserAttributeVerificationCode;
  update: UseUpdateUserAttributes;
}
