import React from 'react';

import { CLASS_BASE } from '../constants';
import { resolveClassName } from '../utils';

import { LocationDetailViewControls } from './Controls';

export interface LocationDetailViewProps {
  className?: (defaultClassName: string) => string;
}

export function LocationDetailView({
  className,
}: LocationDetailViewProps): React.JSX.Element {
  return (
    <div
      className={resolveClassName(CLASS_BASE, className)}
      data-testid="LOCATION_DETAIL_VIEW"
    >
      <LocationDetailViewControls />
    </div>
  );
}
