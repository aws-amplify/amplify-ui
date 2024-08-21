/// <reference types="react" />
import { IconElement } from './IconElement';
export interface AIConversationElements {
    Button: typeof ButtonElement;
    Heading: typeof HeadingElement;
    Icon: typeof IconElement;
    Image: typeof ImageElement;
    Input: typeof InputElement;
    Label: typeof LabelElement;
    ListItem: typeof ListItemElement;
    Span: typeof SpanElement;
    Text: typeof TextElement;
    TextArea: typeof TextAreaElement;
    UnorderedList: typeof UnorderedListElement;
    View: typeof ViewElement;
}
export declare const LabelElement: import("@aws-amplify/ui-react-core/dist/types/elements/types").BaseElement<import("@aws-amplify/ui-react-core/dist/types/elements/types").BaseElementProps<"htmlFor", string, import("react").DetailedHTMLProps<import("react").LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>>, HTMLLabelElement>;
export declare const TextElement: import("@aws-amplify/ui-react-core/dist/types/elements/types").BaseElement<import("@aws-amplify/ui-react-core/dist/types/elements/types").BaseElementProps<never, string, import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>>, HTMLParagraphElement>;
export declare const UnorderedListElement: import("@aws-amplify/ui-react-core/dist/types/elements/types").BaseElement<import("@aws-amplify/ui-react-core/dist/types/elements/types").BaseElementProps<never, string, import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLUListElement>, HTMLUListElement>>, HTMLUListElement>;
export declare const ListItemElement: import("@aws-amplify/ui-react-core/dist/types/elements/types").BaseElement<import("@aws-amplify/ui-react-core/dist/types/elements/types").BaseElementProps<never, string, import("react").DetailedHTMLProps<import("react").LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>>, HTMLLIElement>;
export declare const HeadingElement: import("@aws-amplify/ui-react-core/dist/types/elements/types").BaseElement<import("@aws-amplify/ui-react-core/dist/types/elements/types").BaseElementProps<never, string, import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>>, HTMLHeadingElement>;
export type IconElementProps = React.ComponentProps<typeof IconElement>;
type ImageElementProps = 'src' | 'alt';
export declare const ImageElement: import("@aws-amplify/ui-react-core/dist/types/elements/types").BaseElement<import("@aws-amplify/ui-react-core/dist/types/elements/types").BaseElementProps<ImageElementProps, string, import("react").DetailedHTMLProps<import("react").ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>>, HTMLImageElement>;
export declare const InputElement: import("@aws-amplify/ui-react-core/dist/types/elements/types").BaseElement<import("@aws-amplify/ui-react-core/dist/types/elements/types").BaseElementProps<"type", string, import("react").DetailedHTMLProps<import("react").InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>>, HTMLInputElement>;
type ButtonElementProps = 'disabled' | 'onClick' | 'type' | 'tabIndex';
type ButtonElementVariant = 'attach' | 'remove' | 'send-message';
export declare const ButtonElement: import("@aws-amplify/ui-react-core/dist/types/elements/types").BaseElement<import("@aws-amplify/ui-react-core/dist/types/elements/types").BaseElementProps<ButtonElementProps, ButtonElementVariant, import("react").DetailedHTMLProps<import("react").ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>>, HTMLButtonElement>;
type ViewElementProps = 'onFocus' | 'tabIndex' | 'onKeyDown';
export declare const ViewElement: import("@aws-amplify/ui-react-core/dist/types/elements/types").BaseElement<import("@aws-amplify/ui-react-core/dist/types/elements/types").BaseElementProps<ViewElementProps, string, import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>>, HTMLDivElement>;
export declare const SpanElement: import("@aws-amplify/ui-react-core/dist/types/elements/types").BaseElement<import("@aws-amplify/ui-react-core/dist/types/elements/types").BaseElementProps<never, string, import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>>, HTMLSpanElement>;
type TextAreaElementProps = 'id' | 'name' | 'onChange' | 'placeholder' | 'autoFocus';
export declare const TextAreaElement: import("@aws-amplify/ui-react-core/dist/types/elements/types").BaseElement<import("@aws-amplify/ui-react-core/dist/types/elements/types").BaseElementProps<TextAreaElementProps, string, import("react").DetailedHTMLProps<import("react").TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>>, HTMLTextAreaElement>;
export declare const AIConversationElements: AIConversationElements;
export {};
