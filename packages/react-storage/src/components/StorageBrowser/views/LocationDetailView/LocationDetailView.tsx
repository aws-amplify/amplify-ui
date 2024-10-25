import React from 'react';

import { CLASS_BASE } from '../constants';
import { resolveClassName } from '../utils';

import { LocationDetailViewControls } from './Controls';
import { LocationDetailViewProps } from './types';

export function LocationDetailView({
  className,
  onActionSelect,
  onNavigate,
  onExit,
}: LocationDetailViewProps): React.JSX.Element {
  return (
    <div
      className={resolveClassName(CLASS_BASE, className)}
      data-testid="LOCATION_DETAIL_VIEW"
    >
      <LocationDetailViewControls
        onActionSelect={onActionSelect}
        onNavigate={onNavigate}
        onExit={onExit}
      />
    </div>
  );
}
