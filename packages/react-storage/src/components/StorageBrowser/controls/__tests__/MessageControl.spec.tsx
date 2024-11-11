import React from 'react';
import { render, screen } from '@testing-library/react';
import { MessageControl } from '../MessageControl';
import * as UseMessageModule from '../hooks/useMessage';

const useMessageSpy = jest.spyOn(UseMessageModule, 'useMessage');

const content = 'Jello world!';
const onDismiss = jest.fn();
const type = 'warning';

describe('MessageControl', () => {
  beforeEach(() => {
    useMessageSpy.mockClear();
  });

  it('renders', () => {
    useMessageSpy.mockReturnValue({ content, onDismiss, type });

    render(<MessageControl />);

    const messageContent = screen.getByText(content);

    expect(messageContent).toBeInTheDocument();
  });
});
