import { authInputAttributes } from '@aws-amplify/ui-core';
import { AttributeInfoProvider } from './types';

export const getAttributeMap: AttributeInfoProvider = () => authInputAttributes;
