import {
  Flex,
  Button,
  VisuallyHidden,
  Icon,
  Text,
} from '@aws-amplify/ui-react';
import styles from '../../GlobalNav.module.scss';

interface MobileSecondaryNavProps {
  secondaryNavMobile: JSX.Element;
  setShowGlobalNav: React.Dispatch<React.SetStateAction<boolean>>;
}

export function MobileSecondaryNav({
  secondaryNavMobile,
  setShowGlobalNav,
}: MobileSecondaryNavProps) {
  return (
    <Flex
      position="absolute"
      direction="column"
      width="100%"
      backgroundColor="white"
      style={{ zIndex: 100 }}
      rowGap="0px"
    >
      <Button
        onClick={() => setShowGlobalNav(true)}
        justifyContent="flex-start"
        fontWeight="400"
        padding="12px"
        alignItems="center"
        borderRadius="0px"
        columnGap="9px"
        className={`${styles['secondary-nav-button']}`}
        ariaLabel={`Back to all Amplify sites`}
      >
        <VisuallyHidden>Learn</VisuallyHidden>
        <Icon
          viewBox={{ minX: 4, minY: 0, width: 16, height: 18 }}
          pathData="M13.4102 5.41L8.83016 10L13.4102 14.59L12.0002 16L6.00016 10L12.0002 4L13.4102 5.41Z"
          ariaLabel="Icon to"
        />
        <Text>All Amplify sites</Text>
      </Button>
      {secondaryNavMobile}
    </Flex>
  );
}
