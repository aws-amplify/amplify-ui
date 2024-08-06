import { act, renderHook } from '@testing-library/react-hooks';

import {
  SendUserAttributeVerificationCodeOutput,
  UpdateUserAttributesOutput,
  UserAttributeKey,
  confirmUserAttribute,
  deleteUserAttributes,
  fetchUserAttributes,
  sendUserAttributeVerificationCode,
  updateUserAttributes,
} from '@aws-amplify/auth';

import * as AuthModule from '@aws-amplify/auth';

import * as ActionModule from '../action';
import { handleAttributeAction } from '../action';

import {
  ConfirmInput,
  DeleteInput,
  FetchInput,
  HandleAttributeActionOutput,
  SendCodeInput,
  UpdateInput,
  VerifiableAttribute,
} from '../types';
import useUserAttributes from '../useUserAttributes';

const confirmUserAttributeSpy = jest.spyOn(AuthModule, 'confirmUserAttribute');
const deleteUserAttributesSpy = jest.spyOn(AuthModule, 'deleteUserAttributes');
const fetchUserAttributesSpy = jest.spyOn(AuthModule, 'fetchUserAttributes');
const sendCodeSpy = jest.spyOn(AuthModule, 'sendUserAttributeVerificationCode');
const updateUserAttributesSpy = jest.spyOn(AuthModule, 'updateUserAttributes');
const handleAttributeActionSpy = jest.spyOn(
  ActionModule,
  'handleAttributeAction'
);

const fetchUserAttributesResult: { [Attribute in UserAttributeKey]?: string } =
  {
    email: 'test@mail.com',
    name: 'Name',
    nickname: 'Nickname',
    locale: 'Testville',
  };

const deleteUserAttributesResult: { [Attribute in UserAttributeKey]?: string } =
  {
    email: 'test@mail.com',
    name: 'Name',
  };

const errorResult = new Error('TESTING ERROR');

const confirmEmailInput: ConfirmInput = {
  type: 'CONFIRM',
  userAttributeKey: 'email',
  confirmationCode: '000000',
};

const confirmPhoneInput: ConfirmInput = {
  type: 'CONFIRM',
  userAttributeKey: 'phone_number',
  confirmationCode: '000000',
};

const confirmAttributeOutput: HandleAttributeActionOutput = {
  attributes: { email: 'test@mail.com', name: 'name' },
  pendingVerification: undefined,
};

const emailConfirmedResult: HandleAttributeActionOutput = {
  attributes: { email: 'test@mail.com', name: 'name' },
  pendingVerification: [
    {
      name: 'phone_number',
      codeDeliveryDetails: {
        medium: 'SMS',
        destination: '12062062060',
      },
    },
  ],
};

const deleteAttributesInput: DeleteInput = {
  type: 'DELETE',
  userAttributeKeys: ['locale', 'nickname'],
};

const fetchInput: FetchInput = { type: 'FETCH' };

const updateAttributesInput: UpdateInput = {
  type: 'UPDATE',
  userAttributes: {
    name: 'New Name',
    nickname: 'New Nickname',
    email: 'new@mail.com',
    phone_number: '12062062060',
  },
};

const updateAttributesResult: UpdateUserAttributesOutput = {
  name: {
    isUpdated: true,
    nextStep: {
      updateAttributeStep: 'DONE',
    },
  },
  nickname: {
    isUpdated: true,
    nextStep: {
      updateAttributeStep: 'DONE',
    },
  },
  email: {
    isUpdated: true,
    nextStep: {
      updateAttributeStep: 'CONFIRM_ATTRIBUTE_WITH_CODE',
      codeDeliveryDetails: {
        deliveryMedium: 'EMAIL',
        destination: 'new@mail.com',
        attributeName: 'email',
      },
    },
  },
  phone_number: {
    isUpdated: true,
    nextStep: {
      updateAttributeStep: 'CONFIRM_ATTRIBUTE_WITH_CODE',
      codeDeliveryDetails: {
        deliveryMedium: 'SMS',
        destination: '12062062060',
        attributeName: 'phone_number',
      },
    },
  },
  address: {
    isUpdated: true,
    nextStep: {
      updateAttributeStep: 'DONE',
    },
  },
  birthdate: {
    isUpdated: true,
    nextStep: {
      updateAttributeStep: 'DONE',
    },
  },
  email_verified: {
    isUpdated: true,
    nextStep: {
      updateAttributeStep: 'DONE',
    },
  },
  family_name: {
    isUpdated: true,
    nextStep: {
      updateAttributeStep: 'DONE',
    },
  },
  gender: {
    isUpdated: true,
    nextStep: {
      updateAttributeStep: 'DONE',
    },
  },
  given_name: {
    isUpdated: true,
    nextStep: {
      updateAttributeStep: 'DONE',
    },
  },
  locale: {
    isUpdated: true,
    nextStep: {
      updateAttributeStep: 'DONE',
    },
  },
  middle_name: {
    isUpdated: true,
    nextStep: {
      updateAttributeStep: 'DONE',
    },
  },
  phone_number_verified: {
    isUpdated: true,
    nextStep: {
      updateAttributeStep: 'DONE',
    },
  },
  picture: {
    isUpdated: true,
    nextStep: {
      updateAttributeStep: 'DONE',
    },
  },
  preferred_username: {
    isUpdated: true,
    nextStep: {
      updateAttributeStep: 'DONE',
    },
  },
  profile: {
    isUpdated: true,
    nextStep: {
      updateAttributeStep: 'DONE',
    },
  },
  sub: {
    isUpdated: true,
    nextStep: {
      updateAttributeStep: 'DONE',
    },
  },
  updated_at: {
    isUpdated: true,
    nextStep: {
      updateAttributeStep: 'DONE',
    },
  },
  website: {
    isUpdated: true,
    nextStep: {
      updateAttributeStep: 'DONE',
    },
  },
  zoneinfo: {
    isUpdated: true,
    nextStep: {
      updateAttributeStep: 'DONE',
    },
  },
};

