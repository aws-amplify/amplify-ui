import { Accordion, Card, Collection, Text } from '@aws-amplify/ui-react';

export const AuthenticatorClasses = () => {
  const classList = [
    'amplify-button',
    'amplify-checkbox',
    'amplify-countrycodeselect',
    'amplify-divider',
    'amplify-divider--label',
    'amplify-field',
    'amplify-field-group',
    'amplify-flex',
    'amplify-heading',
    'amplify-icon',
    'amplify-image',
    'amplify-input',
    'amplify-label',
    'amplify-passwordfield',
    'amplify-phonenumberfield',
    'amplify-radio',
    'amplify-selectfield',
    'amplify-tabs',
    'amplify-text',
    'amplify-text--error',
    'amplify-textfield',
    'amplify-visually-hidden',
  ];
  const search = (className, searchText) => className.includes(searchText);

  return (
    <Accordion.Container>
      <Accordion.Item value="classNames">
        <Accordion.Trigger>
          Available Classes
          <Accordion.Icon />
        </Accordion.Trigger>
        <Accordion.Content>
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
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Container>
  );
};
