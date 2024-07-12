import React from 'react';
import { useDataState } from '@aws-amplify/ui-react-core';
import { listLocationItemsAction } from '../context/actions';

export default function LocationDetailView(): JSX.Element {
  const [{ data, isLoading }, handleListItems] = useDataState(
    listLocationItemsAction,
    { items: [], nextToken: undefined }
  );

  React.useEffect(() => {
    handleListItems({ options: { pageSize: 100 } });
  }, [handleListItems]);

  const hasItems = !!data.items.length;
  const listItems = !hasItems
    ? null
    : data.items.map(({ key }) => <p key={key}>{key}</p>);

  return <>{isLoading && !hasItems ? 'loading...' : listItems}</>;
}
