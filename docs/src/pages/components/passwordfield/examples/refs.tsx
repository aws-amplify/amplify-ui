import * as React from 'react';
import { PasswordField } from '@aws-amplify/ui-react';

export const RefExample = () => {
  const inputRef = React.useRef(null);
  const showPasswordRef = React.useRef(null);

  const onShowPasswordClick = React.useCallback(() => {
    inputRef.current.focus();
  }, []);

  React.useEffect(() => {
    if (showPasswordRef && showPasswordRef.current) {
      console.count('useeffect');
      showPasswordRef.current.addEventListener(
        'click',
        onShowPasswordClick,
        false
      );
      return () => {
        showPasswordRef.current.removeEventListener(
          'click',
          onShowPasswordClick,
          false
        );
      };
    }
  }, [onShowPasswordClick]);

  return (
    <PasswordField
      ref={inputRef}
      showPasswordRef={showPasswordRef}
      label="Password"
    />
  );
};
