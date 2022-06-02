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
    _hover: {
      backgroundColor: DesignToken<BackgroundColorValue>;
      color: DesignToken<ColorValue>;
    };
    _disabled: {
      color: DesignToken<ColorValue>;
    };
  };
}

interface StateTokens {
  color: DesignToken<ColorValue>;
  backgroundColor: DesignToken<BackgroundColorValue>;
}

export interface SearchTokens {
  color: DesignToken<ColorValue>;
  button: {
    color: DesignToken<ColorValue>;
    _disabled: StateTokens;
    _hover: StateTokens;
    _focus: StateTokens;
  };
}

interface CollectionTokens {
  pagination: PaginationTokens;
  search: SearchTokens;
}

export const collection: CollectionTokens = {
  pagination: {
    current: {
      color: { value: '{components.pagination.current.color.value}' },
      backgroundColor: {
        value: '{components.pagination.current.backgroundColor.value}',
      },
    },
    button: {
      color: { value: '{components.pagination.button.color.value}' },
      _hover: {
        backgroundColor: {
          value: '{components.pagination.button.hover.backgroundColor.value}',
        },
        color: { value: '{components.pagination.button.hover.color.value}' },
      },
      _disabled: {
        color: { value: '{components.pagination.button.disabled.color.value}' },
      },
    },
  },
  search: {
    color: { value: '{components.searchfield.color}' },
    button: {
      color: { value: '{components.searchfield.search.color.value}' },
      _disabled: {
        color: {
          value: '{components.searchfield.search._disabled.color.value}',
        },
        backgroundColor: {
          value:
            '{components.searchfield.search._disabled.backgroundColor.value}',
        },
      },
      _hover: {
        color: { value: '{components.searchfield.search._hover.color.value}' },
        backgroundColor: {
          value: '{components.searchfield.search._hover.backgroundColor}',
        },
      },
      _focus: {
        color: { value: '{components.searchfield.search._focus.color.value}' },
        backgroundColor: {
          value: '{components.searchfield.search._focus.backgroundColor}',
        },
      },
    },
  },
};
