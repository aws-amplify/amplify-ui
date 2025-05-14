import type { Modifiers, ComponentStyles, Elements } from './utils';

export type AIConversationTheme<Required extends boolean = false> =
  ComponentStyles &
    Elements<
      {
        message?: ComponentStyles &
          Modifiers<'user' | 'assistant' | 'bubble', Required>;
        message__list?: ComponentStyles;
        message__avatar?: ComponentStyles;
        message__sender?: ComponentStyles;
        message__sender__username?: ComponentStyles;
        message__sender__timestamp?: ComponentStyles;
        message__body?: ComponentStyles;
        message__actions?: ComponentStyles;

        form?: ComponentStyles;
        form__dropzone?: ComponentStyles;
        form__attatch?: ComponentStyles;
        form__send?: ComponentStyles;
        form_error?: ComponentStyles;
        form_field?: ComponentStyles;

        attachment?: ComponentStyles;
        attachment__list?: ComponentStyles;
        attachment__image?: ComponentStyles;
        attachment__size?: ComponentStyles;
        attachment__name?: ComponentStyles;
        attachment__remove?: ComponentStyles;
      },
      Required
    >;
