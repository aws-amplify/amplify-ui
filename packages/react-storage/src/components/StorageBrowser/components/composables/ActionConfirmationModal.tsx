import React from 'react';

import {
  ButtonElement,
  ViewElement,
  HeadingElement,
  TextElement,
} from '../elements';

export interface ActionConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  content?: React.ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
  confirmLabel: string;
  cancelLabel: string;
}

export const ActionConfirmationModal = ({
  isOpen = false,
  title,
  message,
  content,
  onConfirm,
  onCancel,
  confirmLabel,
  cancelLabel,
}: ActionConfirmationModalProps): React.JSX.Element | null => {
  const modalRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      onCancel?.();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      className="amplify-modal__overlay"
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
      onKeyDown={handleKeyDown}
      onClick={(e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
          onCancel?.();
        }
      }}
    >
      <ViewElement className="amplify-modal__content" role="document">
        <HeadingElement className="amplify-modal__title">
          {title}
        </HeadingElement>
        {message && (
          <TextElement className="amplify-modal__body">{message}</TextElement>
        )}
        {content && (
          <ViewElement className="amplify-modal__body">{content}</ViewElement>
        )}
        <ViewElement className="amplify-modal__footer">
          <ButtonElement
            className="amplify-modal__cancel"
            onClick={onCancel}
            variant="cancel"
          >
            {cancelLabel}
          </ButtonElement>
          <ButtonElement
            className="amplify-modal__confirm"
            onClick={onConfirm}
            variant="primary"
          >
            {confirmLabel}
          </ButtonElement>
        </ViewElement>
      </ViewElement>
    </div>
  );
};
