import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte';
import { writable } from 'svelte/store';
import SetupTotp from '../../../components/Authenticator/SetupTotp.svelte';
import * as useAuthenticatorModule from '../../../composables/useAuthenticator';
import { createMockAuthenticatorStore } from '../../utils/test-utils';

vi.mock('../../../composables/useAuthenticator');
vi.mock('qrcode', () => ({
  toDataURL: vi.fn().mockResolvedValue('data:image/png;base64,mockQRCode'),
}));

describe('SetupTotp', () => {
  let mockStore: any;
  let mockSubmitForm: ReturnType<typeof vi.fn>;
  let mockUpdateForm: ReturnType<typeof vi.fn>;
  let mockToSignIn: ReturnType<typeof vi.fn>;
  let mockSkipVerification: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockSubmitForm = vi.fn();
    mockUpdateForm = vi.fn();
    mockToSignIn = vi.fn();
    mockSkipVerification = vi.fn();
    
    mockStore = writable(createMockAuthenticatorStore({
      submitForm: mockSubmitForm,
      updateForm: mockUpdateForm,
      toSignIn: mockToSignIn,
      skipVerification: mockSkipVerification,
      totpSecretCode: 'JBSWY3DPEHPK3PXP',
      QRFields: {
        totpIssuer: 'AWSCognito',
        totpUsername: 'testuser',
      },
    }));
    
    vi.mocked(useAuthenticatorModule.useAuthenticatorStore).mockReturnValue(mockStore);
  });

  it('renders setup TOTP form', () => {
    const { getByText, getByLabelText, getByRole } = render(SetupTotp);
    
    expect(getByText('Setup Two-Factor Authentication')).toBeInTheDocument();
    expect(getByText('Scan the QR code below with your authenticator app')).toBeInTheDocument();
    expect(getByLabelText('Code')).toBeInTheDocument();
    expect(getByRole('button', { name: 'Confirm' })).toBeInTheDocument();
    expect(getByText('Back to Sign In')).toBeInTheDocument();
  });

  it('displays QR code', async () => {
    const { container } = render(SetupTotp);
    
    // Wait for QR code to be generated
    await vi.waitFor(() => {
      const qrCode = container.querySelector('img[alt="QR Code"]') as HTMLImageElement;
      expect(qrCode).toBeInTheDocument();
      expect(qrCode.src).toBe('data:image/png;base64,mockQRCode');
    });
  });

  it('shows secret code', () => {
    const { getByText } = render(SetupTotp);
    
    expect(getByText('Or enter this code in your authenticator app:')).toBeInTheDocument();
    expect(getByText('JBSWY3DPEHPK3PXP')).toBeInTheDocument();
  });

  it('allows copying secret code', async () => {
    // Mock clipboard API
    const mockWriteText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: { writeText: mockWriteText },
    });
    
    const { getByText } = render(SetupTotp);
    const copyButton = getByText('Copy');
    
    await fireEvent.click(copyButton);
    
    expect(mockWriteText).toHaveBeenCalledWith('JBSWY3DPEHPK3PXP');
    expect(getByText('Copied!')).toBeInTheDocument();
  });

  it('updates form on code input', async () => {
    const { getByLabelText } = render(SetupTotp);
    
    const codeInput = getByLabelText('Code') as HTMLInputElement;
    await fireEvent.input(codeInput, { target: { value: '123456' } });
    
    expect(mockUpdateForm).toHaveBeenCalledWith({ name: 'confirmation_code', value: '123456' });
  });

  it('submits form with TOTP code', async () => {
    const { getByLabelText, getByRole } = render(SetupTotp);
    
    const codeInput = getByLabelText('Code') as HTMLInputElement;
    const submitButton = getByRole('button', { name: 'Confirm' });
    
    await fireEvent.input(codeInput, { target: { value: '123456' } });
    await fireEvent.click(submitButton);
    
    expect(mockSubmitForm).toHaveBeenCalledWith({
      confirmation_code: '123456',
    });
  });

  it('prevents submission with empty code', () => {
    const { getByRole } = render(SetupTotp);
    const submitButton = getByRole('button', { name: 'Confirm' });
    
    expect(submitButton).toBeDisabled();
  });

  it('shows loading state when submitting', () => {
    mockStore.set(createMockAuthenticatorStore({
      isPending: true,
      submitForm: mockSubmitForm,
      updateForm: mockUpdateForm,
      toSignIn: mockToSignIn,
      skipVerification: mockSkipVerification,
      totpSecretCode: 'JBSWY3DPEHPK3PXP',
      QRFields: {
        totpIssuer: 'AWSCognito',
        totpUsername: 'testuser',
      },
    }));
    
    const { getByRole } = render(SetupTotp);
    const submitButton = getByRole('button', { name: 'Confirming...' });
    
    expect(submitButton).toBeDisabled();
  });

  it('displays error message', () => {
    mockStore.set(createMockAuthenticatorStore({
      error: 'Invalid TOTP code',
      submitForm: mockSubmitForm,
      updateForm: mockUpdateForm,
      toSignIn: mockToSignIn,
      skipVerification: mockSkipVerification,
      totpSecretCode: 'JBSWY3DPEHPK3PXP',
      QRFields: {
        totpIssuer: 'AWSCognito',
        totpUsername: 'testuser',
      },
    }));
    
    const { getByRole } = render(SetupTotp);
    const alert = getByRole('alert');
    
    expect(alert).toHaveTextContent('Invalid TOTP code');
  });

  it('navigates back to sign in', async () => {
    const { getByText } = render(SetupTotp);
    const backButton = getByText('Back to Sign In');
    
    await fireEvent.click(backButton);
    
    expect(mockToSignIn).toHaveBeenCalled();
  });

  it('shows skip button when skipVerification is available', () => {
    const { getByText } = render(SetupTotp);
    const skipButton = getByText('Skip for now');
    
    expect(skipButton).toBeInTheDocument();
  });

  it('handles skip verification', async () => {
    const { getByText } = render(SetupTotp);
    const skipButton = getByText('Skip for now');
    
    await fireEvent.click(skipButton);
    
    expect(mockSkipVerification).toHaveBeenCalled();
  });

  it('disables skip button when pending', () => {
    mockStore.set(createMockAuthenticatorStore({
      isPending: true,
      submitForm: mockSubmitForm,
      updateForm: mockUpdateForm,
      toSignIn: mockToSignIn,
      skipVerification: mockSkipVerification,
      totpSecretCode: 'JBSWY3DPEHPK3PXP',
      QRFields: {
        totpIssuer: 'AWSCognito',
        totpUsername: 'testuser',
      },
    }));
    
    const { getByText } = render(SetupTotp);
    const skipButton = getByText('Skip for now');
    
    expect(skipButton).toBeDisabled();
  });

  it('handles missing QR fields gracefully', () => {
    mockStore.set(createMockAuthenticatorStore({
      submitForm: mockSubmitForm,
      updateForm: mockUpdateForm,
      toSignIn: mockToSignIn,
      skipVerification: mockSkipVerification,
      totpSecretCode: 'JBSWY3DPEHPK3PXP',
      QRFields: null,
    }));
    
    const { container } = render(SetupTotp);
    const qrCode = container.querySelector('img[alt="QR Code"]');
    
    // Should still render but without QR code
    expect(qrCode).not.toBeInTheDocument();
  });

  it('clears form on mount', () => {
    const { getByLabelText } = render(SetupTotp);
    const codeInput = getByLabelText('Code') as HTMLInputElement;
    
    expect(codeInput.value).toBe('');
  });
});