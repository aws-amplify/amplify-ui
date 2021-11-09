import { useRouter } from 'next/router';
import { ToggleButton, ToggleButtonGroup, Image } from '@aws-amplify/ui-react';

export const FrameworkChooser = ({ platform }) => {
  const router = useRouter();

  const chooseFramework = (framework) => {
    router.replace({
      pathname: router.pathname,
      query: { platform: framework },
    });
  };

  return (
    <ToggleButtonGroup
      value={platform}
      isExclusive
      size="small"
      style={{ margin: '0 auto' }}
      onChange={(value: string) => {
        chooseFramework(value);
      }}
    >
      <ToggleButton value="react" size="small">
        <Image
          alt=""
          height="1rem"
          style={{ display: 'block' }}
          src="/assets/integrations/react.svg"
        />
      </ToggleButton>
      <ToggleButton value="angular" size="small">
        <Image
          alt=""
          height="1rem"
          style={{ display: 'block' }}
          src="/assets/integrations/angular.svg"
        />
      </ToggleButton>
      <ToggleButton value="vue" size="small">
        <Image
          alt=""
          height="1rem"
          style={{ display: 'block' }}
          src="/assets/integrations/vue.svg"
        />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
