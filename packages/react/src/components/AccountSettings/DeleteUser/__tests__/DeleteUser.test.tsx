import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import * as UIModule from '@aws-amplify/ui';

import DeleteUser from '../DeleteUser';

const user = {} as unknown as UIModule.AmplifyUser;
jest.mock('../../../../internal', () => ({
  useAuth: () => ({
    user,
    isLoading: false,
  }),
}));

const deleteUserSpy = jest.spyOn(UIModule, 'deleteUser');

describe('ChangePassword', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders as expected', () => {
    const { container } = render(<DeleteUser />);
    expect(container).toMatchSnapshot();
  });

  it('calls deleteUser with expected arguments', async () => {
    deleteUserSpy.mockResolvedValue();

    const onSuccess = jest.fn();
    render(<DeleteUser onSuccess={onSuccess} />);

    const deleteAccountButton = await screen.findByRole('button', {
      name: 'Delete Account',
    });

    fireEvent.click(deleteAccountButton);

    const confirmDeleteButton = await screen.findByRole('button', {
      name: 'Delete my account',
    });

    fireEvent.click(confirmDeleteButton);

    expect(deleteUserSpy).toBeCalledTimes(1);
  });

  it('onSuccess is called after successful account deletion', async () => {
    deleteUserSpy.mockResolvedValue();

    const onSuccess = jest.fn();
    render(<DeleteUser onSuccess={onSuccess} />);

    const deleteAccountButton = await screen.findByRole('button', {
      name: 'Delete Account',
    });

    fireEvent.click(deleteAccountButton);

    const confirmDeleteButton = await screen.findByRole('button', {
      name: 'Delete my account',
    });

    fireEvent.click(confirmDeleteButton);

    // submit handling is async, wait for onSuccess to be called
    // https://testing-library.com/docs/dom-testing-library/api-async/#waitfor
    await waitFor(() => expect(onSuccess).toBeCalledTimes(1));
  });

  it('onError is called after unsuccessful submit', async () => {
    deleteUserSpy.mockRejectedValue(new Error('Mock Error'));

    const onError = jest.fn();
    render(<DeleteUser onError={onError} />);

    const deleteAccountButton = await screen.findByRole('button', {
      name: 'Delete Account',
    });

    fireEvent.click(deleteAccountButton);

    const confirmDeleteButton = await screen.findByRole('button', {
      name: 'Delete my account',
    });

    fireEvent.click(confirmDeleteButton);

    // submit handling is async, wait for onError to be called
    await waitFor(() => expect(onError).toBeCalledTimes(1));
  });

  it('hides warning component if cancel is clicked', async () => {
    deleteUserSpy.mockResolvedValue();

    render(<DeleteUser />);

    const deleteAccountButton = await screen.findByRole('button', {
      name: 'Delete Account',
    });
    fireEvent.click(deleteAccountButton);

    // warning window now should be visible
    await screen.findByText('Delete my account');

    const cancelButton = await screen.findByRole('button', {
      name: 'Cancel',
    });
    fireEvent.click(cancelButton);

    // warning window should be gone now
    await waitFor(() =>
      expect(screen.queryByText('Delete my account')).not.toBeInTheDocument()
    );
  });

  it('error message is displayed after unsuccessful submit', async () => {
    deleteUserSpy.mockRejectedValue(new Error('Mock Error'));

    const onError = jest.fn();
    render(<DeleteUser onError={onError} />);

    const deleteAccountButton = await screen.findByRole('button', {
      name: 'Delete Account',
    });

    fireEvent.click(deleteAccountButton);

    const confirmDeleteButton = await screen.findByRole('button', {
      name: 'Delete my account',
    });

    fireEvent.click(confirmDeleteButton);

    // submit handling is async, wait for error to be displayed
    await waitFor(() => expect(screen.findByText('Mock Error')).toBeDefined());
  });
});
