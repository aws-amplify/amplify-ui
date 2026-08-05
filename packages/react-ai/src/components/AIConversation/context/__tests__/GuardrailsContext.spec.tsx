// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { render, screen } from '@testing-library/react';
import { GuardrailsContext, GuardrailsProvider } from '../GuardrailsContext';
import type { GuardrailConfiguration } from '../../../../types';

const TestConsumer = () => {
  const guardrails = React.useContext(GuardrailsContext);
  if (!guardrails) return <div data-testid="no-guardrails">none</div>;
  return (
    <div data-testid="guardrails">
      <span data-testid="id">{guardrails.guardrailIdentifier}</span>
      <span data-testid="version">{guardrails.guardrailVersion}</span>
      {guardrails.trace && <span data-testid="trace">{guardrails.trace}</span>}
    </div>
  );
};

describe('GuardrailsContext', () => {
  it('provides undefined by default', () => {
    render(<TestConsumer />);
    expect(screen.getByTestId('no-guardrails')).toBeInTheDocument();
  });

  it('provides guardrail configuration to children', () => {
    const config: GuardrailConfiguration = {
      guardrailIdentifier: 'gr-abc123',
      guardrailVersion: '1',
    };
    render(
      <GuardrailsProvider guardrails={config}>
        <TestConsumer />
      </GuardrailsProvider>
    );
    expect(screen.getByTestId('id')).toHaveTextContent('gr-abc123');
    expect(screen.getByTestId('version')).toHaveTextContent('1');
    expect(screen.queryByTestId('trace')).not.toBeInTheDocument();
  });

  it('provides trace mode when specified', () => {
    const config: GuardrailConfiguration = {
      guardrailIdentifier: 'gr-def456',
      guardrailVersion: 'DRAFT',
      trace: 'enabled',
    };
    render(
      <GuardrailsProvider guardrails={config}>
        <TestConsumer />
      </GuardrailsProvider>
    );
    expect(screen.getByTestId('id')).toHaveTextContent('gr-def456');
    expect(screen.getByTestId('version')).toHaveTextContent('DRAFT');
    expect(screen.getByTestId('trace')).toHaveTextContent('enabled');
  });

  it('renders nothing for guardrails when guardrails prop is undefined', () => {
    render(
      <GuardrailsProvider guardrails={undefined}>
        <TestConsumer />
      </GuardrailsProvider>
    );
    expect(screen.getByTestId('no-guardrails')).toBeInTheDocument();
  });
});
