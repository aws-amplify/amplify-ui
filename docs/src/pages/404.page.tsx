import * as React from 'react';
import { Heading, Text, View, Link, useTheme } from '@aws-amplify/ui-react';

const Custom404 = () => {
  const { tokens } = useTheme();
  let [href, setHref] = React.useState('https://ui.docs.amplify.aws');

  React.useEffect(() => {
    setHref(window.location.href);
  }, []);

  return (
    <>
      <View
        as="section"
        className="docs-home-section container"
        textAlign="center"
      >
        <Heading level={1}>404</Heading>
        <Text fontSize={tokens.fontSizes.large}>
          Apologies––we can't seem to find this page. <br />
          {`If this is a mistake, please `}
          <Link
            isExternal={true}
            href={`https://github.com/aws-amplify/amplify-ui/issues/new?title=[missing-page]&labels=Documentation&body=${encodeURI(`**Page**: [\`${href}\`](${href})
**Feedback**: <!-- your feedback here -->`)}`}
          >
            file an issue
          </Link>
          {` and we will get it fixed ASAP.`}
        </Text>
      </View>
    </>
  );
};

export default Custom404;
