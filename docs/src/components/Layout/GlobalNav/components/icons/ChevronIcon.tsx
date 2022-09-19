import { Icon } from '@aws-amplify/ui-react';
import styles from '../../GlobalNav.module.scss';

export function ChevronIcon({ rotateDeg }: { rotateDeg?: string }) {
  return (
    <Icon
      className={styles['chevron-icon']}
      width="10px"
      height="9px"
      viewBox={{ minX: 2, minY: -1.5, width: 11, height: 12 }}
      aria-hidden="true"
      style={{ transform: `rotate(${rotateDeg}deg)` }}
    >
      <path d="M14.12 0.0599976L8 6.16667L1.88 0.0599976L0 1.94L8 9.94L16 1.94L14.12 0.0599976Z" />
    </Icon>
  );
}
