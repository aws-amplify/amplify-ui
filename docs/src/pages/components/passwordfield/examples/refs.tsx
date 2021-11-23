import * as React from 'react';
import { PasswordField } from '@aws-amplify/ui-react';

export const RefExample = () => {
  const inputRef = React.useRef(null);
  const showPasswordButtonRef = React.useRef(null);

  const onShowPasswordClick = React.useCallback(() => {
    inputRef.current.focus();
  }, []);

  React.useEffect(() => {
    if (showPasswordButtonRef && showPasswordButtonRef.current) {
      console.count('useeffect');
      showPasswordButtonRef.current.addEventListener(
        'click',
        onShowPasswordClick,
        false
      );
      return () => {
        showPasswordButtonRef.current.removeEventListener(
          'click',
          onShowPasswordClick,
          false
        );
      };
    }
  }, [onShowPasswordClick]);

  return (
    <PasswordField
      label="Password"
      ref={inputRef}
      showPasswordButtonRef={showPasswordButtonRef}
    />
  );
};