const noneConfirmedResultPendingVerification = [
  {
    name: 'email',
    codeDeliveryDetails: {
      medium: 'EMAIL',
      destination: 'new@mail.com',
    },
  },
  {
    name: 'phone_number',
    codeDeliveryDetails: { medium: 'SMS', destination: '12062062060' },
  },
];

const sendCodeEmailResult: SendUserAttributeVerificationCodeOutput = {
  attributeName: 'email',
  deliveryMedium: 'EMAIL',
  destination: 'test@mail.com',
};

const sendCodePhoneResult: SendUserAttributeVerificationCodeOutput = {
  attributeName: 'phone_number',
  deliveryMedium: 'SMS',
  destination: '12062062060',
};

const sendCodeFailedResult: SendUserAttributeVerificationCodeOutput = {
  attributeName: 'phone_number',
  deliveryMedium: 'SMS',
  destination: '',
};

const verifyEmailResult: VerifiableAttribute = {
  name: 'email',
  codeDeliveryDetails: {
    destination: 'test@mail.com',
    medium: 'EMAIL',
  },
};

const verifyPhoneResult: VerifiableAttribute = {
  name: 'phone_number',
  codeDeliveryDetails: {
    destination: '12062062060',
    medium: 'SMS',
  },
};

const sendCodeEmailInput: SendCodeInput = {
  type: 'SEND_CODE',
  userAttributeKey: 'email',
};

const sendCodePhoneInput: SendCodeInput = {
  type: 'SEND_CODE',
  userAttributeKey: 'phone_number',
};

