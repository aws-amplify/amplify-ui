import { Icon } from '@aws-amplify/ui-react';

export const CustomIconWithSvgExample = () => {
  return (
    // This is an align bottom icon
    <Icon ariaLabel="Align bottom">
      <path d="M13 10H17V16H13V10Z" fill="currentColor" opacity="0.5" />
      <path d="M11 4H7V16H11V4Z" fill="currentColor" />
      <path d="M18 18H6V20H18V18Z" fill="currentColor" />
    </Icon>
  );
};
