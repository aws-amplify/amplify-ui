import * as authenticatorDict from './authenticator';

//merge all the new module translations in respective locale constants
export const deDict = { ...authenticatorDict.deDict };
export const enDict = { ...authenticatorDict.enDict };
export const esDict = { ...authenticatorDict.esDict };
export const frDict = { ...authenticatorDict.frDict };
export const itDict = { ...authenticatorDict.itDict };
export const jaDict = { ...authenticatorDict.jaDict };
export const krDict = { ...authenticatorDict.krDict };
export const plDict = { ...authenticatorDict.plDict };
export const ptDict = { ...authenticatorDict.ptDict };
export const zhDict = { ...authenticatorDict.zhDict };

export const defaultTexts = {
  ...authenticatorDict.defaultTexts,
  // new module related default texts goes here
};
