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
      <Accordion.Item key={title} title={title} value={title}>
        <PropsTable properties={categoryProperty[title]} />
      </Accordion.Item>
    );
  };

  return (
    <Accordion className="props-table-expander">
      {propsSortedByCategory.map(expanderItem)}
    </Accordion>
  );
}
