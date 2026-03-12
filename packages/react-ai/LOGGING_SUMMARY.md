# Amplify UI React AI - Comprehensive Logging Added

## Overview
Added comprehensive logging throughout the Amplify UI React AI package to debug the streaming issue described in GitHub issue #6234. All logs use consistent prefixes and include contextual information.

## Log Prefixes Used

- `[AMPLIFY-AI-CONVERSATION]` - Main conversation hook lifecycle
- `[AMPLIFY-AI-STREAM]` - WebSocket streaming events
- `[AMPLIFY-AI-SEND]` - Message sending operations
- `[AMPLIFY-AI-CONTENT]` - Content processing from stream events
- `[AMPLIFY-AI-COMPONENT]` - UI component rendering
- `[AMPLIFY-AI-MESSAGELIST]` - Message list rendering
- `[AMPLIFY-AI-MESSAGE]` - Individual message rendering

## Files Modified

### 1. `/src/hooks/useAIConversation.tsx`
**Added logging for:**
- Conversation initialization (create/get)
- API responses and errors
- Stream event processing
- Content block management
- State updates during streaming
- Send message operations
- WebSocket subscription lifecycle

**Key logs:**
- 🚀 Initialize effect started
- 📡 Conversation API calls
- 📨 Stream event received
- 🔄 State updates
- ✅ Completion events
- ❌ Error conditions

### 2. `/src/hooks/contentFromEvents.ts`
**Added logging for:**
- Content block processing
- Text assembly from stream events
- Tool use handling
- Performance metrics

**Key logs:**
- 🔄 Processing content from events
- 📝 Text block processing
- 🔧 Tool use detection

### 3. `/src/components/AIConversation/AIConversation.tsx`
**Added logging for:**
- Component render cycles
- Props processing
- Scroll behavior

**Key logs:**
- 🎨 Component render
- 📜 Scroll props calculation

### 4. `/src/components/AIConversation/views/default/MessageList.tsx`
**Added logging for:**
- Message filtering and rendering
- Loading states
- Individual message details

**Key logs:**
- 📋 MessageList render
- 🔍 Message filtering
- 💬 Individual message rendering

## ESLint Configuration
Added `/* eslint-disable no-console */` to all modified files to prevent linting errors for console.log statements.

## Usage for Debugging

### 1. **Stream Monitoring**
Look for `[AMPLIFY-AI-STREAM]` logs to track:
- When stream events are received
- Content block assembly
- Stream completion/termination

### 2. **UI Update Tracking**
Monitor `[AMPLIFY-AI-MESSAGELIST]` and `[AMPLIFY-AI-MESSAGE]` logs to see:
- When components re-render
- Message content changes
- Loading state transitions

### 3. **Performance Analysis**
Use timestamps in logs to identify:
- Delays between stream events and UI updates
- Bottlenecks in content processing
- State update frequency

### 4. **Bug Reproduction**
For the Nova streaming bug:
1. Watch for stream events continuing after UI stops updating
2. Check if content length keeps growing in logs while UI freezes
3. Monitor state update frequency during long responses

## Example Log Output
```
[AMPLIFY-AI-CONVERSATION] 🚀 Initialize effect started {routeName: "chat", conversationId: undefined, ...}
[AMPLIFY-AI-STREAM] 📨 Stream event received {eventType: "contentDelta", contentBlockIndex: 0, ...}
[AMPLIFY-AI-CONTENT] 🔄 Processing content from events {blockCount: 1, totalEvents: 15, ...}
[AMPLIFY-AI-MESSAGELIST] 📋 MessageList render {totalMessages: 2, isLoading: false, ...}
```

This comprehensive logging system will help identify exactly where the streaming bug occurs in the Nova model scenario.
