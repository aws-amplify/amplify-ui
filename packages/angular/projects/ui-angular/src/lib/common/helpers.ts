import { authInputAttributes } from '@aws-amplify/ui';
import { AttributeInfoProvider } from './types';

export const getAttributeMap: AttributeInfoProvider = () => authInputAttributes;
