import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
  BLOCK_CLASS,
  BODY_TEXT_TEST_ID,
  BUTTON_CLASS,
  CONTENT_CLASS,
  CONTENT_TEST_ID,
  HEADER_TEXT_TEST_ID,
  IMAGE_CONTAINER_CLASS,
  IMAGE_CONTAINER_TEST_ID,
  MESSAGE_LAYOUT_TEST_ID,
  TEXT_CONTAINER_CLASS,
  TEXT_CONTAINER_TEST_ID,
} from '../constants';
import { MessageLayout } from '../MessageLayout';
import { MessageLayoutProps } from '../types';
import { getButtonModifier } from '../utils';

jest.mock('../utils');

const mockOnClose = jest.fn();
const mockPrimaryButtonOnAction = jest.fn();
const mockSecondaryButtonOnAction = jest.fn();

const BODY_CONTENT = 'body content';
const DARK_BACKGROUND_COLOR = 'black';
const HEADER_CONTENT = 'header content';
const IMAGE_SRC = 'http://image.url';
const LIGHT_BACKGROUND_COLOR = 'white';
const PRIMARY_BUTTON = 'primary button';
const SECONDARY_BUTTON = 'secondary button';
const STYLES = {
  body: { backgroundColor: '#001' },
  closeIconButton: { backgroundColor: '#002' },
  container: { backgroundColor: '#003' },
  header: { backgroundColor: '#004' },
  image: { backgroundColor: '#005' },
  primaryButton: { backgroundColor: DARK_BACKGROUND_COLOR },
  secondaryButton: { backgroundColor: LIGHT_BACKGROUND_COLOR },
};
const TEST_PROPS: MessageLayoutProps = {
  body: { content: BODY_CONTENT },
  hasButtons: false,
  hasPrimaryButton: false,
  hasRenderableImage: false,
  hasSecondaryButton: false,
  header: { content: HEADER_CONTENT },
  image: { src: IMAGE_SRC },
  layout: 'TOP_BANNER',
  onClose: mockOnClose,
  primaryButton: {
    title: PRIMARY_BUTTON,
    onAction: mockPrimaryButtonOnAction,
  },
  secondaryButton: {
    title: SECONDARY_BUTTON,
    onAction: mockSecondaryButtonOnAction,
  },
  styles: STYLES,
};

