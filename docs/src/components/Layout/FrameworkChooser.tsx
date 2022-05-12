import {
  Image,
  ToggleButton,
  ToggleButtonGroup,
  VisuallyHidden,
} from '@aws-amplify/ui-react';

import { useCustomRouter } from '@/components/useCustomRouter';

export const FrameworkChooser = ({ platform }) => {
  const { replace, pathname } = useCustomRouter();

  const chooseFramework = (platform) => {
    const { hash } = window.location;
    replace(
      {
        hash,
        pathname: pathname === '/' ? '/[platform]' : pathname,
        query: { platform },
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
      size="small"
      onChange={(value: string) => {
        chooseFramework(value);
      }}
      isExclusive
      isSelectionRequired
    >
      <ToggleButton
        value="react"
        size="small"
        title="React"
        padding={{ base: '4px', medium: undefined }}
      >
        <VisuallyHidden>React</VisuallyHidden>
        <Image
          alt=""
          height={{ base: '1.5rem', medium: '1rem' }}
          display="block"
          src="/svg/integrations/react.svg"
        />
      </ToggleButton>
      <ToggleButton
        value="angular"
        size="small"
        title="Angular"
        padding={{ base: '4px', medium: undefined }}
      >
        <VisuallyHidden>Angular</VisuallyHidden>
        <Image
          alt=""
          height={{ base: '1.5rem', medium: '1rem' }}
          display="block"
          src="/svg/integrations/angular.svg"
        />
      </ToggleButton>
      <ToggleButton
        value="vue"
        size="small"
        title="Vue"
        padding={{ base: '4px', medium: undefined }}
      >
        <VisuallyHidden>Vue</VisuallyHidden>
        <Image
          alt=""
          height={{ base: '1.5rem', medium: '1rem' }}
          display="block"
          src="/svg/integrations/vue.svg"
        />
      </ToggleButton>
      <ToggleButton
        value="flutter"
        size="small"
        title="Flutter"
        padding={{ base: '4px', medium: undefined }}
      >
        <VisuallyHidden>Flutter</VisuallyHidden>
        <Image
          alt=""
          height={{ base: '1.5rem', medium: '1rem' }}
          display="block"
          src="/svg/integrations/flutter.svg"
        />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
