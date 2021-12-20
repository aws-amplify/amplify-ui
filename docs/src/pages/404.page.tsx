import * as React from 'react';
import {
  Heading,
  Text,
  View,
  Link,
  Image,
  useTheme,
} from '@aws-amplify/ui-react';

import { cats } from '@/data/cats';

const Custom404 = () => {
  const { tokens } = useTheme();
  let [href, setHref] = React.useState('https://ui.docs.amplify.aws');
  const cat = cats[Math.round(Math.random() * cats.length)];

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
          {`Apologies––we can't seem to find this page.
If this is a mistake, please `}
          <Link
            isExternal={true}
            href={`https://github.com/aws-amplify/amplify-ui/issues/new?title=[missing-page]&labels=Documentation&body=${encodeURI(`**Page**: [\`${href}\`](${href})
**Feedback**: <!-- your feedback here -->`)}`}
          >
            file an issue
          </Link>
          {` and we will get it fixed ASAP.`}
        </Text>

        <Image src={cat.url} alt={cat.alt} maxHeight="50vh" />
      </View>
    </>
  );
};

export default Custom404;
