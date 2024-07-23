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

const mockAttributes: { [Attribute in UserAttributeKey]?: string } = {
  email: 'test@mail.com',
  name: 'Name',
  nickname: 'Nickname',
  locale: 'Testville',
};

const mockDeletion: { [Attribute in UserAttributeKey]?: string } = {
  email: 'test@mail.com',
  name: 'Name',
};

const mockError = new Error('TESTING ERROR');

const mockConfirmInput: ConfirmInput = {
  type: 'CONFIRM',
  userAttributeKey: 'email',
  confirmationCode: '000000',
};

const mockAfterVerification: HandleAttributeActionOutput = {
  attributes: { email: 'test@mail.com', name: 'name' },
  pendingVerification: [{ name: 'email' }],
};

const mockDeleteInput: DeleteInput = {
  type: 'DELETE',
  userAttributeKeys: ['locale', 'nickname'],
};

const mockFetchInput: FetchInput = { type: 'FETCH' };

const mockUpdateInput: UpdateInput = {
  type: 'UPDATE',
  userAttributes: {
    name: 'New Name',
    nickname: 'New Nickname',
    email: 'new@mail.com',
  },
};

const mockUpdateOutput: UpdateUserAttributesOutput = {
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

const mockSendOutput: SendUserAttributeVerificationCodeOutput = {
  attributeName: 'email',
  deliveryMedium: 'EMAIL',
  destination: 'test@mail.com',
};
const mockSendTranslatedOutput: VerifiableAttribute = {
  name: 'email',
  codeDeliveryDetails: {
    destination: 'test@mail.com',
    medium: 'EMAIL',
  },
};

const mockSendInput: SendCodeInput = {
  type: 'SEND_CODE',
  userAttributeKey: 'email',
};

describe('useUserAttributes', () => {
  beforeEach(jest.clearAllMocks);

  it('should confirm attributes', async () => {
    confirmUserAttributeSpy.mockResolvedValueOnce(undefined);
    fetchUserAttributesSpy.mockResolvedValue(mockAfterVerification.attributes);
    const { result, waitForNextUpdate } = renderHook(() => useUserAttributes());

    const handleAttributes = result.current[1];

    act(() => {
      handleAttributes(mockConfirmInput);
    });

    await waitForNextUpdate();

    expect(result.current[0].hasError).toBe(false);
    expect(result.current[0].data.attributes).toBe(
      mockAfterVerification.attributes
    );
    expect(result.current[0].data.pendingVerification).toStrictEqual(
      mockAfterVerification.pendingVerification
    );
    expect(confirmUserAttribute).toHaveBeenCalled();
    expect(fetchUserAttributes).toHaveBeenCalled();
  });

  it('should delete attributes', async () => {
    deleteUserAttributesSpy.mockResolvedValue(undefined);
    fetchUserAttributesSpy.mockResolvedValueOnce(mockAttributes);
    fetchUserAttributesSpy.mockResolvedValueOnce(mockDeletion);

    const { result, waitForNextUpdate } = renderHook(() => useUserAttributes());

    const handleAttributes = result.current[1];

    act(() => {
      handleAttributes({ type: 'FETCH' });
    });
    await waitForNextUpdate();

    expect(result.current[0].data.attributes).toBe(mockAttributes);

    act(() => {
      handleAttributes(mockDeleteInput);
    });
    await waitForNextUpdate();

    expect(result.current[0].hasError).toBe(false);
    expect(result.current[0].data.attributes).toBe(mockDeletion);
    expect(deleteUserAttributes).toHaveBeenCalled();
    expect(fetchUserAttributes).toHaveBeenCalledTimes(2);
  });

  it('should fetch attributes', async () => {
    fetchUserAttributesSpy.mockResolvedValueOnce(mockAttributes);

    const { result, waitForNextUpdate } = renderHook(() => useUserAttributes());

    const handleAttributes = result.current[1];

    expect(result.current[0].data.attributes).toStrictEqual({});

    act(() => {
      handleAttributes(mockFetchInput);
    });

    await waitForNextUpdate();

    expect(result.current[0].data.attributes).toBe(mockAttributes);
    expect(result.current[0].hasError).toBe(false);
    expect(result.current[0].message).toBeFalsy();
    expect(fetchUserAttributes).toHaveBeenCalled();
  });

  it('should update pendingVerification when sending code', async () => {
    sendCodeSpy.mockResolvedValue(mockSendOutput);

    const { result, waitForNextUpdate } = renderHook(() => useUserAttributes());

    const handleAttributes = result.current[1];

    expect(result.current[0].data.attributes).toStrictEqual({});

    act(() => {
      handleAttributes(mockSendInput);
    });

    await waitForNextUpdate();

    expect(result.current[0].hasError).toBe(false);
    expect(result.current[0].data.pendingVerification).toStrictEqual([
      mockSendTranslatedOutput,
    ]);
    expect(sendUserAttributeVerificationCode).toHaveBeenCalled();
  });

  it('should update attributes and pendingVerifcation', async () => {
    updateUserAttributesSpy.mockResolvedValue(mockUpdateOutput);
    fetchUserAttributesSpy.mockResolvedValue(updatedAttributes);

    const { result, waitForNextUpdate } = renderHook(() => useUserAttributes());

    const handleAttributes = result.current[1];

    act(() => {
      handleAttributes(mockUpdateInput);
    });

    await waitForNextUpdate();

    act(() => {
      handleAttributes(mockFetchInput);
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
    fetchUserAttributesSpy.mockRejectedValue(mockError);

    const { result, waitForNextUpdate } = renderHook(() => useUserAttributes());

    const handleAttributes = result.current[1];

    act(() => {
      handleAttributes(mockFetchInput);
    });

    await waitForNextUpdate();

    expect(result.current[0].hasError).toBe(true);
    expect(result.current[0].message).toBe(mockError.message);
    expect(fetchUserAttributes).toHaveBeenCalled();
  });
});
