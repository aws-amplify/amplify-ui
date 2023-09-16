import { defaultTheme } from '../../defaultTheme';
import { createComponentTheme } from '../createComponentTheme';

describe('createComponentTheme', () => {
  it('returned className function should return the right className', () => {
    const { className } = createComponentTheme('avatar', (tokens) => {
      return {};
    });
    expect(className()).toBe('amplify-avatar');
    expect(className({ modifier: 'primary' })).toBe('amplify-avatar--primary');
    expect(className({ element: 'label' })).toBe('amplify-avatar__label');
  });

  it('should return a theme function to pass to createTheme', () => {
    const { theme } = createComponentTheme('avatar', (tokens) => {
      return {};
    });
    expect(typeof theme).toBe('function');
    expect(theme(defaultTheme.tokens)).toStrictEqual({});
  });
});
