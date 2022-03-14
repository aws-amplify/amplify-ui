import * as React from 'react';

import {
  Collection,
  Divider,
  Link,
  Text,
  useTheme,
} from '@aws-amplify/ui-react';

export const APICollection = ({ items }: APICollectionProps) => {
  const { tokens } = useTheme();
  const sortedItems = [...items].sort((a, b) => {
    if (a.required === b.required) {
      return +(a.prop > b.prop) || -1;
    }
    return +b.required || -1;
  });

  return (
    <Collection items={sortedItems} type="list">
      {({
        defaultVal = '(none)',
        description,
        link = false,
        prop,
        required = false,
        type,
      }) => (
        <>
          <Text
            fontSize={tokens.fontSizes.large}
            fontWeight={tokens.fontWeights.semibold}
          >
            <code>{prop}</code>
            <Text
              as="span"
              fontStyle="italic"
              fontWeight="normal"
              variation={required ? 'warning' : 'secondary'}
            >
              {required ? '(required)' : '(optional)'}
            </Text>
            {': '}
            {link ? (
              <Link
                href={`#${type.toLowerCase()}`}
                isExternal={false}
                {...link}
              >
                {type}
              </Link>
            ) : (
              type
            )}
            ;
          </Text>
          <Text
            fontSize={tokens.fontSizes.medium}
            fontStyle="italic"
            fontWeight={tokens.fontWeights.medium}
            variation="tertiary"
          >
            Default: <code>{defaultVal}</code>
          </Text>
          {description}
          <Divider size="small" />
        </>
      )}
    </Collection>
  );
};

type APICollectionItem = {
  defaultVal?: any;
  description: string;
  link?: boolean | { href?: string; isExternal?: boolean };
  prop: string;
  required?: boolean;
  type: string;
};

type APICollectionProps = {
  items: APICollectionItem[];
};
