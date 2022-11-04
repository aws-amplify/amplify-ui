import * as React from 'react';
import classNames from 'classnames';
import styles from 'src/styles/studio/figma.module.scss';
import { useNavigationContext } from 'src/hooks/useNavigationContext';
import { Button, Image, Text, TextField } from '@aws-amplify/ui-react';
import { Features } from '@/components/Studio/Features';

const FigmaToCode = () => {
  const { setAlwaysCollapsible } = useNavigationContext();
  setAlwaysCollapsible(true);

  return (
    <div className={classNames(styles['figma-container'])}>
      <div className={classNames(styles['figma-landing-hero'])}>
        <Image src="/studio/figma-to-react.png" alt="Figma to React image" />
        <Text
          className={classNames(styles['figma-landing-hero__title'])}
        >{`Get React code from Figma`}</Text>
        <Text
          className={classNames(styles['figma-landing-hero__text'])}
        >{`Amplify turns Figma components into clean React code. Paste in your own Figma link or use one of our pre-built kits.`}</Text>
        <div className={classNames(styles['figma-file-link'])}>
          <TextField
            type="url"
            label={
              <Text
                className={classNames(styles['figma-file-link__text'])}
              >{`Use your own Figma file`}</Text>
            }
            width="100%"
            placeholder="Figma file link"
          />
        </div>
        <Text className={classNames(styles['figma-landing-hero__text'])}>
          {'or'}
        </Text>
        <Button className={classNames(styles['ui-kit'])}>
          <Text className={classNames(styles['ui-kit__text'])}>
            {'Use AWS Amplify UI Kit'}
          </Text>
        </Button>
      </div>
      <Features />
    </div>
  );
};

export default FigmaToCode;