describe('MessageLayout component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render', () => {
    render(<MessageLayout {...TEST_PROPS} />);

    const buttons = screen.queryAllByRole('button');
    const body = screen.queryByText(BODY_CONTENT);
    const header = screen.queryByText(HEADER_CONTENT);
    const imageContainer = screen.queryByTestId(IMAGE_CONTAINER_TEST_ID);
    const messageLayout = screen.queryByTestId(MESSAGE_LAYOUT_TEST_ID);
    const textContainer = screen.queryByTestId(TEXT_CONTAINER_TEST_ID);
    expect(body).toBeInTheDocument();
    expect(buttons).toHaveLength(1); // only close button
    expect(header).toBeInTheDocument();
    expect(imageContainer).not.toBeInTheDocument();
    expect(messageLayout).toBeInTheDocument();
    expect(textContainer).toBeInTheDocument();
    expect(messageLayout).toHaveClass(BLOCK_CLASS);
  });

  it('should render with an image', () => {
    render(<MessageLayout {...TEST_PROPS} hasRenderableImage />);

    const image = screen.queryByRole('img');
    const imageContainer = screen.queryByTestId(IMAGE_CONTAINER_TEST_ID);
    expect(imageContainer).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', IMAGE_SRC);
  });

  it('should be vertical orientation by default', () => {
    render(<MessageLayout {...TEST_PROPS} hasRenderableImage />);

    const content = screen.getByTestId(CONTENT_TEST_ID);
    const imageContainer = screen.getByTestId(IMAGE_CONTAINER_TEST_ID);
    const textContainer = screen.getByTestId(TEXT_CONTAINER_TEST_ID);
    expect(content).toHaveClass(`${CONTENT_CLASS}--vertical`);
    expect(imageContainer).toHaveClass(`${IMAGE_CONTAINER_CLASS}--vertical`);
    expect(textContainer).toHaveClass(`${TEXT_CONTAINER_CLASS}--vertical`);
  });

  it('should allow horizontal orientation', () => {
    render(
      <MessageLayout
        {...TEST_PROPS}
        hasRenderableImage
        orientation="horizontal"
      />
    );

    const content = screen.getByTestId(CONTENT_TEST_ID);
    const imageContainer = screen.getByTestId(IMAGE_CONTAINER_TEST_ID);
    const textContainer = screen.getByTestId(TEXT_CONTAINER_TEST_ID);
    expect(content).toHaveClass(`${CONTENT_CLASS}--horizontal`);
    expect(imageContainer).toHaveClass(`${IMAGE_CONTAINER_CLASS}--horizontal`);
    expect(textContainer).toHaveClass(`${TEXT_CONTAINER_CLASS}--horizontal`);
  });

  it('should trigger onClose function', () => {
    render(<MessageLayout {...TEST_PROPS} />);

    const closeButton = screen.getByRole('button');
    userEvent.click(closeButton);
    expect(mockOnClose).toBeCalled();
  });

  it('should render a primary button', () => {
    render(<MessageLayout {...TEST_PROPS} hasButtons hasPrimaryButton />);

    const primaryButton = screen.queryByText(PRIMARY_BUTTON);
    expect(primaryButton).toBeInTheDocument();
  });

  it('should render a secondary button', () => {
    render(
      <MessageLayout
        {...TEST_PROPS}
        hasButtons
        hasPrimaryButton
        hasSecondaryButton
      />
    );

    const primaryButton = screen.queryByText(PRIMARY_BUTTON);
    const secondaryButton = screen.queryByText(SECONDARY_BUTTON);
    expect(primaryButton).toBeInTheDocument();
    expect(secondaryButton).toBeInTheDocument();
  });

  it('should apply the correct button modifiers', () => {
    (getButtonModifier as jest.Mock).mockImplementation(({ backgroundColor }) =>
      backgroundColor === DARK_BACKGROUND_COLOR ? 'dark' : 'light'
    );
    render(
      <MessageLayout
        {...TEST_PROPS}
        hasButtons
        hasPrimaryButton
        hasSecondaryButton
      />
    );

    const primaryButton = screen.getByText(PRIMARY_BUTTON);
    const secondaryButton = screen.getByText(SECONDARY_BUTTON);
    expect(primaryButton).toHaveClass(`${BUTTON_CLASS}--dark`);
    expect(secondaryButton).toHaveClass(`${BUTTON_CLASS}--light`);
  });

  it('should trigger the button onAction functions', () => {
    render(
      <MessageLayout
        {...TEST_PROPS}
        hasButtons
        hasPrimaryButton
        hasSecondaryButton
      />
    );

    const primaryButton = screen.getByText(PRIMARY_BUTTON);
    const secondaryButton = screen.getByText(SECONDARY_BUTTON);
    userEvent.click(primaryButton);
    expect(mockPrimaryButtonOnAction).toBeCalled();
    expect(mockSecondaryButtonOnAction).not.toBeCalled();
    userEvent.click(secondaryButton);
    expect(mockSecondaryButtonOnAction).toBeCalled();
  });

  it('should apply additional styles to components', () => {
    render(
      <MessageLayout
        {...TEST_PROPS}
        hasButtons
        hasPrimaryButton
        hasRenderableImage
        hasSecondaryButton
      />
    );
    const [closeButton, secondaryButton, primaryButton] =
      screen.getAllByRole('button');
    const body = screen.getByText(BODY_CONTENT);
    const header = screen.getByText(HEADER_CONTENT);
    const image = screen.getByRole('img');
    const messageLayout = screen.getByTestId(MESSAGE_LAYOUT_TEST_ID);
    expect(body).toHaveStyle(STYLES.body);
    expect(closeButton).toHaveStyle(STYLES.closeIconButton);
    expect(header).toHaveStyle(STYLES.header);
    expect(image).toHaveStyle(STYLES.image);
    expect(messageLayout).toHaveStyle(STYLES.container);
    expect(primaryButton).toHaveStyle(STYLES.primaryButton);
    expect(secondaryButton).toHaveStyle(STYLES.secondaryButton);
  });

  it('does not render header text if header content is missing', () => {
    const { queryByTestId } = render(
      <MessageLayout {...{ ...TEST_PROPS, header: undefined }} />
    );

    const headerText = queryByTestId(HEADER_TEXT_TEST_ID);

    expect(headerText).toBeNull();
  });

  it('does not render body text if body content is missing', () => {
    const { queryByTestId } = render(
      <MessageLayout {...{ ...TEST_PROPS, body: undefined }} />
    );

    const bodyText = queryByTestId(BODY_TEXT_TEST_ID);

    expect(bodyText).toBeNull();
  });
});
