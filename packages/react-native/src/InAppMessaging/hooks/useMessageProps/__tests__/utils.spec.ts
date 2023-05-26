import { PressableStateCallbackType, StyleProp, ViewStyle } from 'react-native';

import {
  MessageComponentBaseProps,
  MessageLayout,
  MessageTextAlign,
} from '@aws-amplify/ui-react-core-notifications';
import { BUTTON_PRESSED_OPACITY } from '../../../constants';
import { MessageDefaultStyle } from '../types';
import { StyleParams } from '../types';

import {
  getComponentButtonStyle,
  getContainerAndWrapperStyle,
  getPayloadStyle,
  getMessageStyles,
  shouldFillDeviceScreen,
} from '../utils';

type ResolveContainerStyle = {
  container: (state?: PressableStateCallbackType) => StyleProp<ViewStyle>;
};

const EMPTY_STYLE = Object.freeze({});

const baseDefaultStyle: MessageDefaultStyle = {
  body: {},
  buttonContainer: {},
  buttonsContainer: {},
  buttonText: {},
  wrapper: {},
  container: {},
  contentContainer: {},
  header: {},
  iconButton: {},
  image: {},
  imageContainer: {},
  textContainer: {},
};

describe('getComponentButtonStyle', () => {
  const pressedOpacity = { opacity: BUTTON_PRESSED_OPACITY };

  it.each(['primaryButton' as const, 'secondaryButton' as const])(
    'returns the expected output in the happy path for a %s',
    (buttonType) => {
      const defaultStyle = {
        ...baseDefaultStyle,
        buttonContainer: { backgroundColor: 'white' },
        buttonText: { color: 'red' },
      };
      const payloadStyle = {
        [buttonType]: {
          backgroundColor: 'maroon',
          borderRadius: 4,
          color: 'teal',
        },
      };
      const overrideStyle = {
        [buttonType]: {
          container: { backgroundColor: 'pink' },
          text: { color: 'black' },
        },
      };
      const styleParams = { defaultStyle, payloadStyle, overrideStyle };

      const expectedContainerPressedStyle = [
        pressedOpacity,
        { backgroundColor: 'white' },
        { backgroundColor: 'maroon', borderRadius: 4 },
        { backgroundColor: 'pink' },
      ];
      const expectedContainerUnpressedStyle = [
        EMPTY_STYLE,
        { backgroundColor: 'white' },
        { backgroundColor: 'maroon', borderRadius: 4 },
        { backgroundColor: 'pink' },
      ];

      const expectedTextStyle = [
        { color: 'red' },
        { color: 'teal' },
        { color: 'black' },
      ];

      const output = getComponentButtonStyle({ styleParams, buttonType });

      const containerPressedStyle = (output as ResolveContainerStyle).container(
        { pressed: true }
      );
      const containerUnpressedStyle = (
        output as ResolveContainerStyle
      ).container({ pressed: false });

      expect(containerPressedStyle).toStrictEqual(
        expectedContainerPressedStyle
      );
      expect(containerUnpressedStyle).toStrictEqual(
        expectedContainerUnpressedStyle
      );

      expect(output.text).toStrictEqual(expectedTextStyle);
    }
  );

  describe('button container style', () => {
    it('returns unpressed button container style when press event is not provided', () => {
      const defaultStyle = {
        buttonContainer: { backgroundColor: 'white' },
        buttonText: {},
      } as MessageDefaultStyle;
      const styleParams = {
        defaultStyle,
        payloadStyle: {},
        overrideStyle: {},
      };

      const output = getComponentButtonStyle({
        styleParams,
        buttonType: 'primaryButton',
      });

      const buttonContainerStyle = (
        output as ResolveContainerStyle
      ).container();

      const expectedButtonContainerStyle = [
        EMPTY_STYLE,
        { backgroundColor: 'white' },
        EMPTY_STYLE,
        EMPTY_STYLE,
      ];

      expect(buttonContainerStyle).toStrictEqual(expectedButtonContainerStyle);
    });

    it('correctly evaluates button container override style when it is a function', () => {
      const pressedStyle = { backgroundColor: 'seafoam' };
      const unpressedStyle = { backgroundColor: 'fuschia' };
      const overrideStyle = {
        primaryButton: {
          container: ({ pressed }: { pressed: boolean }) =>
            pressed ? pressedStyle : unpressedStyle,
        },
      };
      const styleParams = {
        defaultStyle: baseDefaultStyle,
        payloadStyle: {},
        overrideStyle,
      };

      const output = getComponentButtonStyle({
        styleParams,
        buttonType: 'primaryButton',
      });

      const containerPressedStyle = (output as ResolveContainerStyle).container(
        { pressed: true }
      );
      const containerUnpressedStyle = (
        output as ResolveContainerStyle
      ).container({ pressed: false });

      const expectedContainerPressedStyle = [
        pressedOpacity,
        EMPTY_STYLE,
        EMPTY_STYLE,
        pressedStyle,
      ];
      const expectedContainerUnressedStyle = [
        EMPTY_STYLE,
        EMPTY_STYLE,
        EMPTY_STYLE,
        unpressedStyle,
      ];

      expect(containerPressedStyle).toStrictEqual(
        expectedContainerPressedStyle
      );
      expect(containerUnpressedStyle).toStrictEqual(
        expectedContainerUnressedStyle
      );
    });
  });
});

