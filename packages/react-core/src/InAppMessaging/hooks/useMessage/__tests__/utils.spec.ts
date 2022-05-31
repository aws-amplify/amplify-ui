import { ConsoleLogger as Logger } from '@aws-amplify/core';

import { MessageButton, MessageContent } from '../../../types';
import { BannerMessageLayouts } from '../../../types';
import { getActionHandler, getContentProps, getPositionProp } from '../utils';

// use empty mockImplementation to turn off console output
const errorSpy = jest.spyOn(Logger.prototype, 'error').mockImplementation();

const onMessageAction = jest.fn();

const baseContent: MessageContent = {
  container: { style: { backgroundColor: 'purple' } },
};

const primaryButton: MessageButton = {
  action: 'LINK',
  title: 'Go to docs',
  url: 'https://docs.amplify.aws/',
};

const secondaryButton: MessageButton = {
  action: 'CLOSE',
  title: 'close',
};

const onActionCallback = jest.fn();

describe('getPositionProp', () => {
  it.each([
    ['TOP_BANNER', 'top'],
    ['MIDDLE_BANNER', 'middle'],
    ['BOTTOM_BANNER', 'bottom'],
  ])(
    'returns the expected position when provided a %s argument',
    (layout, expected) => {
      const output = getPositionProp(layout as BannerMessageLayouts);
      expect(output).toBe(expected);
    }
  );
});

describe('getContentProps', () => {
  it('returns the expected output in the happy path', () => {
    const output = getContentProps(
      baseContent,
      onMessageAction,
      onActionCallback
    );
    expect(output).toStrictEqual(baseContent);
  });

  it('returns the expected output when a primary button is provided', () => {
    const output = getContentProps(
      { ...baseContent, primaryButton },
      onMessageAction,
      onActionCallback
    );
    expect(output).toStrictEqual({
      ...baseContent,
      primaryButton: {
        title: primaryButton.title,
        onAction: expect.any(Function) as Function,
      },
    });
  });

  it('returns the expected output when a secondary button is provided', () => {
    const output = getContentProps(
      { ...baseContent, secondaryButton },
      onMessageAction,
      onActionCallback
    );
    expect(output).toStrictEqual({
      ...baseContent,
      secondaryButton: {
        title: secondaryButton.title,
        onAction: expect.any(Function) as Function,
      },
    });
  });

  it('returns an empty props object when content is null', () => {
    const output = getContentProps(
      null as unknown as MessageContent,
      onMessageAction,
      onActionCallback
    );
    expect(output).toStrictEqual({});
  });
});

describe('getActionHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('behaves as expected in the happy path', () => {
    const actionHandler = getActionHandler(
      { ...secondaryButton },
      onMessageAction,
      onActionCallback
    );

    actionHandler.onAction();

    expect(onMessageAction).toHaveBeenCalledTimes(1);
    expect(onActionCallback).toHaveBeenCalledTimes(1);
  });

  it('behaves as expected when handleAction results in an error', () => {
    const error = 'ERROR';

    onMessageAction.mockImplementationOnce(() => {
      throw new Error(error);
    });

    const actionHandler = getActionHandler(
      { ...secondaryButton },
      onMessageAction,
      onActionCallback
    );

    actionHandler.onAction();

    expect(onMessageAction).toHaveBeenCalledTimes(1);
    expect(errorSpy).toHaveBeenCalledTimes(1);
    expect(errorSpy).toHaveBeenCalledWith(
      `Message action failure: Error: ${error}`
    );
    expect(onActionCallback).toHaveBeenCalledTimes(1);
  });
});
