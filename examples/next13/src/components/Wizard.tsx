'use client';
import theme from '../theme';

const { wizard } = theme.className;

export default function Wizard({ variation }: { variation?: string }) {
  return (
    <div className={wizard({ modifier: variation })}>
      <h1 className={wizard({ element: 'header' })}>Wizard</h1>
      <p>Variation: {variation}</p>
    </div>
  );
}
