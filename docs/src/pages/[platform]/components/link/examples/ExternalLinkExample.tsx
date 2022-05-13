import { Link } from '@aws-amplify/ui-react';

export const ExternalLinkExample = () => {
  return (
    <Link href="https://www.myOtherAwesomeWebsite.com" isExternal={true}>
      Link To My Awesome Website
    </Link>
  );
};
