// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import type { GuardrailConfiguration } from '../../../types';

/**
 * Context that holds the optional Amazon Bedrock Guardrail configuration
 * for the current conversation. When set, the guardrail will be applied
 * to every message sent in the conversation.
 */
export const GuardrailsContext = React.createContext<
  GuardrailConfiguration | undefined
>(undefined);

export const GuardrailsProvider = ({
  children,
  guardrails,
}: {
  children?: React.ReactNode;
  guardrails?: GuardrailConfiguration;
}): React.JSX.Element => {
  return (
    <GuardrailsContext.Provider value={guardrails}>
      {children}
    </GuardrailsContext.Provider>
  );
};
