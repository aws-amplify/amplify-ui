import React from 'react';

import { STORAGE_BROWSER_BLOCK } from '../base';
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
  title = 'Confirm Action',
  message = '',
  content,
  onConfirm,
  onCancel,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
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
      className={`${STORAGE_BROWSER_BLOCK}__modal-overlay`}
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
      <ViewElement
        className={`${STORAGE_BROWSER_BLOCK}__modal`}
        role="document"
      >
        <HeadingElement className={`${STORAGE_BROWSER_BLOCK}__modal-title`}>
          {title}
        </HeadingElement>
        {message && (
          <TextElement className={`${STORAGE_BROWSER_BLOCK}__modal-message`}>
            {message}
          </TextElement>
        )}
        {content && (
          <ViewElement className={`${STORAGE_BROWSER_BLOCK}__modal-content`}>
            {content}
          </ViewElement>
        )}
        <ViewElement className={`${STORAGE_BROWSER_BLOCK}__modal-actions`}>
          <ButtonElement
            className={`${STORAGE_BROWSER_BLOCK}__modal-cancel`}
            onClick={onCancel}
            variant="cancel"
          >
            {cancelLabel}
          </ButtonElement>
          <ButtonElement
            className={`${STORAGE_BROWSER_BLOCK}__modal-confirm`}
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
