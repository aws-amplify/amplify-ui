import { FederatedIdentityProviders, SocialProvider } from '@aws-amplify/ui';

import { useAuthenticator } from '../..';
import { Button, Icon, Text } from '../../../..';

export interface FederatedSignInButtonProps {
  icon?: SocialProvider;
  provider: FederatedIdentityProviders;
  text: string;
}

const AppleIcon = (): JSX.Element => {
  return (
    <svg
      aria-label="Apple icon"
      className="amplify-icon federated-sign-in-icon"
      fill="#000"
      preserveAspectRatio="xMidYMid"
      stroke="#000"
      strokeWidth="0"
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M747.4 535.7c-.4-68.2 30.5-119.6 92.9-157.5-34.9-50-87.7-77.5-157.3-82.8-65.9-5.2-138 38.4-164.4 38.4-27.9 0-91.7-36.6-141.9-36.6C273.1 298.8 163 379.8 163 544.6c0 48.7 8.9 99 26.7 150.8 23.8 68.2 109.6 235.3 199.1 232.6 46.8-1.1 79.9-33.2 140.8-33.2 59.1 0 89.7 33.2 141.9 33.2 90.3-1.3 167.9-153.2 190.5-221.6-121.1-57.1-114.6-167.2-114.6-170.7zm-105.1-305c50.7-60.2 46.1-115 44.6-134.7-44.8 2.6-96.6 30.5-126.1 64.8-32.5 36.8-51.6 82.3-47.5 133.6 48.4 3.7 92.6-21.2 129-63.7z"></path>
    </svg>
  );
};

const GoogleIcon = (): JSX.Element => {
  return (
    <svg
      aria-label="Google icon"
      className="amplify-icon federated-sign-in-icon"
      viewBox="0 0 256 262"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid"
    >
      <path
        d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
        fill="#4285F4"
      />
      <path
        d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
        fill="#34A853"
      />
      <path
        d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
        fill="#FBBC05"
      />
      <path
        d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
        fill="#EB4335"
      />
    </svg>
  );
};

const FacebookIcon = (): JSX.Element => {
  return (
    <Icon
      className="federated-sign-in-icon"
      ariaLabel="Facebook icon"
      viewBox={{ minX: 0, minY: 0, width: 279, height: 538 }}
      pathData="M82.3409742,538 L82.3409742,292.936652 L0,292.936652 L0,196.990154 L82.2410458,196.990154 L82.2410458,126.4295 C82.2410458,44.575144 132.205229,0 205.252865,0 C240.227794,0 270.306232,2.59855099 279,3.79788222 L279,89.2502322 L228.536175,89.2502322 C188.964542,89.2502322 181.270057,108.139699 181.270057,135.824262 L181.270057,196.89021 L276.202006,196.89021 L263.810888,292.836708 L181.16913,292.836708 L181.16913,538 L82.3409742,538 Z"
      fill="#1877F2"
    />
  );
};

const AmazonIcon = (): JSX.Element => {
  return (
    <svg
      aria-label="Amazon icon"
      className="amplify-icon federated-sign-in-icon"
      viewBox="0 0 243 264"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid"
    >
      <path
        d="M230.826 208.039C227.468 203.683 208.551 205.982 200.056 206.998C197.471 207.321 197.076 205.042 199.407 203.405C214.475 192.665 239.201 195.766 242.082 199.364C244.966 202.982 241.337 228.071 227.173 240.049C225.001 241.888 222.93 240.904 223.898 238.468C227.077 230.431 234.205 212.419 230.826 208.039ZM123.769 264C71.0234 264 39.0764 241.955 14.7853 217.542C9.97339 212.706 3.71799 206.296 0.311513 200.691C-1.09773 198.372 2.59096 195.022 5.04421 196.844C35.239 219.268 79.1012 239.538 122.53 239.538C151.82 239.538 188.046 227.47 217.669 214.868C222.147 212.966 222.147 219.18 221.512 221.061C221.183 222.032 206.515 236.221 186.247 247.047C167.304 257.166 143.397 264 123.769 264Z"
        fill="#F2541B"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M142.943 111.185C142.943 124.756 143.268 136.054 136.406 148.123C130.856 157.913 122.027 163.95 112.222 163.95C98.8288 163.95 90.9806 153.772 90.9806 138.693C90.9806 109.036 117.677 103.647 142.943 103.647V111.185ZM178.166 196.081C175.858 198.15 171.635 198.22 169.914 196.894C157.974 187.684 149.89 173.688 149.89 173.688C130.706 193.156 117.127 199 92.2879 199C62.8772 199 40 180.905 40 144.729C40 116.461 55.3552 97.2408 77.2563 87.823C96.2094 79.5256 122.684 78.0173 142.943 75.7517C142.943 75.7517 144.633 53.933 138.699 45.9806C134.098 39.8163 126.272 36.9329 119.089 36.9329C106.127 36.8829 93.61 43.9051 91.1262 57.4188C90.4136 61.2829 87.5533 64.5261 84.54 64.206L51.0823 60.5922C48.5156 60.2951 45.0381 57.6639 45.8636 53.3081C53.644 12.3684 90.7373 0 123.989 0C140.983 0 163.21 4.51651 176.608 17.3349C193.597 33.1648 191.969 54.2755 191.969 77.2722V131.51C191.969 147.835 198.768 154.987 205.151 163.775C207.376 166.953 207.886 170.714 205.04 173.032C197.902 178.999 178.166 196.081 178.166 196.081Z"
        fill="#F2541B"
      />
    </svg>
  );
};

export const FederatedSignInButton = (
  props: FederatedSignInButtonProps
): JSX.Element => {
  const { icon, provider, text } = props;
  // TODO: Expose federated event sender so `_send` doesn't have to be extracted
  const { _send } = useAuthenticator(() => []);

  const handleClick = (event): void => {
    event.preventDefault();

    _send({
      type: 'FEDERATED_SIGN_IN',
      data: {
        provider,
      },
    });
  };

  let iconComponent;
  if (icon === 'facebook') {
    iconComponent = <FacebookIcon />;
  } else if (icon === 'google') {
    iconComponent = <GoogleIcon />;
  } else if (icon === 'amazon') {
    iconComponent = <AmazonIcon />;
  } else if (icon === 'apple') {
    iconComponent = <AppleIcon />;
  }

  return (
    <Button
      onClick={handleClick}
      className="federated-sign-in-button"
      fontWeight="normal"
      gap="1rem"
    >
      {iconComponent}
      <Text as="span">{text}</Text>
    </Button>
  );
};
