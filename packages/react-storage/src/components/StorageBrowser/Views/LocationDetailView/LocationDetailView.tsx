import React from 'react';

import { LocationDetailViewControls } from './Controls';
import { CLASS_BASE } from '../constants';

export function LocationDetailView(): React.JSX.Element {
  return (
    <div className={CLASS_BASE} data-testid="LOCATION_DETAIL_VIEW">
      <LocationDetailViewControls />
    </div>
  );
}
