import * as React from 'react';
import {
  Button,
  ButtonVariations,
  ButtonColorThemes,
  Flex,
  Heading,
} from '@aws-amplify/ui-react';

const ButtonSet = ({
  variation,
  colorTheme,
}: {
  variation?: ButtonVariations;
  colorTheme?: ButtonColorThemes;
}) => {
  return (
    <Flex>
      <Button variation={variation} colorTheme={colorTheme}>
        normal
      </Button>
      <Button
        variation={variation}
        colorTheme={colorTheme}
        className="amplify-button--test-hover"
      >
        hover
      </Button>
      <Button
        variation={variation}
        colorTheme={colorTheme}
        className="amplify-button--test-focus"
      >
        focus
      </Button>
      <Button
        variation={variation}
        colorTheme={colorTheme}
        className="amplify-button--test-active"
      >
        active
      </Button>
      <Button variation={variation} colorTheme={colorTheme} isDisabled={true}>
        disabled
      </Button>
      <Button
        variation={variation}
        colorTheme={colorTheme}
        isLoading={true}
        loadingText="loading"
      >
        loading
      </Button>
    </Flex>
  );
};

export const Matrix = () => {
  return (
    <Flex direction="column" gap="medium">
      <Heading level={3} fontSize="medium">
        Outlined (default) variation
      </Heading>
      <ButtonSet />
      <ButtonSet colorTheme="info" />
      <ButtonSet colorTheme="warning" />
      <ButtonSet colorTheme="success" />
      <ButtonSet colorTheme="error" />
      <ButtonSet colorTheme="overlay" />

      <Heading level={3} fontSize="medium" marginTop="large">
        Primary variation
      </Heading>
      <ButtonSet variation="primary" />
      <ButtonSet variation="primary" colorTheme="info" />
      <ButtonSet variation="primary" colorTheme="warning" />
      <ButtonSet variation="primary" colorTheme="success" />
      <ButtonSet variation="primary" colorTheme="error" />
      <ButtonSet variation="primary" colorTheme="overlay" />

      <Heading level={3} fontSize="medium" marginTop="large">
        Link variation
      </Heading>
      <ButtonSet variation="link" />
      <ButtonSet variation="link" colorTheme="info" />
      <ButtonSet variation="link" colorTheme="warning" />
      <ButtonSet variation="link" colorTheme="success" />
      <ButtonSet variation="link" colorTheme="error" />
      <ButtonSet variation="link" colorTheme="overlay" />
    </Flex>
  );
};
