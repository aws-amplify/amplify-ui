import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import * as UIModule from '@aws-amplify/ui';

import ChangePassword from '../ChangePassword';

const user = {} as unknown as UIModule.AmplifyUser;
jest.mock('../../../../internal', () => ({
  useAuth: () => ({
    user,
  }),
}));

const changePasswordSpy = jest.spyOn(UIModule, 'changePassword');

describe('ChangePassword', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders as expected', () => {
    const { container } = render(<ChangePassword />);
    expect(container).toMatchSnapshot();
  });

  it('calls changePassword with expected arguments', async () => {
    changePasswordSpy.mockResolvedValue('SUCCESS');

    const onSuccess = jest.fn();
    render(<ChangePassword onSuccess={onSuccess} />);

    const currentPassword = await screen.findByLabelText('Current Password');
    const newPassword = await screen.findByLabelText('New Password');
    const submitButton = await screen.findByRole('button', {
      name: 'Submit',
    });

    fireEvent.input(currentPassword, {
      target: { name: 'currentPassword', value: 'oldpassword' },
    });

    fireEvent.input(newPassword, {
      target: { name: 'newPassword', value: 'newpassword' },
    });

    fireEvent.submit(submitButton);

    expect(changePasswordSpy).toBeCalledWith({
      user,
      currentPassword: 'oldpassword',
      newPassword: 'newpassword',
    });
  });

  it('onSuccess is called after successful sign up', async () => {
    changePasswordSpy.mockResolvedValue('SUCCESS');

    const onSuccess = jest.fn();
    render(<ChangePassword onSuccess={onSuccess} />);

    const submitButton = await screen.findByRole('button', {
      name: 'Submit',
    });
    fireEvent.submit(submitButton);

    // submit handling is async, wait for onSuccess to be called
    await waitFor(() => expect(onSuccess).toBeCalledTimes(1));
  });

  it('onError is called after unsuccessful submit', async () => {
    changePasswordSpy.mockRejectedValue(new Error('Mock Error'));

    const onError = jest.fn();
    render(<ChangePassword onError={onError} />);

    const submitButton = await screen.findByRole('button', {
      name: 'Submit',
    });

    fireEvent.submit(submitButton);

    // submit handling is async, wait for onError to be called
    await waitFor(() => expect(onError).toBeCalledTimes(1));
  });
});
