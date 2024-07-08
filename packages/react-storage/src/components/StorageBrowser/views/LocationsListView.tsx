import React from 'react';
import { useDataState } from '@aws-amplify/ui-react-core';
import { listLocationsAction } from '../context/actions';
import { PaginationControl, Layout } from '../subcomponents';

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
          <Layout className="amplify-storagebrowser__header">
            {/* header__primary */}
            <Layout className="amplify-storagebrowser__header__primary">
              <h2 className={``}>Home</h2>
              <button onClick={() => {}}>Refresh file list</button>
            </Layout>
            {/* header__secondary */}
            <Layout className="amplify-storagebrowser__header__secondary">
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
              <PaginationControl />
            </Layout>
          </Layout>
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
        </section>
      )}
    </>
  );
}
