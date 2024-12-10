import { ComponentStyles } from '../components/utils';
import { recursiveComponentCSS } from './createComponentCSS';

type GlobalCSS = Record<string, ComponentStyles>;

export function createGlobalCSS(css: GlobalCSS) {
  let cssText = ``;

  for (const [selector, styles] of Object.entries(css)) {
    cssText += recursiveComponentCSS(selector, styles);
  }

  return cssText;
}
