import { defaultTheme } from '../../defaultTheme';
import { createComponentTheme } from '../createComponentTheme';
import { createTheme } from '../createTheme';

const { tokens } = createTheme();

describe('createComponentTheme', () => {
  it('returned className function should return the right className', () => {
    const { className } = createComponentTheme({
      name: 'avatar',
      theme(tokens) {
        return {};
      },
    });
    expect(className()).toBe('amplify-avatar');
    expect(className({ modifier: ['primary'] })).toBe(
      'amplify-avatar amplify-avatar--primary'
    );
    expect(className({ element: ['label'] })).toBe('amplify-avatar__label');
  });

  it('should return a theme function to pass to createTheme', () => {
    const { theme } = createComponentTheme({
      name: 'avatar',
      theme(tokens) {
        return {};
      },
    });
    expect(typeof theme).toBe('function');
    expect(theme(tokens)).toStrictEqual({});
  });
});
