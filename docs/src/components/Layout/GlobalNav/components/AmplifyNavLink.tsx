import { Flex, Text, Button, VisuallyHidden } from '@aws-amplify/ui-react';
import styles from '../GlobalNav.module.scss';
import { AmplifyLogo, ChevronIcon } from './icons';

export function AmplifyNavLink({ currentSite, isCollapsed, setIsCollapsed }) {
  const chevronRotation = isCollapsed ? '0' : '180';
  return (
    <Flex justifyContent={'space-between'} className={styles['logo-container']}>
      <Flex gap="xs" alignItems="center" direction="row">
        <AmplifyLogo />
        <Text className={styles['dev-center-logo']}>
          <span style={{ fontWeight: '400' }}>Amplify</span>{' '}
          <span style={{ fontWeight: '300' }}>Dev Center</span>
          <span className={styles['mobile-only']}>
            {' '}
            <ChevronIcon rotateDeg="270" /> {currentSite}
          </span>
        </Text>
      </Flex>

      <Button
        aria-expanded={!isCollapsed}
        aria-controls="mobile-nav-links"
        border="none"
        backgroundColor="transparent"
        className={`${styles['mobile-only']} ${styles['nav-expander']}`}
        onClick={() => {
          setIsCollapsed(!isCollapsed);
        }}
      >
        <VisuallyHidden>
          {isCollapsed ? 'Open Dev Center menu' : 'Close Dev Center menu'}
        </VisuallyHidden>
        <ChevronIcon rotateDeg={chevronRotation} />
      </Button>
    </Flex>
  );
}
