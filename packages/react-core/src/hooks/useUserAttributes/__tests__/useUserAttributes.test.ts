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

const confirmAttributeInput: ConfirmInput = {
  type: 'CONFIRM',
  userAttributeKey: 'email',
  confirmationCode: '000000',
};

const confirmAttributeOutput: HandleAttributeActionOutput = {
  attributes: { email: 'test@mail.com', name: 'name' },
  pendingVerification: [{ name: 'email' }],
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
      updateAttributeStep: 'DONE',
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

const updatedAttributes: { [Attribute in UserAttributeKey]?: string } = {
  name: 'New Name',
  nickname: 'New Nickname',
  email: 'test@mail.com',
  locale: 'Testville',
};

const sendCodeResult: SendUserAttributeVerificationCodeOutput = {
  attributeName: 'email',
  deliveryMedium: 'EMAIL',
  destination: 'test@mail.com',
};
const verifiableAttributeResult: VerifiableAttribute = {
  name: 'email',
  codeDeliveryDetails: {
    destination: 'test@mail.com',
    medium: 'EMAIL',
  },
};

const sendCodeInput: SendCodeInput = {
  type: 'SEND_CODE',
  userAttributeKey: 'email',
};

describe('useUserAttributes', () => {
  beforeEach(jest.clearAllMocks);

  it('should confirm attributes', async () => {
    confirmUserAttributeSpy.mockResolvedValueOnce(undefined);
    fetchUserAttributesSpy.mockResolvedValue(confirmAttributeOutput.attributes);
    const { result, waitForNextUpdate } = renderHook(() => useUserAttributes());

    const handleAttributes = result.current[1];

    act(() => {
      handleAttributes(confirmAttributeInput);
    });

    await waitForNextUpdate();

    expect(result.current[0].hasError).toBe(false);
    expect(result.current[0].data.attributes).toBe(
      confirmAttributeOutput.attributes
    );
    expect(result.current[0].data.pendingVerification).toStrictEqual(
      confirmAttributeOutput.pendingVerification
    );
    expect(confirmUserAttribute).toHaveBeenCalled();
    expect(fetchUserAttributes).toHaveBeenCalled();
  });

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

    expect(result.current[0].data.attributes).toBe(fetchUserAttributesResult);

    act(() => {
      handleAttributes(deleteAttributesInput);
    });
    await waitForNextUpdate();

    expect(result.current[0].hasError).toBe(false);
    expect(result.current[0].data.attributes).toBe(deleteUserAttributesResult);
    expect(deleteUserAttributes).toHaveBeenCalled();
    expect(fetchUserAttributes).toHaveBeenCalledTimes(2);
  });

  it('should fetch attributes', async () => {
    fetchUserAttributesSpy.mockResolvedValueOnce(fetchUserAttributesResult);

    const { result, waitForNextUpdate } = renderHook(() => useUserAttributes());

    const handleAttributes = result.current[1];

    expect(result.current[0].data.attributes).toStrictEqual({});

    act(() => {
      handleAttributes(fetchInput);
    });

    await waitForNextUpdate();

    expect(result.current[0].data.attributes).toBe(fetchUserAttributesResult);
    expect(result.current[0].hasError).toBe(false);
    expect(result.current[0].message).toBeFalsy();
    expect(fetchUserAttributes).toHaveBeenCalled();
  });

  it('should update pendingVerification when sending code', async () => {
    sendCodeSpy.mockResolvedValue(sendCodeResult);

    const { result, waitForNextUpdate } = renderHook(() => useUserAttributes());

    const handleAttributes = result.current[1];

    expect(result.current[0].data.attributes).toStrictEqual({});

    act(() => {
      handleAttributes(sendCodeInput);
    });

    await waitForNextUpdate();

    expect(result.current[0].hasError).toBe(false);
    expect(result.current[0].data.pendingVerification).toStrictEqual([
      verifiableAttributeResult,
    ]);
    expect(sendUserAttributeVerificationCode).toHaveBeenCalled();
  });

  it('should update attributes and pendingVerifcation', async () => {
    updateUserAttributesSpy.mockResolvedValue(updateAttributesResult);
    fetchUserAttributesSpy.mockResolvedValue(updatedAttributes);

    const { result, waitForNextUpdate } = renderHook(() => useUserAttributes());

    const handleAttributes = result.current[1];

    act(() => {
      handleAttributes(updateAttributesInput);
    });

    await waitForNextUpdate();

    act(() => {
      handleAttributes(fetchInput);
    });

    await waitForNextUpdate();

    expect(result.current[0].hasError).toBe(false);
    expect(result.current[0].data.attributes).toStrictEqual(updatedAttributes);
    expect(updateUserAttributes).toHaveBeenCalled();
    expect(fetchUserAttributes).toHaveBeenCalled();
    expect(result.current[0].data.pendingVerification).toStrictEqual([
      {
        name: 'email',
        codeDeliveryDetails: { destination: 'new@mail.com', medium: 'EMAIL' },
      },
      {
        name: 'phone_number',
        codeDeliveryDetails: {
          destination: undefined,
          medium: undefined,
        },
      },
    ]);
  });

  it('should have an error if something fails', async () => {
    fetchUserAttributesSpy.mockRejectedValue(errorResult);

    const { result, waitForNextUpdate } = renderHook(() => useUserAttributes());

    const handleAttributes = result.current[1];

    act(() => {
      handleAttributes(fetchInput);
    });

    await waitForNextUpdate();

    expect(result.current[0].hasError).toBe(true);
    expect(result.current[0].message).toBe(errorResult.message);
    expect(fetchUserAttributes).toHaveBeenCalled();
  });
});
