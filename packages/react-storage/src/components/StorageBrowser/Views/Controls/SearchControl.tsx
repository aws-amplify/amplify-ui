import React from 'react';
import { withBaseElementProps } from '@aws-amplify/ui-react-core/elements';

import { StorageBrowserElements } from '../../context/elements';

const { Button, Input, Icon, Span } = StorageBrowserElements;

const SEARCH_BLOCK = 'search';
const FIELD_BLOCK = 'field';

const searchIconProps = () => ({
  children: (
    <path
      d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14V14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z"
      fill="currentColor"
    />
  ),
  className: `${SEARCH_BLOCK}-${FIELD_BLOCK}__icon`,
  width: '24',
  height: '24',
  viewBox: '0 0 24 24',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
});

interface FieldControl<
  T extends Partial<StorageBrowserElements> = StorageBrowserElements,
> {
  (): JSX.Element;
  Container: T['Span'];
  Icon: T['Icon'];
  Input: T['Input'];
}

const FieldContainer = withBaseElementProps(Span, {
  className: `${SEARCH_BLOCK}-${FIELD_BLOCK}__container`,
});
const FieldIcon = withBaseElementProps(Icon, searchIconProps);
const FieldInputBase = withBaseElementProps(Input, {
  className: `${SEARCH_BLOCK}-${FIELD_BLOCK}__input`,
});

const FieldInput: typeof FieldInputBase = React.forwardRef(
  function FieldInput(props, ref) {
    // search input logic here TBD
    return <FieldInputBase {...props} ref={ref} />;
  }
);

const FieldControl: FieldControl = () => (
  <FieldContainer>
    <FieldIcon />
    <FieldInput />
  </FieldContainer>
);

FieldControl.Container = FieldContainer;
FieldControl.Icon = FieldIcon;
FieldControl.Input = FieldInput;

const SearchButtonBase = withBaseElementProps(Button, {
  className: `${SEARCH_BLOCK}__button`,
});

const SearchButton: typeof SearchButtonBase = React.forwardRef(
  function SearchButton(props, ref) {
    // search handler/type="submit" (TBD), disabled logic here
    return <SearchButtonBase {...props} ref={ref} />;
  }
);

const Container = withBaseElementProps(Span, {
  className: `${SEARCH_BLOCK}__container`,
});

export const SearchControl: SearchControl = () => (
  <Container>
    <FieldControl />
    <SearchButton />
  </Container>
);

SearchControl.Container = Container;
SearchControl.Field = FieldControl;
SearchControl.Button = SearchButton;

export interface SearchControl<
  T extends Partial<StorageBrowserElements> = StorageBrowserElements,
> {
  (): React.JSX.Element;
  Container: T['Span'];
  Field: FieldControl<T>;
  Button: T['Button'];
}
