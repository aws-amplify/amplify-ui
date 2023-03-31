import { ComponentClassName } from '../../types';
import {
  classNameModifier,
  classNameModifierByFlag,
  Modifiers,
} from '../classname';

describe('classNameModifier', () => {
  const modifiedClassName = 'amplify-alert--modified';
  const myClass = ComponentClassName.Alert;
  const modifier = 'modified';

  it('should return the modified className with a modifier passed in', () => {
    expect(classNameModifier(myClass, modifier)).toEqual(modifiedClassName);
  });

  it('should return empty string without a modifier passed in', () => {
    // force undefined to be Modifiers type for exhaustive edge case test
    expect(
      classNameModifier(myClass, undefined as unknown as Modifiers)
    ).toEqual('');
  });
});

describe('classNameModifierByFlag', () => {
  const modifiedClassName = 'amplify-alert--modified';
  const myClass = ComponentClassName.Alert;
  const modifier = 'modified';

  it('should return the modified className with a true flag value passed in', () => {
    expect(classNameModifierByFlag(myClass, modifier, true)).toEqual(
      modifiedClassName
    );
  });

  it('should return empty string with a false flag value passed in', () => {
    expect(classNameModifierByFlag(myClass, modifier, false)).toEqual('');
  });
});
