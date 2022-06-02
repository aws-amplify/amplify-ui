import {
  Collection,
  Card,
  Text,
  Expander,
  ExpanderItem,
} from '@aws-amplify/ui-react';

export const AuthenticatorClasses = () => {
  const classList = [
    'amplify-button',
    'amplify-checkbox',
    'amplify-countrycodeselect',
    'amplify-divider',
    'amplify-field',
    'amplify-field-group',
    'amplify-flex',
    'amplify-heading',
    ' amplify-icon',
    ' amplify-input',
    'amplify-passwordfield',
    'amplify-phonenumberfield',
    'amplify-selectfield',
    'amplify-tabs',
    'amplify-text',
    'amplify-textfield',
    'amplify-visually-hidden',
  ];
  const search = (className, searchText) => className.includes(searchText);

  return (
    <Expander>
      <ExpanderItem title="Available Classes" value="classNames">
        <Collection
          type="list"
          items={classList}
          gap="1.5rem"
          direction="row"
          isSearchable={true}
          searchFilter={search}
          searchPlaceholder="Type to search..."
          wrap="wrap"
          justifyContent="start"
        >
          {(className, index) => (
            <Card key={index} padding="1rem">
              <Text>{className}</Text>
            </Card>
          )}
        </Collection>
      </ExpanderItem>
    </Expander>
  );
};
