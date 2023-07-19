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

      <Heading level={3} fontSize="medium" marginTop="large">
        Destructive variation
      </Heading>
      <ButtonSet variation="destructive" />
      <ButtonSet variation="destructive" colorTheme="info" />
      <ButtonSet variation="destructive" colorTheme="warning" />
      <ButtonSet variation="destructive" colorTheme="success" />
      <ButtonSet variation="destructive" colorTheme="error" />
      <ButtonSet variation="destructive" colorTheme="overlay" />

      <Heading level={3} fontSize="medium" marginTop="large">
        Warning variation
      </Heading>
      <ButtonSet variation="warning" />
      <ButtonSet variation="warning" colorTheme="info" />
      <ButtonSet variation="warning" colorTheme="warning" />
      <ButtonSet variation="warning" colorTheme="success" />
      <ButtonSet variation="warning" colorTheme="error" />
      <ButtonSet variation="warning" colorTheme="overlay" />

      <Heading level={3} fontSize="medium" marginTop="large">
        Menu variation
      </Heading>
      <ButtonSet variation="menu" />
      <ButtonSet variation="menu" colorTheme="info" />
      <ButtonSet variation="menu" colorTheme="warning" />
      <ButtonSet variation="menu" colorTheme="success" />
      <ButtonSet variation="menu" colorTheme="error" />
      <ButtonSet variation="menu" colorTheme="overlay" />
    </Flex>
  );
};
