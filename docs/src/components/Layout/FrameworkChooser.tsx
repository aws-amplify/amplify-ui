import { useRouter } from 'next/router';
import {
  ToggleButton,
  ToggleButtonGroup,
  Image,
  VisuallyHidden,
} from '@aws-amplify/ui-react';

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
        <VisuallyHidden>React</VisuallyHidden>
        <Image
          alt=""
          height="1rem"
          style={{ display: 'block' }}
          src="/svg/integrations/react.svg"
        />
      </ToggleButton>
      <ToggleButton value="angular" size="small">
        <VisuallyHidden>Angular</VisuallyHidden>
        <Image
          alt=""
          height="1rem"
          style={{ display: 'block' }}
          src="/svg/integrations/angular.svg"
        />
      </ToggleButton>
      <ToggleButton value="vue" size="small">
        <VisuallyHidden>Vue</VisuallyHidden>
        <Image
          alt=""
          height="1rem"
          style={{ display: 'block' }}
          src="/svg/integrations/vue.svg"
        />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