describe('getContainerAndWrapperStyle', () => {
  it('returns the expected output for a banner component in the happy path', () => {
    const defaultStyle = {
      ...baseDefaultStyle,
      container: { backgroundColor: 'red' },
      wrapper: { opacity: 0.4 },
    };
    const payloadStyle = { container: { backgroundColor: 'teal' } };
    const overrideStyle = { container: { backgroundColor: 'pink' } };

    const output = getContainerAndWrapperStyle({
      layout: 'TOP_BANNER',
      styleParams: { defaultStyle, payloadStyle, overrideStyle },
    });

    const expectedContainerStyle = [
      { backgroundColor: 'red' },
      { backgroundColor: 'teal' },
      { backgroundColor: 'pink' },
    ];

    const expectedWrapperStyle = { opacity: 0.4 };

    expect(output.container).toStrictEqual(expectedContainerStyle);
    expect(output.wrapper).toStrictEqual(expectedWrapperStyle);
  });

  it('returns the expected output for a non-banner component in the happy path', () => {
    const defaultStyle = {
      ...baseDefaultStyle,
      container: { backgroundColor: 'red' },
      wrapper: { opacity: 0.4 },
    };
    const payloadStyle = { container: { backgroundColor: 'teal' } };
    const overrideStyle = { container: { backgroundColor: 'pink' } };

    const output = getContainerAndWrapperStyle({
      layout: 'CAROUSEL',
      styleParams: { defaultStyle, payloadStyle, overrideStyle },
    });

    const expectedContainerStyle = [{}, {}, {}];

    const expectedWrapperStyle = [
      { opacity: 0.4 },
      { backgroundColor: 'red' },
      { backgroundColor: 'teal' },
      { backgroundColor: 'pink' },
    ];

    expect(output.container).toStrictEqual(expectedContainerStyle);
    expect(output.wrapper).toStrictEqual(expectedWrapperStyle);
  });

  it('correctly handles a style array passed as the argument of overrideStyle.container', () => {
    const defaultStyle = {
      ...baseDefaultStyle,
      container: { backgroundColor: 'red' },
      wrapper: { opacity: 0.4 },
    };
    const payloadStyle = { container: { backgroundColor: 'teal' } };
    const overrideStyle = {
      container: [{ backgroundColor: 'pink' }, { flex: 5 }],
    };

    const output = getContainerAndWrapperStyle({
      layout: 'CAROUSEL',
      styleParams: { defaultStyle, payloadStyle, overrideStyle },
    });

    const expectedContainerStyle = [EMPTY_STYLE, EMPTY_STYLE, { flex: 5 }];

    const expectedWrapperStyle = [
      { opacity: 0.4 },
      { backgroundColor: 'red' },
      { backgroundColor: 'teal' },
      { backgroundColor: 'pink' },
    ];

    expect(output.container).toStrictEqual(expectedContainerStyle);
    expect(output.wrapper).toStrictEqual(expectedWrapperStyle);
  });
});

