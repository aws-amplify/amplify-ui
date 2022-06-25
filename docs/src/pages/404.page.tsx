import * as React from 'react';
import {
  Heading,
  Text,
  View,
  Link,
  Image,
  Flex,
  useTheme,
} from '@aws-amplify/ui-react';

import { cats } from '@/data/cats';

const Custom404 = () => {
  const { tokens } = useTheme();
  let [href, setHref] = React.useState('https://ui.docs.amplify.aws');
  let [cat, setCat] = React.useState(undefined);

  React.useEffect(() => {
    setHref(window.location.href);
    setCat(cats[Math.floor(Math.random() * cats.length)]);
  }, []);

  return (
    <View as="section" className="docs-home-section" textAlign="center">
      <Flex direction="column" gap={tokens.space.large} alignItems="center">
        <Heading level={1}>404</Heading>
        <Text fontSize={tokens.fontSizes.large}>
          {`Apologies—we can't seem to find this page.`} <br />
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

        {cat ? <Image src={cat.url} alt={cat.alt} maxHeight="50vh" /> : null}
      </Flex>
    </View>
  );
};

export default Custom404;
