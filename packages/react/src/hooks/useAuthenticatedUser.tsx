import { Auth, CognitoUser } from '@aws-amplify/auth';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { useEffect, useState } from 'react';

type AttributeMap = Record<string, string>;

const createUserAttributeMap = (
  attributes: CognitoUserAttribute[]
): AttributeMap =>
  Object.fromEntries(
    attributes.map((attribute) => [attribute.getName(), attribute.getValue()])
  );

export const useAuthenticatedUser = () => {
  const [attributes, setAttributes] = useState<AttributeMap>({});
  const [error, setError] = useState<Error>();

  const fetch = () => {
    Auth.currentAuthenticatedUser()
      .then((user: CognitoUser | undefined) => {
        if ('getUserAttributes' in user) {
          user.getUserAttributes((err, attributes) => {
            if (err) {
              throw err;
            }

            if (Array.isArray(attributes)) {
              setAttributes(createUserAttributeMap(attributes));
            }
          });
        }
      })
      .catch(setError);
  };

  useEffect(fetch, []);

  return {
    attributes,
    error,
  };
};
