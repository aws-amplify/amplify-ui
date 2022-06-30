import icons from '../assets';
import { Button, Image, Flex, Text, View } from '../../../primitives';

import { IN_APP_MESSAGING_TEST_ID } from '../constants';

export default function MessageLayout({ ...props }): JSX.Element {
  console.log('props', props);
  const {
    body,
    container,
    hasButtons,
    hasPrimaryButton,
    hasRenderableImage,
    hasSecondaryButton,
    header,
    image,
    layout,
    onClose,
    primaryButton,
    secondaryButton,
    styles,
  } = props;

  console.log('icons', icons, icons.close);
  const iconButton = (
    <View
      testId={IN_APP_MESSAGING_TEST_ID.CLOSE_BUTTON}
      style={styles[0]}
      onClick={onClose}
    >
      <Image src={icons.close} alt={'Close Button'} />
      {/* <button
        // style={styles.b}
        // color={styles.iconButton.iconColor}
        // size={ICON_BUTTON_SIZE}
        // style="color:red"
        // id={IN_APP_MESSAGING_TEST_ID.CLOSE_BUTTON}
      /> */}
    </View>
  );

  return (
    <View style={styles[0].container}>
      <View style={styles[0].contentContainer}>
        {iconButton}
        <View style={styles.imageContainer}>
          <Image
            src={image.src}
            style={styles[0].image}
            testId={IN_APP_MESSAGING_TEST_ID.IMAGE}
            alt="Close Button"
          />
        </View>
        <View style={styles[0].textContainer}>
          {header?.content && (
            <Text
              style={styles[0].header}
              testId={IN_APP_MESSAGING_TEST_ID.HEADER}
            >
              {header.content}
            </Text>
          )}
          {body?.content && (
            <Text style={styles[0].body} testId={IN_APP_MESSAGING_TEST_ID.BODY}>
              {body.content}
            </Text>
          )}
        </View>
      </View>
      {hasButtons && (
        <View>
          {hasSecondaryButton && (
            <Button
              onClick={secondaryButton?.onAction}
              style={styles[0].secondaryButton}
              testId={IN_APP_MESSAGING_TEST_ID.SECONDARY_BUTTON}
            >
              {secondaryButton?.title}
            </Button>
          )}
          {hasPrimaryButton && (
            <Button
              onClick={primaryButton?.onAction}
              style={styles[0].primaryButton}
              testId={IN_APP_MESSAGING_TEST_ID.PRIMARY_BUTTON}
            >
              {primaryButton?.title}
            </Button>
          )}
        </View>
      )}
    </View>
  );
}
