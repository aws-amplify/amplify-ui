---
"@aws-amplify/ui-react-ai": minor
"@aws-amplify/ui-react": minor
---

feat(ai): adding document support

The AIConversation component now accepts documents as attachments. The document file types are the [ones Bedrock supports](https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_DocumentBlock.html). This also fixes a bug where a user can submit empty messages in succession by pressing enter rapidly. 
