import * as React from 'react';
import { Flex, SearchField } from '@aws-amplify/ui-react';

export const RefExample = () => {
  const inputRef = React.useRef(null);
  const searchButtonRef = React.useRef(null);

  const onClick = React.useCallback(() => {
    inputRef.current.focus();
    alert(`You searched for: ${inputRef.current.value}`);
  }, []);

  React.useEffect(() => {
    if (searchButtonRef && searchButtonRef.current) {
      // Note: this example is contrived to demonstrate using refs.
      // Use the `onSubmit` prop on `SearchField` instead which
      // responds to input field `Enter` keypresses and Submit button clicks.
      searchButtonRef.current.addEventListener('click', onClick, false);
      return () => {
        searchButtonRef.current.removeEventListener('click', onClick, false);
      };
    }
  }, [onClick]);

  return (
    <SearchField
      label="Password"
      ref={inputRef}
      searchButtonRef={searchButtonRef}
    />
  );
};
