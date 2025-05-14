import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { ActionsBarControl } from '../ActionsBarControl';
import { ActionsProvider } from '../../../context/ActionsContext';
import { ConversationMessage } from '../../../../../types';
import { CustomAction } from '../../../types';

const message: ConversationMessage = {
  conversationId: 'foobar',
  id: '1',
  content: [{ text: 'I am your virtual assistant' }],
  role: 'assistant',
  createdAt: new Date(2023, 4, 21, 15, 23).toDateString(),
};

const customActions: CustomAction[] = [
  {
    component: (
      <svg
        aria-label="Heart"
        aria-hidden="true"
        data-testid="action-icon-Heart"
      >
        <path d="M13.22,2.984c-1.125,0-2.504,0.377-3.53,1.182C8.756,3.441,7.502,2.984,6.28,2.984c-2.6,0-4.714,2.116-4.714,4.716c0,0.32,0.032,0.644,0.098,0.96c0.799,4.202,6.781,7.792,7.46,8.188c0.193,0.111,0.41,0.168,0.627,0.168c0.187,0,0.376-0.041,0.55-0.127c0.011-0.006,1.349-0.689,2.91-1.865c0.021-0.016,0.043-0.031,0.061-0.043c0.021-0.016,0.045-0.033,0.064-0.053c3.012-2.309,4.6-4.805,4.6-7.229C17.935,5.1,15.819,2.984,13.22,2.984z M12.544,13.966c-0.004,0.004-0.018,0.014-0.021,0.018s-0.018,0.012-0.023,0.016c-1.423,1.076-2.674,1.734-2.749,1.771c0,0-6.146-3.576-6.866-7.363C2.837,8.178,2.811,7.942,2.811,7.7c0-1.917,1.554-3.47,3.469-3.47c1.302,0,2.836,0.736,3.431,1.794c0.577-1.121,2.161-1.794,3.509-1.794c1.914,0,3.469,1.553,3.469,3.47C16.688,10.249,14.474,12.495,12.544,13.966z" />
      </svg>
    ),
    handler: jest.fn(),
  },
  {
    component: (
      <svg aria-label="Star" aria-hidden="true" data-testid="action-icon-Star">
        <path d="M16.85,7.275l-3.967-0.577l-1.773-3.593c-0.208-0.423-0.639-0.69-1.11-0.69s-0.902,0.267-1.11,0.69L7.116,6.699L3.148,7.275c-0.466,0.068-0.854,0.394-1,0.842c-0.145,0.448-0.023,0.941,0.314,1.27l2.871,2.799l-0.677,3.951c-0.08,0.464,0.112,0.934,0.493,1.211c0.217,0.156,0.472,0.236,0.728,0.236c0.197,0,0.396-0.048,0.577-0.143l3.547-1.864l3.548,1.864c0.18,0.095,0.381,0.143,0.576,0.143c0.256,0,0.512-0.08,0.729-0.236c0.381-0.277,0.572-0.747,0.492-1.211l-0.678-3.951l2.871-2.799c0.338-0.329,0.459-0.821,0.314-1.27C17.705,7.669,17.316,7.343,16.85,7.275z M13.336,11.754l0.787,4.591l-4.124-2.167l-4.124,2.167l0.788-4.591L3.326,8.5l4.612-0.67l2.062-4.177l2.062,4.177l4.613,0.67L13.336,11.754z" />
      </svg>
    ),
    handler: jest.fn(),
  },
];

describe('AvatarControl', () => {
  it('renders an ActionsBarControl element', () => {
    const result = render(<ActionsBarControl message={message} />);

    expect(result.container).toBeDefined();
  });

  it('renders an ActionsBarControl element with action buttons', () => {
    render(
      <ActionsProvider actions={customActions}>
        <ActionsBarControl message={message} />
      </ActionsProvider>
    );

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(2);

    const heartButton = buttons[0];
    const starButton = buttons[1];

    expect(heartButton).toBeInTheDocument();
    expect(starButton).toBeInTheDocument();

    const heartIcon = heartButton.querySelector('svg');
    const starIcon = starButton.querySelector('svg');

    expect(heartIcon).toBeInTheDocument();
    expect(starIcon).toBeInTheDocument();
  });

  it('invokes the click handler on button click', () => {
    render(
      <ActionsProvider actions={customActions}>
        <ActionsBarControl message={message} />
      </ActionsProvider>
    );

    const buttons = screen.getAllByRole('button');

    expect(buttons[0]).toBeInTheDocument();
    fireEvent.click(buttons[0]);
    expect(customActions[0].handler).toHaveBeenCalled();
    expect(customActions[0].handler).toHaveBeenCalledWith(message);
  });

  it('renders buttons with the correct accessibility attributes', () => {
    render(
      <ActionsProvider actions={customActions}>
        <ActionsBarControl message={message} />
      </ActionsProvider>
    );
    const heartIcon = screen.getByTestId('action-icon-Heart');
    const starIcon = screen.getByTestId('action-icon-Star');
    expect(heartIcon).toHaveAttribute('aria-label', 'Heart');
    expect(starIcon).toHaveAttribute('aria-label', 'Star');
    expect(heartIcon).toHaveAttribute('aria-hidden', 'true');
    expect(starIcon).toHaveAttribute('aria-hidden', 'true');
  });
});
