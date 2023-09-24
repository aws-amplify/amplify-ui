import { translations } from '@aws-amplify/ui';
import { Authenticator } from '@aws-amplify/ui-react';

// @todo-migration fix import
import { I18n } from '@aws-amplify/core';
import * as React from 'react';

type SocialProps = {
  components: Record<string, string>;
};

export function SocialProviderDemo({ components = {} }: SocialProps) {
  React.useEffect(() => {
    const errorText = 'This example is for demo purposes only!';
    I18n.putVocabulariesForLanguage('en', {
      // Errors
      'Federation requires either a User Pool or Identity Pool in config':
        errorText,
      'Configuration error (see console) – please contact the administrator':
        errorText,
    });

    return () => {
      I18n.putVocabulariesForLanguage('en', translations['en']);
    };
  }, []);

  return (
    <Authenticator.Provider>
      <Authenticator
        components={components}
        socialProviders={['amazon', 'apple', 'facebook', 'google']}
      />
    </Authenticator.Provider>
  );
}
