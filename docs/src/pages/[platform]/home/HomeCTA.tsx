import NextLink from 'next/link';
import { Button, Flex } from '@aws-amplify/ui-react';

export const HomeCTA = ({ children, href, ...rest }) => {
  return (
    <Flex justifyContent="center">
      <NextLink href={href} passHref>
        <Button as="a" size="large" className="docs-home-cta" {...rest}>
          {children}
        </Button>
      </NextLink>
    </Flex>
  );
};
