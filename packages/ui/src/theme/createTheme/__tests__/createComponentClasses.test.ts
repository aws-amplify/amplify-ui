import { RatingTheme } from '../../components';
import { BaseProperties, Modifiers, Size } from '../../components/utils';
import { createComponentClasses } from '../createComponentClasses';

describe('createComponentClasses:', () => {
  describe('built-in components', () => {
    const ratingClassnames = createComponentClasses<RatingTheme>({
      name: 'rating',
    });

    it('should work with no args', () => {
      const classname = ratingClassnames();
      expect(classname).toEqual('amplify-rating');
    });

    it('should work with top-level modifiers', () => {
      const classname = ratingClassnames({ _modifiers: 'large' });
      // @ts-expect-error
      const badClassname = ratingClassnames({ _modifiers: 'foo' });
      expect(classname).toEqual('amplify-rating amplify-rating--large');
    });

    it('should work with elements without modifiers', () => {
      const classname = ratingClassnames({ _element: 'item' });
      // @ts-expect-error
      const badClassname = ratingClassnames({ _element: 'foo' });
      expect(classname).toEqual('amplify-rating__item');
    });

    it('should work with elements with modifiers', () => {
      const classname = ratingClassnames({ _element: { icon: 'empty' } });
      // @ts-expect-error
      const badClassname = ratingClassnames({ _element: 'foo' });
      expect(classname).toEqual(
        'amplify-rating__icon amplify-rating__icon--empty'
      );
    });
  });

  describe('custom components', () => {
    interface AvatarTheme extends BaseProperties, Modifiers<Size> {
      _element?: {
        item?: BaseProperties;
        icon?: BaseProperties & Modifiers<'filled' | 'empty'>;
      };
    }
    const avatarClassnames = createComponentClasses<AvatarTheme>({
      name: 'avatar',
    });

    it('should work with no args', () => {
      const classname = avatarClassnames();
      expect(classname).toEqual(`amplify-avatar`);
    });

    it('should work with top-level modifiers', () => {
      const classname = avatarClassnames({
        _modifiers: 'large',
      });

      const classname2 = avatarClassnames({
        _modifiers: ['large'],
      });

      const classname3 = avatarClassnames({
        _modifiers: [null, undefined],
      });

      const badClassname = avatarClassnames({
        // @ts-expect-error
        _modifiers: 'foo',
      });

      expect(classname).toEqual(`amplify-avatar amplify-avatar--large`);
      expect(classname2).toEqual(`amplify-avatar amplify-avatar--large`);
      expect(classname3).toEqual(`amplify-avatar`);
    });

    it('should work with elements without modifiers', () => {
      const classname = avatarClassnames({
        _element: 'icon',
      });

      const badClassname = avatarClassnames({
        // @ts-expect-error
        _element: 'foo',
      });

      expect(classname).toEqual(`amplify-avatar__icon`);
    });

    it('should work with elements that have modifiers', () => {
      const classname = avatarClassnames({
        _element: {
          icon: 'empty',
        },
      });

      const classname2 = avatarClassnames({
        _element: {
          icon: ['empty', 'filled'],
        },
      });

      const classname3 = avatarClassnames({
        _element: {
          icon: [null, undefined],
        },
      });

      const badClassname = avatarClassnames({
        _element: {
          // @ts-expect-error
          icon: 'large',
        },
      });

      expect(classname).toEqual(
        `amplify-avatar__icon amplify-avatar__icon--empty`
      );
      expect(classname2).toEqual(
        `amplify-avatar__icon amplify-avatar__icon--empty amplify-avatar__icon--filled`
      );
      expect(classname3).toEqual(`amplify-avatar__icon`);
    });
  });

  it('should work with custom prefix', () => {
    const myButton = createComponentClasses({
      prefix: 'my-',
      name: 'button',
    });
    expect(myButton()).toEqual('my-button');
  });
});
