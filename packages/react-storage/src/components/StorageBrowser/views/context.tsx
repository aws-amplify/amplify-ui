import React from 'react';

import {
  LocationActionView as LocationActionViewDefault,
  LocationActionViewProps,
} from './LocationActionView';
import {
  LocationDetailView as LocationDetailViewDefault,
  LocationDetailViewProps,
} from './LocationDetailView';
import {
  LocationsView as LocationsViewDefault,
  LocationsViewProps,
} from './LocationsView';

export interface Views {
  LocationActionView?: (props: LocationActionViewProps) => React.JSX.Element;
  LocationDetailView?: (props: LocationDetailViewProps) => React.JSX.Element;
  LocationsView?: (props: LocationsViewProps) => React.JSX.Element;
}

const ViewsContext = React.createContext<Required<Views> | undefined>(
  undefined
);

export function ViewsProvider({
  children,
  views,
}: {
  children?: React.ReactNode;
  views?: Views;
}): React.JSX.Element {
  // destructure `views` to prevent extraneous rerender of components in the
  // scenario of an unstable reference provided as `views`
  const { LocationDetailView, LocationActionView, LocationsView } = views ?? {};
  const value = React.useMemo(
    () => ({
      LocationActionView: LocationActionView ?? LocationActionViewDefault,
      LocationDetailView: LocationDetailView ?? LocationDetailViewDefault,
      LocationsView: LocationsView ?? LocationsViewDefault,
    }),
    [LocationDetailView, LocationActionView, LocationsView]
  );

  return (
    <ViewsContext.Provider value={value}>{children}</ViewsContext.Provider>
  );
}

export function useViews(): Required<Views> {
  const context = React.useContext(ViewsContext);
  if (!context) throw new Error('`useViews` must be called from ');

  return context;
}
