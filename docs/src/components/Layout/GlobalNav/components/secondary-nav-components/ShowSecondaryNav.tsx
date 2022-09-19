import { Button } from '@aws-amplify/ui-react';
import { Dispatch, SetStateAction } from 'react';
import styles from '../../GlobalNav.module.scss';
import { ChevronIcon } from '../icons';

interface ShowSecondaryNavProps {
  label: string;
  setShowGlobalNav: Dispatch<SetStateAction<boolean>>;
}

export function ShowSecondaryNav({
  label,
  setShowGlobalNav,
}: ShowSecondaryNavProps) {
  return (
    <Button
      justifyContent="flex-start"
      alignItems="center"
      isFullWidth={true}
      fontWeight="400"
      border="none"
      borderRadius="0"
      padding="12px 10px"
      columnGap="9px"
      className={styles['secondary-nav-button']}
      onClick={() => setShowGlobalNav(false)}
      ariaLabel={`Show ${label} nav bar`}
    >
      {label}
      <ChevronIcon rotateDeg="270" />
    </Button>
  );
}
