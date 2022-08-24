---
"amplify-ui-angular-mono": patch
"@aws-amplify/ui-react": minor
"@aws-amplify/ui-angular": patch
---

Angular: Add `amplify-dialcodeselect` class which contains the previous countrycodeselect styles
Vue: Add `amplify-dialcodeselect` class which contains the previous countrycodeselect styles
React: Added 'dialCode' versions of all 'countryCode' props so that users can begin migrating away from the deprecated `countryCode`.

```
// Added dialCode props
  /**
   * @description
   * Sets a hidden and accessible label for the dial code selector
   */
  dialCodeLabel?: string;

  /**
   * @description
   * Sets the name used when handling form submission for the dial code selector
   */
  dialCodeName?: string;

  /**
   * @description
   * Handles change events for the dial code selector
   */
  onDialCodeChange?: React.ChangeEventHandler<HTMLSelectElement>;

  /**
   * @description
   * Forwarded ref for access to Dial Code select DOM element
   */
  dialCodeRef?: React.Ref<HTMLSelectElement>;
  
  /**
   * @description
   * Sets the default dial code that will be selected on initial render
   */
  defaultDialCode?: string;
  
// Country Code props marked as deprecated and to be removed with 4.0 breaking changes
  /**
   * @description
   * Sets a hidden and accessible label for the dial code selector
   * @deprecated
   * To be removed with next major version release, please use dialCodeLabel
   */
  countryCodeLabel?: string;

  /**
   * @description
   * Sets the name used when handling form submission for the dial code selector
   * @deprecated
   * To be removed with next major version release, please use dialCodeName
   */
  countryCodeName?: string;

  /**
   * @description
   * Handles change events for the dial code selector
   * @deprecated
   * To be removed with next major version release, please use onDialCodeChange
   */
  onCountryCodeChange?: React.ChangeEventHandler<HTMLSelectElement>;

  /**
   * @description
   * Forwarded ref for access to Country Code select DOM element
   * @deprecated
   * To be removed with next major version release, please use dialCodeRef
   */
  countryCodeRef?: React.Ref<HTMLSelectElement>;
  
  /**
   * @description
   * Sets the default dial code that will be selected on initial render
   * @deprecated
   * To be removed with next major version release, please use defaultDialCode
   */
  defaultCountryCode: string;
```
