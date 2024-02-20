import { createComponentClasses } from '../createComponentClasses';

describe('createComponentClasses:', () => {
  it('should work', () => {
    const buttonClassnames = createComponentClasses({
      name: 'button',
    });
    expect(buttonClassnames()).toEqual('amplify-button');
    expect(
      buttonClassnames({
        element: ['icon'],
      })
    ).toEqual('amplify-button__icon');
    expect(
      buttonClassnames({
        element: ['icon', 'test'],
      })
    ).toEqual('amplify-button__icon__test');
    expect(
      buttonClassnames({
        element: ['icon'],
        modifier: ['primary'],
      })
    ).toEqual('amplify-button__icon amplify-button__icon--primary');
    expect(
      buttonClassnames({
        modifier: ['primary'],
      })
    ).toEqual('amplify-button amplify-button--primary');
    expect(
      buttonClassnames({
        modifier: ['primary', 'error'],
      })
    ).toEqual('amplify-button amplify-button--primary amplify-button--error');
    expect(
      buttonClassnames({
        modifier: [],
      })
    ).toEqual('amplify-button');
  });

  it('should work with custom prefix', () => {
    const myButton = createComponentClasses({
      prefix: 'my-',
      name: 'button',
    });
    expect(myButton()).toEqual('my-button');
  });
});
