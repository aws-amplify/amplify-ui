import React from 'react';
import { useDataState } from '@aws-amplify/ui-react-core';
import { listLocationsAction } from '../context/actions';
import {
  PaginationControl,
  RefreshControl,
  SearchControl,
  Title,
  Controls,
  LoadingIndicator,
  Layout,
  Breadcrumbs,
} from '../subcomponents';

export default function LocationsListView(): JSX.Element {
  const [{ data, isLoading }, handleListLocations] = useDataState(
    listLocationsAction,
    { locations: [], nextToken: undefined }
  );

  React.useEffect(() => {
    handleListLocations({ options: { pageSize: 100 } });
  }, [handleListLocations]);

  const hasLocations = !!data.locations.length;
  const listLocations = !hasLocations
    ? null
    : data.locations.map(({ name }) => (
        <tr key={name}>
          <td>
            <button>{name}</button>
          </td>
          <td>Read/Write</td>
        </tr>
      ));

  const handleSort = () => {};
  const searchInputId = `searchInput-${React.useId()}`;

  return (
    <>
      {!hasLocations && isLoading ? (
        <LoadingIndicator />
      ) : (
        <Layout>
          {/* Provides layout */}
          <Breadcrumbs>
            <Breadcrumbs.Item>
              <Breadcrumbs.Button>Home</Breadcrumbs.Button>
              <Breadcrumbs.Separator />
            </Breadcrumbs.Item>
            <Breadcrumbs.Item>
              <Breadcrumbs.Button>Some folder</Breadcrumbs.Button>
              <Breadcrumbs.Separator />
            </Breadcrumbs.Item>
            <Breadcrumbs.Item>
              <Breadcrumbs.Button>Some other folder</Breadcrumbs.Button>
            </Breadcrumbs.Item>
          </Breadcrumbs>

          <Controls>
            {/* Provides layout */}
            <Controls.Primary>
              {/* Provides layout */}
              <Title>Home</Title>
              <SearchControl>
                <SearchControl.Field>
                  <SearchControl.Field.Label htmlFor={searchInputId} />
                  <SearchControl.Field.Input id={searchInputId} />
                </SearchControl.Field>
                <SearchControl.SubmitButton />
                <SearchControl.Results />
              </SearchControl>
            </Controls.Primary>
            <Controls.Secondary>
              {/* Provides layout */}
              <RefreshControl />
              <PaginationControl>
                <PaginationControl.Item>
                  <PaginationControl.PreviousButton />
                </PaginationControl.Item>
                <PaginationControl.Item>
                  <PaginationControl.CurrentPage>
                    1
                  </PaginationControl.CurrentPage>
                </PaginationControl.Item>
                <PaginationControl.Item>
                  <PaginationControl.NextButton />
                </PaginationControl.Item>
              </PaginationControl>
            </Controls.Secondary>
          </Controls>
          <div className={``}>
            {/* Provides layout */}
            <table className={``} aria-label="Locations">
              <thead>
                <tr>
                  <th aria-sort="ascending">
                    {/* ascending | descending | none*/}
                    <button
                      onClick={handleSort}
                      aria-label="Name, sorted, ascending"
                    >
                      Name
                    </button>
                  </th>
                  <th aria-sort="none">
                    <button
                      onClick={handleSort}
                      aria-label="Permissions, not sorted"
                    >
                      Permissions
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>{listLocations}</tbody>
            </table>
          </div>
        </Layout>
      )}
    </>
  );
}
