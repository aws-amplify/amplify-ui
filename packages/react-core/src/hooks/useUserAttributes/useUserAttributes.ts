import useDataState from '../useDataState';

import { handleAttributeAction } from './action';
import { UseUserAttributesState } from './types';

const useUserAttributes = (): UseUserAttributesState =>
  useDataState(handleAttributeAction, {
    attributes: {},
    pendingVerification: undefined,
  });

export default useUserAttributes;
