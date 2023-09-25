import { Expander, ExpanderGroup } from '@aws-amplify/ui-react';
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
      <Expander key={title} title={title} value={title}>
        <PropsTable properties={categoryProperty[title]} />
      </Expander>
    );
  };

  return (
    <ExpanderGroup type="multiple" className="props-table-expander">
      {propsSortedByCategory.map(expanderItem)}
    </ExpanderGroup>
  );
}
