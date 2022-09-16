import { Button } from '@aws-amplify/ui-react';
import { Dispatch, SetStateAction } from 'react';
import styles from '../../GlobalNav.module.scss';

interface ShowSecondaryNavProps {
  label: string;
  setShowGlobalNav?: Dispatch<SetStateAction<boolean>>;
}

export function ShowSecondaryNav({
  label,
  setShowGlobalNav,
}: ShowSecondaryNavProps) {
  return (
    <Button
      justifyContent="flex-start"
      isFullWidth={true}
      fontWeight="400"
      border="none"
      borderRadius="0"
      padding="12px"
      className={styles['secondary-nav-button']}
      onClick={() => setShowGlobalNav(false)}
      ariaLabel={`Show ${label} nav bar`}
    >
      {label}
    </Button>
  );
}
