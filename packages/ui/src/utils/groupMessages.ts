type Group = {
  PropertyReferenceWarnings: string;
  PropertyValueCollisions: string;
  TemplateDeprecationWarnings: string;
  RegisterTemplateDeprecationWarnings: string;
  SassMapFormatDeprecationWarnings: string;
  MissingRegisterTransformErrors: string;
  PropertyNameCollisionWarnings: string;
  FilteredOutputReferences: string;
};

class GroupMessages {
  private static groupedMessages: Record<string, string[]> = {};

  static GROUP: Group = {
    PropertyReferenceWarnings: 'Property Reference Errors',
    PropertyValueCollisions: 'Property Value Collisions',
    TemplateDeprecationWarnings: 'Template Deprecation Warnings',
    RegisterTemplateDeprecationWarnings:
      'Register Template Deprecation Warnings',
    SassMapFormatDeprecationWarnings: 'Sass Map Format Deprecation Warnings',
    MissingRegisterTransformErrors: 'Missing Register Transform Errors',
    PropertyNameCollisionWarnings: 'Property Name Collision Warnings',
    FilteredOutputReferences: 'Filtered Output Reference Warnings',
  };

  static flush(messageGroup: string): string[] {
    const messages = this.fetchMessages(messageGroup);
    this.clear(messageGroup);
    return messages;
  }

  static add(messageGroup: string, message: string): void {
    if (messageGroup) {
      if (!this.groupedMessages[messageGroup]) {
        this.groupedMessages[messageGroup] = [];
      }
      if (this.groupedMessages[messageGroup].indexOf(message) === -1) {
        this.groupedMessages[messageGroup].push(message);
      }
    }
  }

  static count(messageGroup: string): number {
    return this.groupedMessages[messageGroup]
      ? this.groupedMessages[messageGroup].length
      : 0;
  }

  static fetchMessages(messageGroup: string): string[] {
    return (messageGroup && this.groupedMessages[messageGroup]) || [];
  }

  static clear(messageGroup: string): void {
    if (messageGroup && this.groupedMessages[messageGroup]) {
      delete this.groupedMessages[messageGroup];
    }
  }
}

export default GroupMessages;
