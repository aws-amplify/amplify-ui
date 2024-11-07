import React from 'react';

import { CLASS_BASE } from '../constants';
import { resolveClassName } from '../utils';

import { LocationDetailViewControls } from './Controls';
import { LocationDetailViewProps } from './types';

export function LocationDetailView({
  className,
  ...props
}: LocationDetailViewProps): React.JSX.Element {
  return (
    <div
      className={resolveClassName(`amplify-${CLASS_BASE}`, className)}
      data-testid="LOCATION_DETAIL_VIEW"
    >
      <LocationDetailViewControls {...props} />
    </div>
  );
}
