import React from 'react';
import { useDataState } from '@aws-amplify/ui-react-core';
import { listLocationsAction } from '../context/actions';
import { PaginationControl, BreadcrumbsControl } from '../subcomponents';

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

  const breadcrumbs = [
    { children: 'Home' },
    { children: 'Some folder' },
    { children: 'Some other folder' },
  ];

  return (
    <>
      {!hasLocations && isLoading ? (
        <div aria-atomic="true" aria-live="assertive">
          loading...
        </div>
      ) : (
        <section className={``} aria-label="Home" tabIndex={-1}>
          <BreadcrumbsControl items={breadcrumbs} />

          {/* header */}
          <div className={``}>
            {/* header__primary */}
            <div className={``}>
              <h2 className={``}>Home</h2>
              <form onSubmit={() => {}}>
                <div>
                  <label htmlFor="filterInput_UUID">
                    Filter folders and files
                  </label>
                  <input id="filterInput_UUID" type="text" />
                </div>
                <button onClick={() => {}} type="submit" className={``}>
                  Submit
                </button>
                <div aria-live="polite">4 matches found</div>
              </form>
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
