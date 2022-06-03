import {
  PaginationButtonDisabledTokens,
  PaginationButtonHoverTokens,
} from './pagination';
import { StateTokens } from './button';
import {
  BackgroundColorValue,
  ColorValue,
  DesignToken,
} from '../types/designToken';

interface PaginationTokens {
  current: {
    color: DesignToken<ColorValue>;
    backgroundColor: DesignToken<BackgroundColorValue>;
  };
  button: {
    color: DesignToken<ColorValue>;
    _hover: PaginationButtonHoverTokens;
    _disabled: PaginationButtonDisabledTokens;
  };
}

export interface SearchTokens {
  color: DesignToken<ColorValue>;
  button: {
    color: DesignToken<ColorValue>;
    _active: StateTokens;
    _disabled: StateTokens;
    _focus: StateTokens;
    _hover: StateTokens;
  };
}

interface CollectionTokens {
  pagination: PaginationTokens;
  search: SearchTokens;
}

export const collection: CollectionTokens = {
  pagination: {
    current: {
      color: { value: '{components.pagination.current.color}' },
      backgroundColor: {
        value: '{components.pagination.current.backgroundColor}',
      },
    },
    button: {
      color: { value: '{components.pagination.button.color}' },
      _hover: {
        backgroundColor: {
          value: '{components.pagination.button.hover.backgroundColor}',
        },
        color: { value: '{components.pagination.button.hover.color}' },
      },
      _disabled: {
        color: { value: '{components.pagination.button.disabled.color}' },
      },
    },
  },
  search: {
    color: { value: '{components.searchfield.color}' },
    button: {
      color: { value: '{components.searchfield.button.color}' },
      _active: {
        backgroundColor: {
          value: '{components.searchfield.button._active.backgroundColor}',
        },
        borderColor: {
          value: '{components.searchfield.button._active.borderColor}',
        },
        color: { value: '{components.searchfield.button._active.color}' },
      },
      _disabled: {
        backgroundColor: {
          value: '{components.searchfield.button._disabled.backgroundColor}',
        },
        borderColor: {
          value: '{components.searchfield.button._disabled.borderColor}',
        },
        color: {
          value: '{components.searchfield.button._disabled.color}',
        },
      },
      _focus: {
        backgroundColor: {
          value: '{components.searchfield.button._focus.backgroundColor}',
        },
        borderColor: {
          value: '{components.searchfield.button._focus.borderColor}',
        },
        color: { value: '{components.searchfield.button._focus.color}' },
      },
      _hover: {
        backgroundColor: {
          value: '{components.searchfield.button._hover.backgroundColor}',
        },
        borderColor: {
          value: '{components.searchfield.button._hover.borderColor}',
        },
        color: { value: '{components.searchfield.button._hover.color}' },
      },
    },
  },
};
