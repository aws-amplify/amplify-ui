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
    const { hash } = window.location;

    router.replace(
      {
        hash,
        pathname: router.pathname,
        query: { platform: framework },
      },
      // `as?` prop  isn't needed when URL is already provided
      undefined,
      {
        // Scroll to top if a new page
        scroll: hash ? false : true,
      }
    );

    // Because layout may change, explicitly tell the browser to scroll to that anchor
    // e.g. <a id="#variation" />
    if (hash) {
      document.getElementById(hash.slice(1)).scrollIntoView();
    }
  };

  return (
    <ToggleButtonGroup
      value={platform}
      isExclusive
      size="small"
      onChange={(value: string) => {
        if (!value) return;
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
