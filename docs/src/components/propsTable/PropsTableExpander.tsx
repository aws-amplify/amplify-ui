import { Accordion } from '@aws-amplify/ui-react';
import { Properties, Category } from '../../../scripts/types/catalog';
import { PropsTable } from './PropsTable';

type CategoryProperty = { [key in Category]: Properties };
type SortedPropertiesByCategory = { [key: string]: Properties }[];

export function PropsTableExpander({
  propsSortedByCategory,
}: {
  propsSortedByCategory: SortedPropertiesByCategory;
}) {
  const expanderItem = (categoryProperty: CategoryProperty): JSX.Element => {
    const title = Object.keys(categoryProperty)[0];
    return (
      <Accordion.Item key={title} value={title}>
        <Accordion.Trigger>
          {title}
          <Accordion.Icon />
        </Accordion.Trigger>
        <Accordion.Content>
          <PropsTable properties={categoryProperty[title]} />
        </Accordion.Content>
      </Accordion.Item>
    );
  };

  return (
    <Accordion.Container>
      {propsSortedByCategory.map(expanderItem)}
    </Accordion.Container>
  );
}
