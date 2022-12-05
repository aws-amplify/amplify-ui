import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import * as UIModule from '@aws-amplify/ui';

import { Button, Flex, Heading, Text } from '../../../../primitives';
import { ComponentClassName } from '../../constants';
import { DeleteUserComponents } from '../types';
import DeleteUser from '../DeleteUser';

const user = {} as unknown as UIModule.AmplifyUser;
jest.mock('../../../../internal', () => ({
  useAuth: () => ({
    user,
    isLoading: false,
  }),
}));

const deleteUserSpy = jest.spyOn(UIModule, 'deleteUser');

function CustomWarningView({ onCancel, onConfirm }) {
  return (
    <Flex direction="column">
      <Text variation="warning">Custom Warning Message</Text>
      <Button onClick={onCancel}>Back</Button>
      <Button variation="primary" onClick={onConfirm}>
        Custom Confirm Button
      </Button>
    </Flex>
  );
}

const CustomDeleteButton = ({ onClick, isDisabled }) => {
  return (
    <Button isDisabled={isDisabled} onClick={onClick}>
      Custom Delete Button
    </Button>
  );
};

const CustomErrorMessage = ({ children }) => (
  <>
    <Heading>Custom Error Message</Heading>
    <Text>{children}</Text>
  </>
);

const components: DeleteUserComponents = {
  DeleteButton: CustomDeleteButton,
  WarningView: CustomWarningView,
  ErrorMessage: CustomErrorMessage,
};

describe('DeleteUser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders as expected', () => {
    const { container } = render(<DeleteUser />);
    expect(container).toMatchSnapshot();

    const deleteUser = container.getElementsByClassName(
      ComponentClassName.DeleteUser
    );
    expect(deleteUser).toHaveLength(1);
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

    expect(await screen.findByText('Mock Error')).toBeDefined();
  });

  it('renders as expected with components overrides', async () => {
    const { container } = render(<DeleteUser components={components} />);

    const submitButton = await screen.findByRole('button', {
      name: 'Custom Delete Button',
    });

    expect(submitButton).toBeDefined();
    expect(container).toMatchSnapshot();

    fireEvent.click(submitButton);

    expect(await screen.findByText('Custom Warning Message')).toBeDefined();
  });

  it('onSuccess is called with component overrides after successful user deletion', async () => {
    deleteUserSpy.mockResolvedValue();

    const onSuccess = jest.fn();
    render(<DeleteUser components={components} onSuccess={onSuccess} />);

    const deleteAccountButton = await screen.findByRole('button', {
      name: 'Custom Delete Button',
    });

    fireEvent.click(deleteAccountButton);

    const confirmDeleteButton = await screen.findByRole('button', {
      name: 'Custom Confirm Button',
    });

    fireEvent.click(confirmDeleteButton);

    // submit handling is async, wait for onSuccess to be called
    // https://testing-library.com/docs/dom-testing-library/api-async/#waitfor
    await waitFor(() => expect(onSuccess).toBeCalledTimes(1));
  });

  it('calls deleteUser with expected arguments and component overrides', async () => {
    deleteUserSpy.mockResolvedValue();

    const onSuccess = jest.fn();
    render(<DeleteUser components={components} onSuccess={onSuccess} />);

    const deleteAccountButton = await screen.findByRole('button', {
      name: 'Custom Delete Button',
    });

    fireEvent.click(deleteAccountButton);

    const confirmDeleteButton = await screen.findByRole('button', {
      name: 'Custom Confirm Button',
    });

    fireEvent.click(confirmDeleteButton);

    expect(deleteUserSpy).toBeCalledWith();
    expect(deleteUserSpy).toBeCalledTimes(1);
  });

  it('error message is displayed with component overrides after unsuccessful submit', async () => {
    deleteUserSpy.mockRejectedValue(new Error('Mock Error'));

    render(<DeleteUser components={components} />);

    const deleteAccountButton = await screen.findByRole('button', {
      name: 'Custom Delete Button',
    });

    fireEvent.click(deleteAccountButton);

    const confirmDeleteButton = await screen.findByRole('button', {
      name: 'Custom Confirm Button',
    });

    fireEvent.click(confirmDeleteButton);

    await screen.findByText('Mock Error');

    expect(await screen.findByText('Custom Error Message')).toBeDefined();
  });
});
