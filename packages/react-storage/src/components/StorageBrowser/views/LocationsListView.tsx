import React from 'react';
import { useDataState } from '@aws-amplify/ui-react-core';
import { listLocationsAction } from '../context/actions';
import { PaginationControl, SearchControl } from '../subcomponents';

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

  return (
    <>
      {!hasLocations && isLoading ? (
        <div aria-atomic="true" aria-live="assertive">
          loading...
        </div>
      ) : (
        <section className={``} aria-label="Home" tabIndex={-1}>
          <nav className={``} aria-label="Breadcrumbs">
            <ol>
              <li>
                <button>Home</button>
                <span aria-hidden="true">/</span>
              </li>
              <li>
                <button>Some folder</button>
                <span aria-hidden="true">/</span>
              </li>
              <li>
                <span aria-current="page">Some folder</span>
              </li>
            </ol>
          </nav>
          {/* header */}
          <div className={``}>
            {/* header__primary */}
            <div className={``}>
              <h2 className={``}>Home</h2>
              <SearchControl onSubmit={() => {}}>
                <SearchControl.Label />
                <SearchControl.Input />
                <SearchControl.SubmitButton />
                <SearchControl.Summary />
              </SearchControl>
            </div>
            {/* header__secondary */}
            <div className={``}>
              <button onClick={() => {}}>Refresh file list</button>
              <PaginationControl />
            </div>
            <div className={``}>
              <table className={``} aria-label="Locations">
                <thead>
                  <tr>
                    <th aria-sort="ascending">
                      {/* ascending | descending | none*/}
                      <button
                        onClick={() => {}}
                        aria-label="Name, sorted, ascending"
                      >
                        Name
                      </button>
                    </th>
                    <th aria-sort="none">
                      <button
                        onClick={() => {}}
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
          </div>
        </section>
      )}
    </>
  );
}
