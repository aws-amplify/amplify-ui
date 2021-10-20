import * as React from 'react';
import { ToggleButton, ToggleButtonGroup, Image } from '@aws-amplify/ui-react';

export const FrameworkChooser = () => {
  const [framework, setFramework] = React.useState('react');
  return (
    <ToggleButtonGroup
      value={framework}
      isExclusive
      size="small"
      style={{margin: '0 auto'}}
      onChange={(value: string) => setFramework(value)}
    >
      <ToggleButton value="react">
        <Image alt="" height="1.5rem" width="1.5rem" src="/assets/integrations/react.svg" />
      </ToggleButton>
      <ToggleButton value="angular">
        <Image alt="" height="1.5rem" src="/assets/integrations/angular.svg" />
      </ToggleButton>
      <ToggleButton value="vue">
        <Image alt="" height="1.5rem" src="/assets/integrations/vue.svg" />
      </ToggleButton>
    </ToggleButtonGroup>
  )
}
