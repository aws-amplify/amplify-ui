import { CardLink, CardLinkGroup } from '@/components/CardLink';
import { MdLayers, MdHandyman, MdLightbulb } from 'react-icons/md';
import { useCustomRouter } from '@/components/useCustomRouter';

export function NextSteps() {
  const { platform } = useCustomRouter().query;

  return (
    <CardLinkGroup title="Next steps" id="next-steps">
      <CardLink
        title="Configuration"
        icon={<MdHandyman />}
        href={`/${platform}/connected-components/authenticator/configuration`}
        desc="How to setup and configure your Authenticator component"
      />
      <CardLink
        title="Customization"
        icon={<MdLightbulb />}
        href={`/${platform}/connected-components/authenticator/customization`}
        desc="Override and customize your Authenticator"
      />
      <CardLink
        icon={<MdLayers />}
        title="Headless usage"
        href={`/${platform}/connected-components/authenticator/headless`}
        desc="How to run the Authenticator in a headless mode"
      />
    </CardLinkGroup>
  );
}
