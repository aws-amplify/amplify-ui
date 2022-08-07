import {
  InAppMessage,
  InAppMessageAction,
  InAppMessageButton,
  InAppMessageLayout,
} from '@aws-amplify/notifications';

export const LAYOUTS: InAppMessageLayout[] = [
  'BOTTOM_BANNER',
  'CAROUSEL',
  'FULL_SCREEN',
  'MIDDLE_BANNER',
  'MODAL',
  'TOP_BANNER',
];

const PORTRAIT_IMAGE =
  'https://images.unsplash.com/photo-1535392432937-a27c36ec07b5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80';
const LANDSCAPE_IMAGE =
  'https://images.unsplash.com/photo-1504858700536-882c978a3464?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=80';

const getButton = (
  action: InAppMessageAction,
  type: 'primary' | 'secondary'
): InAppMessageButton => ({
  title: `${type} - ${action.toLowerCase()} action`,
  action,
  url:
    action === 'LINK' || action === 'DEEP_LINK'
      ? 'https://ui.docs.amplify.aws/'
      : undefined,
});

export interface GetInAppMessageParams {
  hasHeader: boolean;
  hasImage: boolean;
  hasMessage: boolean;
  hasPrimaryButton: boolean;
  hasSecondaryButton: boolean;
  imageOrientation: 'landscape' | 'portrait';
  primaryButtonAction: InAppMessageAction;
  secondaryButtonAction: InAppMessageAction;
  layout: InAppMessageLayout;
}

export function getInAppMessage({
  hasHeader,
  hasImage,
  hasMessage,
  hasPrimaryButton,
  hasSecondaryButton,
  imageOrientation,
  layout,
  primaryButtonAction,
  secondaryButtonAction,
}: GetInAppMessageParams): InAppMessage {
  return {
    layout,
    id: layout,
    content: [
      {
        header: hasHeader ? { content: 'Example Header' } : undefined,
        body: hasMessage ? { content: 'Example Body' } : undefined,
        image: hasImage
          ? {
              src:
                imageOrientation === 'portrait'
                  ? PORTRAIT_IMAGE
                  : LANDSCAPE_IMAGE,
            }
          : undefined,
        primaryButton: hasPrimaryButton
          ? getButton(primaryButtonAction, 'primary')
          : undefined,
        secondaryButton:
          hasPrimaryButton && hasSecondaryButton
            ? getButton(secondaryButtonAction, 'secondary')
            : undefined,
      },
    ],
  };
}