describe('getPayloadStyle', () => {
  it('returns the expected output in the happy path', () => {
    const output = getPayloadStyle({
      body: { style: { textAlign: 'left' as MessageTextAlign } },
      container: { style: { backgroundColor: 'lightgray', borderRadius: 2 } },
      header: { style: { textAlign: 'center' as MessageTextAlign } },
      primaryButton: { style: { backgroundColor: 'salmon', color: 'olive' } },
      secondaryButton: { style: { backgroundColor: 'sand', color: 'peru' } },
    } as MessageComponentBaseProps);

    expect(output).toMatchSnapshot();
  });
});

describe('getMessageStyles', () => {
  const defaultStyle = {
    body: { color: 'fuschia' },
    buttonContainer: { backgroundColor: 'chartreuse' },
    buttonText: { color: 'pink' },
    buttonsContainer: { backgroundColor: 'teal' },
    contentContainer: { backgroundColor: 'lightblue' },
    container: { backgroundColor: 'red', borderRadius: 1 },
    header: { backgroundColor: 'purple' },
    iconButton: { backgroundColor: 'blue' },
    image: { backgroundColor: 'yellow' },
    imageContainer: { backgroundColor: 'green' },
    textContainer: { backgroundColor: 'antiquewhite' },
    wrapper: { backgroundColor: 'gray' },
  };

  const payloadStyle: StyleParams['payloadStyle'] = {
    body: { textAlign: 'left' as MessageTextAlign },
    container: { backgroundColor: 'lightgray', borderRadius: 2 },
    header: { textAlign: 'center' as MessageTextAlign },
    primaryButton: { backgroundColor: 'salmon', color: 'olive' },
    secondaryButton: { backgroundColor: 'sand', color: 'peru' },
  };

  const overrideStyle = {
    body: { color: 'white' },
    closeIconButton: { backgroundColor: 'turquoise' },
    closeIconColor: 'darkcyan',
    container: { backgroundColor: 'lawngreen', borderRadius: 3 },
    header: { backgroundColor: 'lightpink' },
    image: { backgroundColor: 'royalblue' },
    primaryButton: {
      container: { backgroundColor: 'seagreen' },
      text: { color: 'black' },
    },
    secondaryButton: {
      container: { backgroundColor: 'sienna' },
      text: { color: 'orchid' },
    },
  };
  it('returns the expected output in the happy path', () => {
    const output = getMessageStyles({
      layout: 'FULL_SCREEN',
      styleParams: { defaultStyle, payloadStyle, overrideStyle },
    });

    expect(output).toMatchSnapshot();
  });

  it('adds a bottom padding for carousel page indicators', () => {
    const output = getMessageStyles({
      layout: 'CAROUSEL',
      styleParams: { defaultStyle, payloadStyle: {}, overrideStyle: {} },
    });

    expect(output).toMatchSnapshot();
  });
});

describe('shouldFillDeviceScreen', () => {
  it.each([
    ['BOTTOM_BANNER', false],
    ['MIDDLE_BANNER', false],
    ['TOP_BANNER', false],
    ['MODAL', false],
    ['CAROUSEL', true],
    ['FULL_SCREEN', true],
  ])('returns the expected output for a %s layout', (layout, expected) => {
    expect(shouldFillDeviceScreen(layout as MessageLayout)).toBe(expected);
  });
});
