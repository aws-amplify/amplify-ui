Feature: AI Conversation

  Test AI Conversation component

  Background:
    Given I'm running the example "ui/components/ai/ai-conversation"

  @react
  Scenario: See conversation window
      When I type my "email" with status "CONFIRMED"
      Then I type my password
      Then I click the "Sign in" button
      Then I see "how are you?"
      Then I see "text-input" element
      Then I type "What is your name?"
      Then I click the send message button
      Then I see "Argh the time be round"

  @react
  Scenario: See conversation window and suggested prompts
      When I type my "email" with status "CONFIRMED"
      Then I type my password
      Then I click the "Sign in" button
      Then I see "how are you?"
      Then I click the "how are you?" prompt
      Then I see "how are you?" in the text input
      Then I click the send message button
      Then I see "Argh the time be round"

