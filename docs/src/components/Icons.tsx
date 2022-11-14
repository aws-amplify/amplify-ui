import { Icon } from '@aws-amplify/ui-react';
import { SiGithub, SiDiscord, SiW3C, SiReact } from 'react-icons/si';
import { VscServer, VscLibrary, VscBrowser } from 'react-icons/vsc';
import { DiTerminal } from 'react-icons/di';

const vscViewbox = {
  width: 16,
  height: 16,
};

export const StackBlitzIcon = (props) => (
  <Icon
    {...props}
    viewBox={{
      width: 32,
      height: 32,
    }}
    pathData="M5.853 18.647h8.735L9.45 31l16.697-17.647h-8.735L22.55 1 5.853 18.647z"
  />
);

export const ReactIcon = ({ ariaLabel = '', ...rest }) => (
  <Icon {...rest} ariaLabel={ariaLabel} as={SiReact} />
);

export const W3CIcon = ({ ariaLabel = '', ...rest }) => (
  <Icon {...rest} ariaLabel={ariaLabel} as={SiW3C} />
);

export const DiscordIcon = ({ ariaLabel = '', ...rest }) => (
  <Icon {...rest} ariaLabel={ariaLabel} as={SiDiscord} />
);

export const GithubIcon = ({ ariaLabel = '', ...rest }) => (
  <Icon {...rest} ariaLabel={ariaLabel} as={SiGithub} />
);

export const LibraryIcon = ({ ariaLabel = '', ...rest }) => (
  <Icon {...rest} ariaLabel={ariaLabel} as={VscLibrary} viewBox={vscViewbox} />
);

export const ServerIcon = ({ ariaLabel = '', ...rest }) => (
  <Icon {...rest} ariaLabel={ariaLabel} as={VscServer} viewBox={vscViewbox} />
);

export const CLIIcon = ({ ariaLabel = '', ...rest }) => (
  <Icon {...rest} ariaLabel={ariaLabel} as={DiTerminal} />
);

export const DesignTokenIcon = ({ ariaLabel = '', ...rest }) => (
  <Icon
    {...rest}
    ariaLabel={ariaLabel}
    viewBox={{ width: 200, height: 200 }}
    paths={[
      {
        d: 'M100.011 9L100.04 9.04999L100.069 9L179.21 54.6924L179.033 55H179.069V145.053L179.152 145.198L179.069 145.246V146H177.762L100.069 190.856L100.04 190.806L100.011 190.856L21 145.239L21.1382 145H21.0688V55H21.3122L21.0684 54.5776L100.011 9ZM125.466 75.9893L154.782 59.0637L100.04 27.4586L45.5198 58.9358L74.7197 75.7944C81.0908 69.1422 90.0617 65 100 65C110.035 65 119.084 69.2232 125.466 75.9893ZM133.499 89.8267C134.475 93.046 135 96.4617 135 100C135 116.553 123.509 130.422 108.069 134.065V167.762L163.069 136.008V72.7543L133.499 89.8267ZM92.0688 134.098C76.5593 130.504 65 116.602 65 100C65 96.3676 65.5533 92.8645 66.5803 89.5703L37.0688 72.5318V136.041L92.0688 167.796V134.098ZM119 100C119 110.493 110.493 119 100 119C89.5066 119 81 110.493 81 100C81 89.5066 89.5066 81 100 81C110.493 81 119 89.5066 119 100Z',
        fillRule: 'evenodd',
      },
    ]}
  />
);

export const AmplifyIcon = ({ ariaLabel = '', ...rest }) => (
  <Icon
    ariaLabel={ariaLabel}
    {...rest}
    paths={[
      {
        d: 'M5.22274 17.8571H11.9827L13.7143 20.9048H13.6655H0L4.8154 12.5604L6.83337 9.06616L8.56591 12.0683L5.22274 17.8571ZM7.74389 7.48595L9.40738 4.60353L18.8218 20.9047H15.4878L7.74389 7.48595ZM10.3333 3H13.6628L24 20.9048H20.6662L10.3333 3Z',
        fillRule: 'evenodd',
      },
    ]}
  />
);

export const DataIcon = ({ ariaLabel = '', ...rest }) => (
  <Icon {...rest} ariaLabel={ariaLabel} as={VscBrowser} viewBox={vscViewbox} />
);
