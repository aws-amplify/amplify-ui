import { Link } from '@aws-amplify/ui-react';

export const ExternalLinkExample = () => {
  return (
    <Link
      href="https://ui.docs.amplify.aws/react/components/link"
      isExternal={true}
    >
      This Link will open in new tab
    </Link>
  );
};
