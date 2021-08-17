export declare function attachEventProps(
  node: HTMLElement,
  newProps: any,
  oldProps?: any
): void;
export declare function getClassName(
  classList: DOMTokenList,
  newProps: any,
  oldProps: any
): string;
/**
 * Checks if an event is supported in the current execution environment.
 * @license Modernizr 3.0.0pre (Custom Build) | MIT
 */
export declare function isCoveredByReact(
  eventNameSuffix: string,
  doc?: Document
): boolean;
export declare function syncEvent(
  node: Element,
  eventName: string,
  newEventHandler: (e: Event) => any
): void;
