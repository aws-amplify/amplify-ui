import React from 'react';
import { AIConversationElements } from '../../context/elements';
export declare const AvatarControl: AvatarControl;
export interface AvatarControl<T extends Partial<AIConversationElements> = AIConversationElements> {
    (): React.JSX.Element;
    Container: T['View'];
    DisplayName: T['Text'];
    Icon: T['Span'];
}
