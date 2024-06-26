import React from 'react';
import { useDataState } from '@aws-amplify/ui-react-core';
import { listLocationsAction } from '../context/actions';

export default function Locations(): JSX.Element {
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

  const handleFilterSubmit = () => {};
  const handleListRefresh = () => {};
  const handleNavigatePrev = () => {};
  const handleNavigateNext = () => {};
  const handleSort = () => {};

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
              <form onSubmit={handleFilterSubmit}>
                <div>
                  <label htmlFor="filterInput_UUID">
                    Filter folders and files
                  </label>
                  <input id="filterInput_UUID" type="text" />
                </div>
                <button
                  onClick={handleFilterSubmit}
                  type="submit"
                  className={``}
                >
                  Submit
                </button>
                <div aria-live="polite">4 matches found</div>
              </form>
            </div>
            {/* header__secondary */}
            <div className={``}>
              <button onClick={handleListRefresh}>Refresh file list</button>
              <nav aria-label="Pagination" className={``}>
                <ol className={``}>
                  <li>
                    <button
                      onClick={handleNavigatePrev}
                      aria-label="Previous page"
                      disabled
                    >
                      {`<`}
                    </button>
                  </li>
                  <li>
                    <button aria-label="Page 1" aria-current="page">
                      1
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={handleNavigateNext}
                      aria-label="Next page"
                    >{`>`}</button>
                  </li>
                </ol>
              </nav>
            </div>
            <div className={``}>
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
          </div>
        </section>
      )}
    </>
  );
}
