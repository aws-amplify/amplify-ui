import {
  Image,
  ToggleButton,
  ToggleButtonGroup,
  VisuallyHidden,
} from '@aws-amplify/ui-react';

import { useCustomRouter } from '@/components/useCustomRouter';

export const FrameworkChooser = ({ platform, onClick }) => {
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
      <ToggleButton value="react" size="small" title="React" onClick={onClick}>
        <Image
          alt=""
          height="1.25rem"
          width="1.25rem"
          display="block"
          src="/svg/integrations/react.svg"
        />
        React
      </ToggleButton>
      <ToggleButton
        value="angular"
        size="small"
        title="Angular"
        onClick={onClick}
      >
        <Image
          alt=""
          height="1.25rem"
          width="1.25rem"
          display="block"
          src="/svg/integrations/angular.svg"
        />
        Angular
      </ToggleButton>
      <ToggleButton value="vue" size="small" title="Vue" onClick={onClick}>
        <Image
          alt=""
          height="1.25rem"
          width="1.25rem"
          display="block"
          src="/svg/integrations/vue.svg"
        />
        Vue
      </ToggleButton>
      <ToggleButton
        value="flutter"
        size="small"
        title="Flutter"
        onClick={onClick}
      >
        <Image
          alt=""
          height="1.25rem"
          width="1.25rem"
          display="block"
          src="/svg/integrations/flutter.svg"
        />
        Flutter
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
