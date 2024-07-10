import {
  SendUserAttributeVerificationCodeOutput,
  UpdateUserAttributesOutput,
  UserAttributeKey,
} from "aws-amplify/auth";

export type UserAttributes = Record<UserAttributeKey, string | undefined>;

export const DefaultAttributes: UserAttributes = {
  email: undefined,
  phone_number: undefined,
  address: undefined,
  birthdate: undefined,
  email_verified: undefined,
  family_name: undefined,
  gender: undefined,
  given_name: undefined,
  locale: undefined,
  middle_name: undefined,
  name: undefined,
  nickname: undefined,
  phone_number_verified: undefined,
  picture: undefined,
  preferred_username: undefined,
  profile: undefined,
  sub: undefined,
  updated_at: undefined,
  website: undefined,
  zoneinfo: undefined,
};

// Default object to be passed into useDataState
export const defaultUpdateUserAttributesOutput: UpdateUserAttributesOutput = {
  ["custom:placeholder"]: {
    isUpdated: true,
    nextStep: {
      codeDeliveryDetails: {
        attributeName: undefined,
        deliveryMedium: undefined,
        destination: undefined,
      },
      updateAttributeStep: "DONE",
    },
  },
  address: {
    isUpdated: true,
    nextStep: {
      codeDeliveryDetails: {
        attributeName: undefined,
        deliveryMedium: undefined,
        destination: undefined,
      },
      updateAttributeStep: "DONE",
    },
  },
  birthdate: {
    isUpdated: true,
    nextStep: {
      codeDeliveryDetails: {
        attributeName: undefined,
        deliveryMedium: undefined,
        destination: undefined,
      },
      updateAttributeStep: "DONE",
    },
  },
  email_verified: {
    isUpdated: true,
    nextStep: {
      codeDeliveryDetails: {
        attributeName: undefined,
        deliveryMedium: undefined,
        destination: undefined,
      },
      updateAttributeStep: "DONE",
    },
  },
  family_name: {
    isUpdated: true,
    nextStep: {
      codeDeliveryDetails: {
        attributeName: undefined,
        deliveryMedium: undefined,
        destination: undefined,
      },
      updateAttributeStep: "DONE",
    },
  },
  gender: {
    isUpdated: true,
    nextStep: {
      codeDeliveryDetails: {
        attributeName: undefined,
        deliveryMedium: undefined,
        destination: undefined,
      },
      updateAttributeStep: "DONE",
    },
  },
  given_name: {
    isUpdated: true,
    nextStep: {
      codeDeliveryDetails: {
        attributeName: undefined,
        deliveryMedium: undefined,
        destination: undefined,
      },
      updateAttributeStep: "DONE",
    },
  },
  locale: {
    isUpdated: true,
    nextStep: {
      codeDeliveryDetails: {
        attributeName: undefined,
        deliveryMedium: undefined,
        destination: undefined,
      },
      updateAttributeStep: "DONE",
    },
  },
  middle_name: {
    isUpdated: true,
    nextStep: {
      codeDeliveryDetails: {
        attributeName: undefined,
        deliveryMedium: undefined,
        destination: undefined,
      },
      updateAttributeStep: "DONE",
    },
  },
  name: {
    isUpdated: true,
    nextStep: {
      codeDeliveryDetails: {
        attributeName: undefined,
        deliveryMedium: undefined,
        destination: undefined,
      },
      updateAttributeStep: "DONE",
    },
  },
  nickname: {
    isUpdated: true,
    nextStep: {
      codeDeliveryDetails: {
        attributeName: undefined,
        deliveryMedium: undefined,
        destination: undefined,
      },
      updateAttributeStep: "DONE",
    },
  },
  phone_number_verified: {
    isUpdated: true,
    nextStep: {
      codeDeliveryDetails: {
        attributeName: undefined,
        deliveryMedium: undefined,
        destination: undefined,
      },
      updateAttributeStep: "DONE",
    },
  },
  picture: {
    isUpdated: true,
    nextStep: {
      codeDeliveryDetails: {
        attributeName: undefined,
        deliveryMedium: undefined,
        destination: undefined,
      },
      updateAttributeStep: "DONE",
    },
  },
  preferred_username: {
    isUpdated: true,
    nextStep: {
      codeDeliveryDetails: {
        attributeName: undefined,
        deliveryMedium: undefined,
        destination: undefined,
      },
      updateAttributeStep: "DONE",
    },
  },
  profile: {
    isUpdated: true,
    nextStep: {
      codeDeliveryDetails: {
        attributeName: undefined,
        deliveryMedium: undefined,
        destination: undefined,
      },
      updateAttributeStep: "DONE",
    },
  },
  sub: {
    isUpdated: true,
    nextStep: {
      codeDeliveryDetails: {
        attributeName: undefined,
        deliveryMedium: undefined,
        destination: undefined,
      },
      updateAttributeStep: "DONE",
    },
  },
  updated_at: {
    isUpdated: true,
    nextStep: {
      codeDeliveryDetails: {
        attributeName: undefined,
        deliveryMedium: undefined,
        destination: undefined,
      },
      updateAttributeStep: "DONE",
    },
  },
  website: {
    isUpdated: true,
    nextStep: {
      codeDeliveryDetails: {
        attributeName: undefined,
        deliveryMedium: undefined,
        destination: undefined,
      },
      updateAttributeStep: "DONE",
    },
  },
  zoneinfo: {
    isUpdated: true,
    nextStep: {
      codeDeliveryDetails: {
        attributeName: undefined,
        deliveryMedium: undefined,
        destination: undefined,
      },
      updateAttributeStep: "DONE",
    },
  },
  email: {
    isUpdated: true,
    nextStep: {
      codeDeliveryDetails: {
        attributeName: undefined,
        deliveryMedium: undefined,
        destination: undefined,
      },
      updateAttributeStep: "DONE",
    },
  },
  phone_number: {
    isUpdated: true,
    nextStep: {
      codeDeliveryDetails: {
        attributeName: undefined,
        deliveryMedium: undefined,
        destination: undefined,
      },
      updateAttributeStep: "DONE",
    },
  },
};
// Default object to be passed into useDataState
export const defaultSendUserAttributeVerificationCodeOutput: SendUserAttributeVerificationCodeOutput =
  {
    attributeName: "email",
    deliveryMedium: "EMAIL",
    destination: "a***@b.com",
  };
