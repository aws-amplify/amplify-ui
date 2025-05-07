import type { ThemeStylePropKey, ThemeTokenKey } from '../types/theme';

// For internal use, no need to export
export const ComponentText = {
  Alert: {
    dismissButtonLabel: 'Dismiss alert',
  },
  Autocomplete: {
    emptyText: 'No options found',
    loadingText: 'Loading options...',
  },
  Collection: {
    searchButtonLabel: 'Search',
    searchNoResultsFound: 'No results found',
  },
  Fields: {
    clearButtonLabel: 'Clear input',
  },
  Message: {
    dismissLabel: 'Dismiss message',
  },
  PaginationItem: {
    currentPageLabel: 'Page',
    nextLabel: 'Go to next page',
    pageLabel: 'Go to page',
    previousLabel: 'Go to previous page',
  },
  PhoneNumberField: {
    countryCodeLabel: 'Country code',
  },
  SearchField: {
    searchButtonLabel: 'Search',
  },
  PasswordField: {
    passwordIsHidden: 'Password is hidden',
    passwordIsShown: 'Password is shown',
    showPassword: 'Show password',
  },
  StepperField: {
    increaseButtonLabel: 'Increase to',
    decreaseButtonLabel: 'Decrease to',
  },
};

export const stylePropsToThemeKeys: Record<ThemeStylePropKey, ThemeTokenKey> = {
  backgroundColor: 'colors',
  borderColor: 'colors',
  borderWidth: 'borderWidths',
  color: 'colors',
  borderRadius: 'radii',
  fontSize: 'fontSizes',
  fontWeight: 'fontWeights',
  fontFamily: 'fonts',
  lineHeight: 'lineHeights',
  opacity: 'opacities',
  boxShadow: 'shadows',
  transform: 'transforms',
  left: 'space',
  right: 'space',
  top: 'space',
  bottom: 'space',
  height: 'space',
  width: 'space',
  letterSpacing: 'space',
  margin: 'space',
  marginBlock: 'space',
  marginBlockEnd: 'space',
  marginBlockStart: 'space',
  marginInline: 'space',
  marginInlineEnd: 'space',
  marginInlineStart: 'space',
  marginLeft: 'space',
  marginRight: 'space',
  marginTop: 'space',
  marginBottom: 'space',
  maxHeight: 'space',
  maxWidth: 'space',
  minHeight: 'space',
  minWidth: 'space',
  padding: 'space',
  paddingBlock: 'space',
  paddingBlockEnd: 'space',
  paddingBlockStart: 'space',
  paddingInline: 'space',
  paddingInlineEnd: 'space',
  paddingInlineStart: 'space',
  paddingLeft: 'space',
  paddingRight: 'space',
  paddingTop: 'space',
  paddingBottom: 'space',
  gap: 'space',
  columnGap: 'space',
  rowGap: 'space',
};

// key name
export const ESCAPE_KEY = 'Escape';
export const ENTER_KEY = 'Enter';
export const ARROW_UP = 'ArrowUp';
export const ARROW_DOWN = 'ArrowDown';
