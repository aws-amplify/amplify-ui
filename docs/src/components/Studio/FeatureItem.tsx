import * as React from 'react';
import classNames from 'classnames';
import styles from 'src/styles/studio/feature-item.module.scss';
import { Flex, Heading, Image, Text } from '@aws-amplify/ui-react';

type FeatureItemProps = {
  icon: string;
  title: string;
  description: string;
};

export const FeatureItem = ({
  icon,
  title,
  description,
}: FeatureItemProps): JSX.Element => {
  return (
    <Flex gap={35} width={327.75}>
      <Image src={icon} alt={title} width={70} />
      <Flex direction="column" gap={0}>
        <Text className={classNames(styles['title'])}>{title}</Text>
        <Text className={classNames(styles['description'])}>{description}</Text>
      </Flex>
    </Flex>
  );
};
