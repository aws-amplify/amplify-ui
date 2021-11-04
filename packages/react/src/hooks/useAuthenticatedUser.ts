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
  const [username, setUsername] = useState<string>();
  const [error, setError] = useState<Error>();

  const fetch = () => {
    Auth.currentAuthenticatedUser()
      .then((user: CognitoUser | undefined) => {
        if (!user) {
          setError(new Error('Current authenticated user is not available'));
          return;
        }

        // Get authenticated user's username
        setUsername(user.getUsername());

        // Fetch attributes as a key/value object
        user.getUserAttributes((err, attributes) => {
          if (err) {
            setError(err);
          } else if (Array.isArray(attributes)) {
            setAttributes(createUserAttributeMap(attributes));
          }
        });
      })
      .catch(setError);
  };

  useEffect(fetch, []);

  return {
    username,
    attributes,
    fetch,
    error,
  };
};
