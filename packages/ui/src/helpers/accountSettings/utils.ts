import { AmplifyUser, MFAType } from '../../types';
import parsePhoneNumber from 'libphonenumber-js';

export type UserPhoneInfo = {
  hasPhoneNumber: boolean;
  isVerified?: boolean;
  dialCode?: string;
  phoneNumber?: string;
};

export const getUserPhoneInfo = (user: AmplifyUser): UserPhoneInfo => {
  const { phone_number, phone_number_verifeid } = user.attributes;

  if (phone_number) {
    const { nationalNumber, countryCallingCode } =
      parsePhoneNumber(phone_number);
    return {
      hasPhoneNumber: true,
      isVerified: !!phone_number_verifeid,
      dialCode: countryCallingCode,
      phoneNumber: nationalNumber,
    };
  } else {
    return { hasPhoneNumber: false };
  }
};

export const isMFAType = (mfaType: string): mfaType is MFAType => {
  return mfaType === 'sms' || mfaType === 'totp' || mfaType === 'noMFA';
};