describe('useUserAttributes', () => {
  beforeEach(jest.clearAllMocks);
  it('should delete attributes', async () => {
    deleteUserAttributesSpy.mockResolvedValue(undefined);
    fetchUserAttributesSpy.mockResolvedValueOnce(fetchUserAttributesResult);
    fetchUserAttributesSpy.mockResolvedValueOnce(deleteUserAttributesResult);

    const { result, waitForNextUpdate } = renderHook(() => useUserAttributes());

    const handleAttributes = result.current[1];

    act(() => {
      handleAttributes(fetchInput);
    });
    await waitForNextUpdate();

    const state = result.current[0];

    expect(state.data.attributes).toBe(fetchUserAttributesResult);

    act(() => {
      handleAttributes(deleteAttributesInput);
    });
    await waitForNextUpdate();

    const stateAfterUpdate = result.current[0];

    expect(stateAfterUpdate.hasError).toBe(false);
    expect(stateAfterUpdate.data.attributes).toBe(deleteUserAttributesResult);
    expect(deleteUserAttributes).toHaveBeenCalled();
    expect(fetchUserAttributes).toHaveBeenCalledTimes(2);
    expect(handleAttributeActionSpy).toHaveBeenCalledWith(
      { attributes: {}, pendingVerification: undefined },
      fetchInput
    );
    expect(handleAttributeActionSpy).toHaveBeenCalledWith(
      { attributes: fetchUserAttributesResult, pendingVerification: undefined },
      deleteAttributesInput
    );
  });

  it('should fetch attributes', async () => {
    fetchUserAttributesSpy.mockResolvedValueOnce(fetchUserAttributesResult);

    const { result, waitForNextUpdate } = renderHook(() => useUserAttributes());

    const handleAttributes = result.current[1];
    const state = result.current[0];

    expect(state.data.attributes).toStrictEqual({});

    act(() => {
      handleAttributes(fetchInput);
    });

    await waitForNextUpdate();

    const stateAfterUpdate = result.current[0];

    expect(stateAfterUpdate.data.attributes).toBe(fetchUserAttributesResult);
    expect(stateAfterUpdate.hasError).toBe(false);
    expect(stateAfterUpdate.message).toBeFalsy();
    expect(fetchUserAttributes).toHaveBeenCalled();
  });

  it('should update pendingVerification when sending code to email', async () => {
    sendCodeSpy.mockResolvedValue(sendCodeEmailResult);

    const { result, waitForNextUpdate } = renderHook(() => useUserAttributes());

    const handleAttributes = result.current[1];

    const state = result.current[0];

    expect(state.data.attributes).toStrictEqual({});

    act(() => {
      handleAttributes(sendCodeEmailInput);
    });

    await waitForNextUpdate();

    const stateAfterUpdate = result.current[0];

    expect(stateAfterUpdate.hasError).toBe(false);
    expect(stateAfterUpdate.data.pendingVerification).toStrictEqual([
      verifyEmailResult,
    ]);
    expect(sendUserAttributeVerificationCode).toHaveBeenCalled();
  });

  it('should throw an error if no code is sent', async () => {
    sendCodeSpy.mockResolvedValue(sendCodeFailedResult);

    const { result, waitForNextUpdate } = renderHook(() => useUserAttributes());

    const handleAttributes = result.current[1];

    const state = result.current[0];

    expect(state.data.attributes).toStrictEqual({});

    act(() => {
      handleAttributes(sendCodeEmailInput);
    });

    await waitForNextUpdate();

    const stateAfterUpdate = result.current[0];

    expect(stateAfterUpdate.hasError).toBe(true);
    expect(stateAfterUpdate.data.pendingVerification).toBe(undefined);
    expect(sendUserAttributeVerificationCode).toHaveBeenCalled();
  });

  it('should have an error if something fails while fetching', async () => {
    fetchUserAttributesSpy.mockRejectedValue(errorResult);

    const { result, waitForNextUpdate } = renderHook(() => useUserAttributes());

    const handleAttributes = result.current[1];

    act(() => {
      handleAttributes(fetchInput);
    });

    await waitForNextUpdate();

    const state = result.current[0];

    expect(state.hasError).toBe(true);
    expect(state.message).toBe(errorResult.message);
    expect(fetchUserAttributes).toHaveBeenCalled();
  });
  it('supports sending codes to multiple attributes', async () => {
    updateUserAttributesSpy.mockResolvedValue(updateAttributesResult);
    confirmUserAttributeSpy.mockResolvedValue(undefined);
    fetchUserAttributesSpy.mockResolvedValue(confirmAttributeOutput.attributes);
    const { result, waitForNextUpdate } = renderHook(() => useUserAttributes());

    const handleAttributes = result.current[1];
    const firstState = result.current[0];
    expect(firstState.data.pendingVerification).toBe(undefined);

    act(() => {
      handleAttributes(updateAttributesInput);
    });

    await waitForNextUpdate();

    expect(updateUserAttributes).toHaveBeenCalled();

    const initialState = result.current[0];
    expect(initialState.data.pendingVerification).toStrictEqual(
      noneConfirmedResultPendingVerification
    );

    act(() => {
      handleAttributes(confirmEmailInput);
    });

    await waitForNextUpdate();

    const state = result.current[0];

    expect(state.hasError).toBe(false);
    expect(state.data.attributes).toStrictEqual(
      confirmAttributeOutput.attributes
    );
    expect(state.data.pendingVerification).toStrictEqual(
      emailConfirmedResult.pendingVerification
    );
    expect(confirmUserAttribute).toHaveBeenCalled();
    expect(fetchUserAttributes).toHaveBeenCalled();

    act(() => {
      handleAttributes(confirmPhoneInput);
    });

    await waitForNextUpdate();

    const finalState = result.current[0];
    expect(finalState.data.pendingVerification).toStrictEqual(
      confirmAttributeOutput.pendingVerification
    );
  });
  it('should filter out attributes with a different name than userAttributeKey when sending a code', async () => {
    sendCodeSpy.mockResolvedValue(sendCodeEmailResult);

    const { result, waitForNextUpdate } = renderHook(() => useUserAttributes());

    const handleAttributes = result.current[1];

    act(() => {
      handleAttributes(sendCodeEmailInput);
    });

    await waitForNextUpdate();

    const stateAfterUpdate = result.current[0];

    expect(stateAfterUpdate.hasError).toBe(false);
    expect(stateAfterUpdate.data.pendingVerification).toStrictEqual([
      verifyEmailResult,
    ]);

    sendCodeSpy.mockResolvedValue(sendCodePhoneResult);
    act(() => {
      handleAttributes(sendCodePhoneInput);
    });

    await waitForNextUpdate();

    const finalState = result.current[0];
    expect(finalState.data.pendingVerification).toStrictEqual([
      verifyEmailResult,
      verifyPhoneResult,
    ]);
  });
});
describe('handleAttributeAction', () => {
  it('should handle errors for invalid input types', async () => {
    const prevResult = {
      pendingVerification: [],
      attributes: {},
    };

    const invalidInput = { type: 'INVALID_TYPE' };

    await expect(
      // @ts-expect-error
      handleAttributeAction(prevResult, invalidInput)
    ).rejects.toThrow('Invalid Type');
  });
});
