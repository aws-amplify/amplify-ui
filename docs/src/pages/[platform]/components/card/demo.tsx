import * as React from 'react';
import {
  Card,
  Text,
  View,
  Image,
  Badge,
  Button,
  Flex,
  Divider,
  Heading,
  SelectField,
  CardProps,
  useTheme,
  CardVariations,
} from '@aws-amplify/ui-react';

import { Demo } from '@/components/Demo';

const propsToCode = (props) => {
  return (
    `<Card` +
    (props.variation
      ? `\n  variation=${JSON.stringify(props.variation)}`
      : '') +
    `>
  I'm a card!
</Card>`
  );
};

const PropControls = (props) => {
  const { variation, setVariation } = props;
  return (
    <View>
      <SelectField
        name="variation"
        id="variation"
        label="Variation"
        value={variation}
        onChange={(event) =>
          setVariation(event.target.value as CardProps['variation'])
        }
      >
        <option value="">default</option>
        <option value="outlined">outlined</option>
        <option value="elevated">elevated</option>
      </SelectField>
    </View>
  );
};

export const CardDemo = () => {
  const { tokens } = useTheme();
  const [variation, setVariation] = React.useState<CardVariations>();
  const props = { variation, setVariation };
  return (
    <Demo code={propsToCode(props)} propControls={<PropControls {...props} />}>
      <View
        backgroundColor={tokens.colors.background.secondary}
        padding={tokens.space.medium}
      >
        <Card {...props}>{`I'm a card!`}</Card>
      </View>
    </Demo>
  );
};
