import type { PreSignUpTriggerHandler } from 'aws-lambda';

// auto confirm user and verify attributes

export const handler: PreSignUpTriggerHandler = async (event) => {
  event.response.autoConfirmUser = true;
  if (event.request.userAttributes?.email) {
    event.response.autoVerifyEmail = true;
  }
  if (event.request.userAttributes?.phoneNumber) {
    event.response.autoVerifyPhone = true;
  }
  return event;
};
