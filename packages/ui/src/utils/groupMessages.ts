// Internal Style Dictionary methods
// copied from amzn/style-dictionary with the owner's permission

var groupedMessages = {};

export var GroupMessages = {
  GROUP: {
    PropertyReferenceWarnings: 'Property Reference Errors',
    PropertyValueCollisions: 'Property Value Collisions',
    TemplateDeprecationWarnings: 'Template Deprecation Warnings',
    RegisterTemplateDeprecationWarnings:
      'Register Template Deprecation Warnings',
    SassMapFormatDeprecationWarnings: 'Sass Map Format Deprecation Warnings',
    MissingRegisterTransformErrors: 'Missing Register Transform Errors',
    PropertyNameCollisionWarnings: 'Property Name Collision Warnings',
    FilteredOutputReferences: 'Filtered Output Reference Warnings',
  },

  flush: function (messageGroup) {
    var messages = GroupMessages.fetchMessages(messageGroup);
    GroupMessages.clear(messageGroup);
    return messages;
  },

  add: function (messageGroup, message) {
    if (messageGroup) {
      if (!groupedMessages[messageGroup]) {
        groupedMessages[messageGroup] = [];
      }
      if (groupedMessages[messageGroup].indexOf(message) === -1) {
        groupedMessages[messageGroup].push(message);
      }
    }
  },

  count: function (messageGroup) {
    return groupedMessages[messageGroup]
      ? groupedMessages[messageGroup].length
      : 0;
  },

  fetchMessages: function (messageGroup) {
    return (messageGroup && groupedMessages[messageGroup]) || [];
  },

  clear: function (messageGroup) {
    messageGroup &&
      groupedMessages[messageGroup] &&
      delete groupedMessages[messageGroup];
  },
};
