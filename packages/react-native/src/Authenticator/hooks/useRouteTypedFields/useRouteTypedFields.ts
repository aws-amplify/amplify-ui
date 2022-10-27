import { useEffect, useState } from 'react';
import {
  isAuthenticatorComponentRouteKey,
  UseAuthenticator,
  useHasValueUpdated,
} from '@aws-amplify/ui-react-core';

import { TypedField } from './types';
import { getTypedFields } from './utils';

export default function useRouteTypedFields({
  fields,
  route,
}: Pick<UseAuthenticator, 'fields' | 'route'>): TypedField[] {
  const [typedFields, setTypedFields] = useState<TypedField[]>([]);

  // content of `fields` is updated on `route` update
  const hasRouteUpdated = useHasValueUpdated(route);

  useEffect(() => {
    if (!hasRouteUpdated) {
      return;
    }

    const isComponentRoute = isAuthenticatorComponentRouteKey(route);
    if (isComponentRoute) {
      // `VerifyUser` does not require additional updates to the shape of `fields`
      const isVerifyUserRoute = route === 'verifyUser';
      const radioFields = fields as TypedField[];

      setTypedFields(isVerifyUserRoute ? radioFields : getTypedFields(fields));
    }

    if (!isComponentRoute) {
      // reset `typedFields`
      setTypedFields([]);
    }
  }, [fields, hasRouteUpdated, route]);

  return typedFields;
}
