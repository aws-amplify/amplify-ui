import { Icon } from '@aws-amplify/ui-react';
import { SiGithub, SiDiscord, SiW3C, SiReact } from 'react-icons/si';
import { VscServer, VscLibrary, VscBrowser } from 'react-icons/vsc';
import { DiTerminal } from 'react-icons/di';

const vscViewbox = {
  width: 16,
  height: 16,
};

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

export const AmplifyIcon = (props) => (
  <Icon
    {...props}
    viewBox={{ width: 24, height: 22 }}
    paths={[
      {
        d: 'M14.3128 20.0394C14.3651 20.1298 14.4618 20.1855 14.5664 20.1855H16.8444C17.0698 20.1855 17.2107 19.942 17.098 19.7472L8.82308 5.44278C8.71037 5.24795 8.4286 5.24795 8.31589 5.44278L7.09981 7.54494C7.09518 7.55294 7.09518 7.56281 7.09981 7.57081L7.10128 7.57334C7.1106 7.58946 7.09894 7.60961 7.08029 7.60961C7.07163 7.60961 7.06363 7.61422 7.0593 7.62171L0.0396396 19.7616C-0.0730193 19.9565 0.0678714 20.2 0.293265 20.2H10.9633C11.1887 20.2 11.3296 19.9564 11.2169 19.7616L10.1254 17.8749C10.0731 17.7845 9.97646 17.7288 9.87184 17.7288H4.4145C4.3018 17.7288 4.23135 17.607 4.28771 17.5096L8.4417 10.3288C8.49805 10.2314 8.63894 10.2314 8.6953 10.3288L14.3128 20.0394Z',
      },
      {
        d: 'M10.1282 2.30989C10.0759 2.40032 10.0759 2.51172 10.1282 2.60214L20.2155 20.0394C20.2678 20.1298 20.3645 20.1855 20.4691 20.1855H22.7412C22.9666 20.1855 23.1075 19.942 22.9948 19.7472L11.7715 0.346077C11.6588 0.151242 11.377 0.151243 11.2643 0.346077L10.1282 2.30989Z',
      },
    ]}
  />
);

export const DataIcon = ({ ariaLabel = '', ...rest }) => (
  <Icon {...rest} ariaLabel={ariaLabel} as={VscBrowser} viewBox={vscViewbox} />
);
