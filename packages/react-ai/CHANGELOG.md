# @aws-amplify/ui-react-ai

## 0.4.0

### Minor Changes

- [#5924](https://github.com/aws-amplify/amplify-ui/pull/5924) [`d65cea0d0`](https://github.com/aws-amplify/amplify-ui/commit/d65cea0d0475aacb4ea0ac9c83278a62356f6421) Thanks [@dbanksdesign](https://github.com/dbanksdesign)! - The AIConversation component is now composable if you are using the default component or the headless component using `createAIConversation()`. There are 4 parts:

  - Provider: provides all the necessary data/handlers for the composable components
  - Messages: the message history for the conversation
  - DefaultMessage: contains an optional welcome message and prompt suggestions, only shown if no messages present
  - Form: the form for sending messages, includes the text input, submit button, and attachments

  ```jsx
  function Chat() {
    const [
      {
        data: { messages },
        isLoading,
      },
      sendMessage,
    ] = useAIConversation('pirateChat');

    return (
      <AIConversation.Provider
        messages={messages}
        handleSendMessage={sendMessage}
        isLoading={isLoading}
      >
        <Flex direction="row">
          <Card variation="outlined" width="50%" flex="1">
            <AIConversation.DefaultMessage />
            <AIConversation.Messages />
          </Card>
          <Card variation="outlined" width="50%" flex="1">
            <AIConversation.Form />
          </Card>
        </Flex>
      </AIConversation.Provider>
    );
  }
  ```

- [#5873](https://github.com/aws-amplify/amplify-ui/pull/5873) [`3a697ea5c`](https://github.com/aws-amplify/amplify-ui/commit/3a697ea5cdb81dd43988abbd2a336440713a8e31) Thanks [@dbanksdesign](https://github.com/dbanksdesign)! - feat(ai): add message renderer

  ```tsx
  <AIConversation
    messages={messages}
    handleSendMessage={sendMessage}
    isLoading={isLoading}
    messageRenderer={{
      text: ({ text }) => <ReactMarkdown>{text}</ReactMarkdown>,
    }}
  />
  ```

### Patch Changes

- [#5917](https://github.com/aws-amplify/amplify-ui/pull/5917) [`3655af2be`](https://github.com/aws-amplify/amplify-ui/commit/3655af2be54733d364e71d3c7f86f32d7bbcf811) Thanks [@dbanksdesign](https://github.com/dbanksdesign)! - chore(ai): adding UA string for AIConversation

- Updated dependencies [[`6fea94b89`](https://github.com/aws-amplify/amplify-ui/commit/6fea94b890d9d497a3f13e189ea0b52e8dcdadb8), [`3655af2be`](https://github.com/aws-amplify/amplify-ui/commit/3655af2be54733d364e71d3c7f86f32d7bbcf811)]:
  - @aws-amplify/ui-react@6.5.5
  - @aws-amplify/ui-react-core@3.0.29
  - @aws-amplify/ui@6.6.5

## 0.3.2

### Patch Changes

- [#5816](https://github.com/aws-amplify/amplify-ui/pull/5816) [`5af986fff`](https://github.com/aws-amplify/amplify-ui/commit/5af986fff369b76de8cb624393960d0335bfc2fc) Thanks [@thaddmt](https://github.com/thaddmt)! - fix(ai): update useAIGeneration to manage its own date state

- [#5900](https://github.com/aws-amplify/amplify-ui/pull/5900) [`1421ddef4`](https://github.com/aws-amplify/amplify-ui/commit/1421ddef49215f232a580d464d13920b9213b698) Thanks [@dbanksdesign](https://github.com/dbanksdesign)! - chore(ai): add graphql errors to useAIGeneration

- [#5883](https://github.com/aws-amplify/amplify-ui/pull/5883) [`77ac8b92c`](https://github.com/aws-amplify/amplify-ui/commit/77ac8b92cb601bfc034173ef39e1e0091b674566) Thanks [@dbanksdesign](https://github.com/dbanksdesign)! - fix(ai): no more unnecessary re-renders in AIConversation

- Updated dependencies [[`ac7cb271a`](https://github.com/aws-amplify/amplify-ui/commit/ac7cb271aff895e643fb5dc927030df9245b7c5b)]:
  - @aws-amplify/ui@6.6.4
  - @aws-amplify/ui-react@6.5.4
  - @aws-amplify/ui-react-core@3.0.28

## 0.3.1

### Patch Changes

- [#5872](https://github.com/aws-amplify/amplify-ui/pull/5872) [`fcf51abc8`](https://github.com/aws-amplify/amplify-ui/commit/fcf51abc81da6eecbf8a31812b7cd5b2865999c4) Thanks [@dbanksdesign](https://github.com/dbanksdesign)! - fix(ai-conversation): allow attachments to actually work on amplify component

- Updated dependencies [[`0d86485fc`](https://github.com/aws-amplify/amplify-ui/commit/0d86485fc4bf74766a1b82c69cfa322ed1e9baf7)]:
  - @aws-amplify/ui@6.6.3
  - @aws-amplify/ui-react@6.5.3
  - @aws-amplify/ui-react-core@3.0.27

## 0.3.0

### Minor Changes

- [#5802](https://github.com/aws-amplify/amplify-ui/pull/5802) [`8b4a28b9f`](https://github.com/aws-amplify/amplify-ui/commit/8b4a28b9f656a7963399d4e797646af0e26b1bf5) Thanks [@dbanksdesign](https://github.com/dbanksdesign)! - feat(ai-conversation): add allowAttachments prop

  BREAKING - This is a breaking change to an experimental API. Previously, the AIConversation component always allowed attachments. Now you will need to provide the `allowAttachments` prop to get the same behavior. The reason for this change is that attachments can quickly cost a lot based on the token use and we didn't want the default behavior to have that.

  ```jsx
  <AIConversation
    allowAttachments
    messages={messages}
    handleSendMessage={handleSendMessage}
  />
  ```

### Patch Changes

- [#5830](https://github.com/aws-amplify/amplify-ui/pull/5830) [`545aa6a60`](https://github.com/aws-amplify/amplify-ui/commit/545aa6a608b68b9fb78f5df56da0e1e09b537d58) Thanks [@calebpollman](https://github.com/calebpollman)! - chore(rollup): upgrade rollup deps, migrate to mjs config file, enforce linting on mjs files

- Updated dependencies [[`22e285f58`](https://github.com/aws-amplify/amplify-ui/commit/22e285f5802e40b78c5a055a7384943c41252428), [`545aa6a60`](https://github.com/aws-amplify/amplify-ui/commit/545aa6a608b68b9fb78f5df56da0e1e09b537d58), [`87d74a7de`](https://github.com/aws-amplify/amplify-ui/commit/87d74a7deaa7d0cf393dfed3fb3cc85a3790c382)]:
  - @aws-amplify/ui-react-core@3.0.26
  - @aws-amplify/ui-react@6.5.2
  - @aws-amplify/ui@6.6.2

## 0.2.1

### Patch Changes

- [#5796](https://github.com/aws-amplify/amplify-ui/pull/5796) [`bf9dbc334`](https://github.com/aws-amplify/amplify-ui/commit/bf9dbc334293aff844a835e1717ee529e1abded3) Thanks [@esauerbo](https://github.com/esauerbo)! - chore(deps): Fix transitive dependencies.

- Updated dependencies [[`bf9dbc334`](https://github.com/aws-amplify/amplify-ui/commit/bf9dbc334293aff844a835e1717ee529e1abded3), [`3a677a1af`](https://github.com/aws-amplify/amplify-ui/commit/3a677a1afa60652fcd1a5adb734b9c94d4ba5c3d)]:
  - @aws-amplify/ui-react-core@3.0.25
  - @aws-amplify/ui-react@6.5.1
  - @aws-amplify/ui@6.6.1

## 0.2.0

### Minor Changes

- [#5777](https://github.com/aws-amplify/amplify-ui/pull/5777) [`0ebf8b346`](https://github.com/aws-amplify/amplify-ui/commit/0ebf8b346bc744cd73e1e7891eafc07538d6419d) Thanks [@dbanksdesign](https://github.com/dbanksdesign)! - feat(avatar): add loading state to avatar and AIConversation

  ```jsx
  <Avatar isLoading />
  ```

### Patch Changes

- [#5799](https://github.com/aws-amplify/amplify-ui/pull/5799) [`b80bab00a`](https://github.com/aws-amplify/amplify-ui/commit/b80bab00a67a915d971bf28a455c304fc5682487) Thanks [@thaddmt](https://github.com/thaddmt)! - fix(ai): fix renders for empty toolUse messages

- [#5776](https://github.com/aws-amplify/amplify-ui/pull/5776) [`b600b3bd8`](https://github.com/aws-amplify/amplify-ui/commit/b600b3bd8a7a85872d37f07a69e8bfacc532d73a) Thanks [@thaddmt](https://github.com/thaddmt)! - fix(ai): fixes reattaching the same file by always triggering the onChange event

- Updated dependencies [[`0ebf8b346`](https://github.com/aws-amplify/amplify-ui/commit/0ebf8b346bc744cd73e1e7891eafc07538d6419d)]:
  - @aws-amplify/ui-react@6.4.0
  - @aws-amplify/ui@6.5.0
  - @aws-amplify/ui-react-core@3.0.23

## 0.1.1

### Patch Changes

- [#5774](https://github.com/aws-amplify/amplify-ui/pull/5774) [`42e2d5d1d`](https://github.com/aws-amplify/amplify-ui/commit/42e2d5d1d22bea316fbefa00ba059bdb7e8e428e) Thanks [@thaddmt](https://github.com/thaddmt)! - fix(ai): remove unnecessary use of Buffer

- [#5782](https://github.com/aws-amplify/amplify-ui/pull/5782) [`c485f1048`](https://github.com/aws-amplify/amplify-ui/commit/c485f1048f158914aaa012e588f9e1caa8bfaa06) Thanks [@thaddmt](https://github.com/thaddmt)! - chore(ai): add timestamp function to displayText

- Updated dependencies [[`9d96dd1fe`](https://github.com/aws-amplify/amplify-ui/commit/9d96dd1fe51212e8e55b0dde816122a6f5672762)]:
  - @aws-amplify/ui@6.4.1
  - @aws-amplify/ui-react@6.3.1
  - @aws-amplify/ui-react-core@3.0.22

## 0.1.0

### Minor Changes

- [#5767](https://github.com/aws-amplify/amplify-ui/pull/5767) [`afffa89cb`](https://github.com/aws-amplify/amplify-ui/commit/afffa89cb29bb08ff1b626c727a2c9fb93bf11b3) Thanks [@thaddmt](https://github.com/thaddmt)! - feat(ai): initial dev preview release for AI related ui components including AIConversation and AI hooks

### Patch Changes

- Updated dependencies [[`afffa89cb`](https://github.com/aws-amplify/amplify-ui/commit/afffa89cb29bb08ff1b626c727a2c9fb93bf11b3), [`afffa89cb`](https://github.com/aws-amplify/amplify-ui/commit/afffa89cb29bb08ff1b626c727a2c9fb93bf11b3), [`afffa89cb`](https://github.com/aws-amplify/amplify-ui/commit/afffa89cb29bb08ff1b626c727a2c9fb93bf11b3)]:
  - @aws-amplify/ui-react@6.3.0
  - @aws-amplify/ui@6.4.0
  - @aws-amplify/ui-react-core@3.0.21
