import * as React from 'react';
import { HomeCodeHighlight } from '@/components/CodeHighlight';
import { DataIcon } from '@/components/DataIcon';
import { HomeCTA } from 'src/pages/[platform]/home/HomeCTA';
import { AmplifyIcon } from '@/components/Logo';
import {
  Button,
  Card,
  Flex,
  Heading,
  Icon,
  Image,
  Link,
  Rating,
  Text,
  useTheme,
  View,
} from '@aws-amplify/ui-react';
import { useIntersectionObserver } from '@/components/useIntersection';

const StudioCard = () => {
  const { tokens } = useTheme();
  return (
    <View className="docs-home-figma-node">
      <View className="docs-home-figma-node-label">
        <Icon
          ariaLabel=""
          viewBox={{
            width: 12,
            height: 12,
          }}
          pathData="M3.743 2.748L6 .5l2.257 2.248L6 4.996 3.743 2.748zm-.995 5.51L.5 6l2.248-2.257L4.996 6 2.748 8.257zm5.51.994L6 11.5 3.743 9.252 6 7.004l2.257 2.248zM11.5 6L9.252 3.743 7.004 6l2.248 2.257L11.5 6z"
        />
        ProductCard
      </View>
      <View className="docs-home-figma-node-handles" />
      <View className="docs-home-figma-node-handles" />
      <Card variation="elevated">
        <Flex direction="column">
          <Flex
            className="docs-home-figma-data"
            alignItems="center"
            justifyContent="center"
            padding={tokens.space.xl}
            backgroundColor={tokens.colors.background.tertiary}
            fontSize={tokens.fontSizes.xxl}
          >
            <AmplifyIcon />
          </Flex>
          <Text
            className="docs-home-figma-data"
            fontSize={tokens.fontSizes.large}
            fontWeight={tokens.fontWeights.bold}
          >
            AWS Amplify
          </Text>
          <Rating className="docs-home-figma-data" value={3.5} />
          <Text
            className="docs-home-figma-data"
            fontSize={tokens.fontSizes.xl}
            color={tokens.colors.font.tertiary}
          >
            $99
          </Text>
          <Button variation="primary">Add to cart</Button>
        </Flex>
      </Card>
    </View>
  );
};

export const FigmaSection = (props) => {
  const { tokens } = useTheme();
  const ref = React.useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, {
    threshold: 0.25,
    freezeOnceVisible: true,
  });
  const isVisible = !!entry?.isIntersecting;

  return (
    <Flex
      direction="column"
      gap={tokens.space.large}
      as="section"
      className="docs-home-section docs-burst-bg"
      ref={ref}
    >
      <Heading
        level={2}
        textAlign="center"
        className={`fade-in ${isVisible ? 'shown' : ''}`}
      >
        Build UI <strong>visually</strong> in Figma
      </Heading>
      <Flex
        className="container"
        direction={{
          base: 'column',
          large: 'row',
        }}
        gap={tokens.space.large}
      >
        <Flex
          gap={tokens.space.large}
          direction="column"
          alignItems="flex-start"
          flex="1"
        >
          <Text className="docs-home-description">
            With Amplify Studio you can design components in Figma, bind them to
            your data, and generate production-ready React code. Amplify
            Studio's UI builder makes it easy to build UI that is connected to
            your data that is customizable and configurable in your codebase. Go
            from design to production-ready code in minutes and eliminate the
            design-development gap.
          </Text>
          <HomeCTA href={`/react/getting-started/figma-to-code`}>
            <span>Learn more about Figma integration</span>
            <Image height="2rem" alt="" src="/svg/integrations/figma.svg" />
          </HomeCTA>
        </Flex>
        <Flex
          flex="1"
          className="docs-home-figma-graphic"
          alignItems="center"
          justifyContent="center"
        >
          <StudioCard />
          <Card className="docs-home-figma-studio">
            <Text fontSize={tokens.fontSizes.xl}>
              <View
                as="span"
                fontSize={tokens.fontSizes.xxl}
                color={tokens.colors.brand.secondary[40]}
              >
                <DataIcon />
              </View>
              <code>Product</code>
            </Text>
            <Text className="docs-home-figma-data">
              <code>Product.image</code>
            </Text>
            <Text className="docs-home-figma-data">
              <code>Product.title</code>
            </Text>
            <Text className="docs-home-figma-data">
              <code>Product.rating</code>
            </Text>
            <Text className="docs-home-figma-data">
              <code>Product.price</code>
            </Text>
          </Card>

          <View
            className="docs-home-figma-code"
            fontSize={tokens.fontSizes.large}
          >
            <HomeCodeHighlight
              className="docs-home-code"
              code={`<ProductCard />`}
            />
          </View>
        </Flex>
      </Flex>
    </Flex>
  );
};
