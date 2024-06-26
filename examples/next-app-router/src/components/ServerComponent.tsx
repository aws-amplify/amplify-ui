import { theme } from '@/theme';

export const MyServerComponent = () => {
  return (
    <div style={{ color: `${theme.tokens.colors.font.success}` }}>Server!</div>
  );
};
