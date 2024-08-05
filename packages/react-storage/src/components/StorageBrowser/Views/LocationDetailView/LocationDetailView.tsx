import React from 'react';

import { LocationData, useAction } from '../../context/actions';
import { parseLocationAccess } from '../../context/controls/Navigate/utils';
import { StorageBrowserElements } from '../../context/elements';
import { ViewComponent } from '../types';
import { LocationDetailViewControls } from './Controls';
import { CLASS_BASE } from '../constants';
import { useControl } from '../../context/controls';

export interface LocationDetailView<
  T extends StorageBrowserElements = StorageBrowserElements,
> extends ViewComponent<LocationDetailViewControls<T>> {}

export const LocationDetailView: LocationDetailView = () => {
  const [{ history, location }, handleUpdateState] = useControl({
    type: 'NAVIGATE',
  });

  const [{ data, isLoading }, handleList] = useAction({
    type: 'LIST_LOCATION_ITEMS',
  });

  const { prefix: initialPrefix } = location
    ? parseLocationAccess(location)
    : ({} as LocationData);

  const prefix =
    history.length === 1 ? initialPrefix : history[history.length - 1];

  const hasItems = !!data.result?.length;
  const shouldReset = hasItems && !location && !history.length;

  React.useEffect(() => {
    if (shouldReset) {
      handleList({ prefix: '', options: { reset: true } });
    }

    if (typeof prefix !== 'string') return;

    handleList({ prefix, options: { pageSize: 1000, refresh: true } });
  }, [handleList, prefix, shouldReset]);

  const listItems = !hasItems
    ? null
    : data.result.map(({ key, type }) => {
        if (key === prefix) {
          return null;
        }
        if (type === 'FOLDER') {
          return (
            <button
              onClick={() => {
                handleUpdateState({
                  type: 'NAVIGATE',
                  prefix: key,
                });
              }}
              key={key}
            >
              {key}
            </button>
          );
        } else {
          return <p key={key}>{key}</p>;
        }
      });

  return (
    <>
      <div className={CLASS_BASE} data-testid="LOCATION_DETAIL_VIEW">
        <div className={`${CLASS_BASE}__controls`}>
          <LocationDetailViewControls />
        </div>
      </div>
      {isLoading && !hasItems ? <span>loading...</span> : listItems}
    </>
  );
};

LocationDetailView.Controls = LocationDetailViewControls;
