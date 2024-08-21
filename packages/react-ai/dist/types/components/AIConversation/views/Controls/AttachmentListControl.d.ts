/// <reference types="react" />
import { AIConversationElements } from '../../context/elements';
export declare const RemoveButtonControl: RemoveButtonControl;
interface RemoveButtonControl<T extends Partial<AIConversationElements> = AIConversationElements> {
    (props: {
        onRemove: () => void;
    }): JSX.Element;
    Button: T['Button'];
    Icon: T['Icon'];
}
export declare const TextControl: TextControl;
interface TextControl<T extends Partial<AIConversationElements> = AIConversationElements> {
    (props: {
        fileName: string;
        fileSize: number;
    }): JSX.Element;
    Container: T['View'];
    FileName: T['Text'];
    FileSize: T['Text'];
    Separator: T['Span'];
}
export declare const AttachmentControl: AttachmentControl;
interface AttachmentControl<T extends Partial<AIConversationElements> = AIConversationElements> {
    (props: {
        image: File;
        onRemove: () => void;
    }): JSX.Element;
    Container: T['ListItem'];
    ImageIcon: T['Icon'];
    RemoveButton: RemoveButtonControl<T>;
    Text: TextControl<T>;
}
export declare const AttachmentListControl: AttachmentListControl;
export interface AttachmentListControl<T extends Partial<AIConversationElements> = AIConversationElements> {
    (): JSX.Element;
    List: T['UnorderedList'];
    Item: AttachmentControl<T>;
}
export {};
