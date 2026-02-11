import { useActionConfirmationModal } from '../useActionConfirmationModal';
import { useControlsContext } from '../../context';

jest.mock('../../context');

describe('useActionConfirmationModal', () => {
  const mockUseControlsContext = jest.mocked(useControlsContext);

  beforeEach(() => {
    mockUseControlsContext.mockReturnValue({
      data: {
        //@ts-expect-error - partial context for testing
        confirmationModal: {
          isOpen: false,
        },
      },
      onConfirmationModalConfirm: jest.fn(),
      onConfirmationModalCancel: jest.fn(),
    });
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
    });

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
          confirmLabel: 'Confirm',
          cancelLabel: 'Cancel',
        },
      },
      onConfirmationModalConfirm: jest.fn(),
      onConfirmationModalCancel: jest.fn(),
    });

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
