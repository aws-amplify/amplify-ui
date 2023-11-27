import {
  Flex,
  Text,
  Button,
  VisuallyHidden,
  Badge,
} from '@aws-amplify/ui-react';
import styles from '../GlobalNav.module.scss';
import { AmplifyLogo, ChevronIcon } from './icons';
import Link from 'next/link';
export function AmplifyNavLink({
  currentSite,
  isCollapsed,
  setIsCollapsed,
  isGen2,
}) {
  const chevronRotation = isCollapsed ? '0' : '180';
  return (
    <Flex justifyContent={'space-between'} className={styles['logo-container']}>
      {isGen2 ? (
        <Link href="/gen2" className={styles['gen2-home']}>
          <AmplifyLogo isGen2={isGen2} />
          <Text as="span" className={styles['dev-center-logo']}>
            Amplify code-first DX
          </Text>
          <Badge marginInlineStart="medium" className={styles['navbar-badge']}>
            Preview
          </Badge>
        </Link>
      ) : (
        <>
          <Flex
            className={styles['desktop-only']}
            gap="xs"
            alignItems="center"
            direction="row"
          >
            <AmplifyLogo />
            <Text as="span" className={styles['dev-center-logo']}>
              Amplify Dev Center
              <span className={styles['mobile-only']}>
                {' '}
                <ChevronIcon rotateDeg="270" /> {currentSite}
              </span>
            </Text>
          </Flex>

          <Flex
            className={`${styles['mobile-only']} ${styles['mobile-current-link']}`}
            gap="xs"
            alignItems="center"
            direction="row"
            as="a"
            href="/"
            style={{ textDecoration: 'none', cursor: 'pointer' }}
          >
            <AmplifyLogo />
            <Text as="span" className={styles['dev-center-logo']}>
              Amplify Dev Center
              <span className={styles['mobile-only']}>
                {' '}
                <ChevronIcon rotateDeg="270" /> {currentSite}
              </span>
            </Text>
          </Flex>
        </>
      )}

      <Button
        aria-expanded={!isCollapsed}
        aria-controls="mobile-nav-links"
        variation="link"
        size="large"
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
