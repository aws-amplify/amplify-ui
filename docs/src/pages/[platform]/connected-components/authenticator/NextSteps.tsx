import { useRouter } from 'next/router';
import { CardLink, CardLinkGroup } from '@/components/CardLink';
import { MdOutlineAutoAwesome, MdTune, MdFlipToFront } from 'react-icons/md';

export function NextSteps() {
  const { platform } = useRouter().query;

  if (platform === 'android') return null;

  const showAdvancedUseCases = platform !== 'flutter';

  if (platform === 'swift') {
    return (
      <CardLinkGroup title="Next steps" id="next-steps">
        <CardLink
          title="Configuration"
          icon={<MdTune />}
          href={`/${platform}/connected-components/authenticator/configuration`}
          desc="How to setup and configure your Authenticator component"
        />
        <CardLink
          title="Customization"
          icon={<MdOutlineAutoAwesome />}
          href={`/${platform}/connected-components/authenticator/customization`}
          desc="Override and customize your Authenticator"
        />
      </CardLinkGroup>
    );
  }

  return (
    <CardLinkGroup title="Next steps" id="next-steps">
      <CardLink
        title="Configuration"
        icon={<MdTune />}
        href={`/${platform}/connected-components/authenticator/configuration`}
        desc="How to setup and configure your Authenticator component"
      />
      <CardLink
        title="Customization"
        icon={<MdOutlineAutoAwesome />}
        href={`/${platform}/connected-components/authenticator/customization`}
        desc="Override and customize your Authenticator"
      />
      {showAdvancedUseCases ? (
        <CardLink
          icon={<MdFlipToFront />}
          title="Advanced Usage"
          href={`/${platform}/connected-components/authenticator/advanced`}
          desc="Access Authenticator UI component state outside of the UI component"
        />
      ) : null}
    </CardLinkGroup>
  );
}
