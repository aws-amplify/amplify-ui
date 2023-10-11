import {
  Category,
  StorageAction,
  SetCustomUserAgentInput,
} from '@aws-amplify/core/internals/utils';

export const storageImageDataPlaneState: SetCustomUserAgentInput = {
  category: Category.Storage,
  apis: [StorageAction.GetUrl],
  additionalDetails: [['component', 'storageimage']],
};

export const storageManagerDataPlaneState: SetCustomUserAgentInput = {
  category: Category.Storage,
  apis: [StorageAction.UploadData],
  additionalDetails: [['component', 'storagemanager']],
};
