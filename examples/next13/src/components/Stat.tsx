import classnames from 'classnames';
import { createComponentTheme } from '@aws-amplify/ui-react/theme';

const { className, theme } = createComponentTheme('stat', (tokens) => {
  return {
    backgroundColor: tokens.colors.white,
    modifier: {
      primary: {
        backgroundColor: tokens.colors.background.success,
        fontSize: '20px',
      },
    },
    element: {
      label: {
        color: tokens.colors.pink[60],
      },
    },
  };
});

export { theme as stat };

type Variations = 'primary' | 'secondary' | 'tertiary';

export default function Stat({
  label,
  variation,
}: {
  label?: string;
  variation?: Variations;
}) {
  return (
    <div
      className={classnames(
        className(),
        variation && className({ modifier: variation })
      )}
    >
      <div className={className({ element: 'label' })}>{label}</div>
    </div>
  );
}
