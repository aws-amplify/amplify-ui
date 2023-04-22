import * as React from 'react';
import { PasswordField } from '@aws-amplify/ui-react';

export const RefExample = () => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const showPasswordButtonRef = React.useRef<HTMLButtonElement>(null);

  const onShowPasswordClick = React.useCallback(() => {
    inputRef.current.focus();
  }, []);

  React.useEffect(() => {
    const showPasswordButtonRefCurrent = showPasswordButtonRef.current;
    if (showPasswordButtonRef && showPasswordButtonRef.current) {
      showPasswordButtonRef.current.addEventListener(
        'click',
        onShowPasswordClick,
        false
      );
      return () => {
        showPasswordButtonRefCurrent.removeEventListener(
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
