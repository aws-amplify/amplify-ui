import { useRef } from 'react';
import classNames from 'classnames';
import {
  Button,
  Card,
  Flex,
  Heading,
  Icon,
  Rating,
  Text,
  View,
} from '@aws-amplify/ui-react';

import { CodeHighlight } from '@/components/CodeHighlight';
import { DataIcon } from '@/components/Icons';
import { HomeCTA } from '@/components/home/HomeCTA';
import { useIntersectionObserver } from '@/components/useIntersection';
import { FigmaLogoMono } from '@/components/Logo';
import { trackScroll } from '@/utils/track';

const StudioCard = () => {
  return (
    <View className="docs-home-figma__node">
      <View className="docs-home-figma__node-label">
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
      <View className="docs-home-figma__node-handles" />
      <View className="docs-home-figma__node-handles" />
      <Card variation="elevated">
        <Flex direction="column">
          <Text
            className="docs-home-figma__data"
            fontSize="large"
            fontWeight="bold"
          >
            AWS Amplify
          </Text>
          <Rating className="docs-home-figma__data" value={3.5} />
          <Text
            className="docs-home-figma__data"
            fontSize="xl"
            color="font.tertiary"
          >
            $99
          </Text>
          <Button variation="primary">Add to cart</Button>
        </Flex>
      </Card>
    </View>
  );
};

export const FigmaSection = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, {
    threshold: 0.25,
    freezeOnceVisible: true,
  });
  const isVisible = !!entry?.isIntersecting;
  if (isVisible) {
    trackScroll('Home#Figma');
  }

  return (
    <View
      as="section"
      id="figma"
      className={classNames(
        'docs-home-section',
        'docs-burst-bg',
        'fade-in',
        isVisible && 'shown'
      )}
      ref={ref}
    >
      <Flex className="docs-home-subsection" direction="column" gap="large">
        <Heading
          level={2}
          className={classNames('expand-out', isVisible && 'shown')}
        >
          Build UI <strong>visually</strong> in Figma
        </Heading>
        <Flex
          direction={{
            base: 'column',
            large: 'row',
          }}
          gap="large"
        >
          <Flex gap="large" direction="column" alignItems="flex-start" flex="1">
            <Text className="docs-home-text">
              With Amplify Studio you can design components in Figma, bind them
              to your data, and generate production-ready React code. Go from
              design to production-ready code in minutes and eliminate the
              design-development gap.
            </Text>
          </Flex>
          <Flex
            flex="1"
            className="docs-home-figma"
            alignItems="center"
            justifyContent="center"
          >
            <StudioCard />
            <Card className="docs-home-figma__studio">
              <Text fontSize="xl">
                <DataIcon color="font.disabled" />
                <code>Product</code>
              </Text>
              <Text className="docs-home-figma__data">
                <code>Product.title</code>
              </Text>
              <Text className="docs-home-figma__data">
                <code>Product.rating</code>
              </Text>
              <Text className="docs-home-figma__data">
                <code>Product.price</code>
              </Text>
            </Card>

            <View className="docs-home-figma__code">
              <CodeHighlight
                className="docs-home-code"
                code={`<ProductCard />`}
              />
            </View>
          </Flex>
        </Flex>
        <Flex className="docs-home-subsection--thin" direction="column">
          <Card variation="elevated">
            <video controls width="100%">
              <source src="/studio-demo.mp4" type="video/mp4" />
            </video>
          </Card>
          <HomeCTA href="/react/getting-started/figma">
            <span>Learn more about Figma integration</span>
            <FigmaLogoMono alt="" />
          </HomeCTA>
        </Flex>
      </Flex>
    </View>
  );
};
