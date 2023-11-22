import { Button } from '@aws-amplify/ui-react';
import styles from '../GlobalNav.module.scss';

interface SkipToMainProps {
  mainId: string;
}

export const SkipToMain = ({ mainId }: SkipToMainProps) => {
  return (
    <Button
      size="small"
      as="a"
      href={`#${mainId}`}
      className={styles['skip-to-main']}
    >
      Skip to main content
    </Button>
  );
};
