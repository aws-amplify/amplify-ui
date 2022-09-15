import { Icon } from '@aws-amplify/ui-react';
import styles from '../../GlobalNav.module.scss';

export function ChevronIcon({
  rotateDeg,
  ...rest
}: { rotateDeg?: string } & unknown) {
  return (
    <Icon
      // className={styles['chevron-icon']}
      // width="20"
      // height="18"
      viewBox={{ minX: 0, minY: 0, width: 24, height: 24 }}
      ariaLabel="Icon"
      {...rest}
      style={{ transform: `rotate(${rotateDeg}deg)` }}
    >
      <polyline
        points="6 9 12 15 18 9"
        fill="none"
        strokeWidth="2"
        stroke="currentColor"
      />
    </Icon>
  );
}
