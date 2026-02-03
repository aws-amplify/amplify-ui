import { useActionConfirmationModal } from '../useActionConfirmationModal';
import { useControlsContext } from '../../context';
import type { ControlsContext } from '../../types';

jest.mock('../../context');

describe('useActionConfirmationModal', () => {
  const mockUseControlsContext = jest.mocked(useControlsContext);

  beforeEach(() => {
    mockUseControlsContext.mockReturnValue({
      data: { confirmationModal: {} },
      onConfirmationModalConfirm: jest.fn(),
      onConfirmationModalCancel: jest.fn(),
    } satisfies Partial<ControlsContext>);
  });

  it('returns default props', () => {
    const result = useActionConfirmationModal();

    expect(result).toEqual({
      isOpen: false,
      title: 'Confirm Action',
      message: '',
      confirmLabel: 'Confirm',
      cancelLabel: 'Cancel',
      onConfirm: expect.any(Function),
      onCancel: expect.any(Function),
    });
  });

  it('handles undefined confirmationModal', () => {
    mockUseControlsContext.mockReturnValue({
      data: {},
      onConfirmationModalConfirm: jest.fn(),
      onConfirmationModalCancel: jest.fn(),
    } satisfies Partial<ControlsContext>);

    const result = useActionConfirmationModal();

    expect(result).toEqual({
      isOpen: false,
      title: 'Confirm Action',
      message: '',
      confirmLabel: 'Confirm',
      cancelLabel: 'Cancel',
      onConfirm: expect.any(Function),
      onCancel: expect.any(Function),
    });
  });

  it('merges custom confirmation modal data', () => {
    mockUseControlsContext.mockReturnValue({
      data: {
        confirmationModal: {
          isOpen: true,
          title: 'Custom Title',
          message: 'Custom message',
        },
      },
      onConfirmationModalConfirm: jest.fn(),
      onConfirmationModalCancel: jest.fn(),
    } satisfies Partial<ControlsContext>);

    const result = useActionConfirmationModal();

    expect(result).toEqual({
      isOpen: true,
      title: 'Custom Title',
      message: 'Custom message',
      confirmLabel: 'Confirm',
      cancelLabel: 'Cancel',
      onConfirm: expect.any(Function),
      onCancel: expect.any(Function),
    });
  });
});
