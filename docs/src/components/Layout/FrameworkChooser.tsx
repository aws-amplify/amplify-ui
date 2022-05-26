import {
  Image,
  ToggleButton,
  ToggleButtonGroup,
  VisuallyHidden,
} from '@aws-amplify/ui-react';

import { useCustomRouter } from '@/components/useCustomRouter';
import { FRAMEWORKS } from '@/data/frameworks';

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
      {FRAMEWORKS.map((framework) => (
        <ToggleButton
          key={framework}
          value={framework}
          size="small"
          title={framework}
          padding={{ base: '4px', medium: undefined }}
        >
          <VisuallyHidden>{framework}</VisuallyHidden>
          <Image
            alt=""
            height={{ base: '1.5rem', medium: '1rem' }}
            display="block"
            src={`/svg/integrations/${framework}.svg`}
          />
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};
