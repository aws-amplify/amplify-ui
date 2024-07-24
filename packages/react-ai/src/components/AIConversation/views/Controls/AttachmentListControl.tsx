import React from 'react';

import { withBaseElementProps } from '@aws-amplify/ui-react-core/elements';
import { InputContext } from '../../context';
import { AIConversationElements } from '../../context/elements';

const {
  Button,
  Icon,
  ListItem,
  UnorderedList: ListElement,
  Span,
  Text,
  View,
} = AIConversationElements;

const IMAGE_LIST_BLOCK = 'ai-attachment-list';
const IMAGE_ITEM_BLOCK = 'ai-attachment';
const REMOVE_IMAGE_BLOCK = 'ai-remove-attachment';
const IMAGE_TEXT_BLOCK = 'ai-attachment-text';

const removeIconProps = () => ({
  children: (
    <path
      d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
      fill="currentColor"
    />
  ),
  'aria-hidden': true,
  className: `${REMOVE_IMAGE_BLOCK}__icon`,
  width: '24',
  height: '24',
  viewBox: '0 -960 960 960',
  fill: 'none',
  variant: 'remove',
  xmlns: 'http://www.w3.org/2000/svg',
});

const RemoveIcon = withBaseElementProps(Icon, removeIconProps);

const RemoveButton = withBaseElementProps(Button, {
  'aria-label': 'Remove image',
  className: `${REMOVE_IMAGE_BLOCK}__button`,
  variant: 'remove',
});

const RemoveButtonControl: RemoveButtonControl = ({ onRemove }) => {
  return (
    <RemoveButton onClick={onRemove}>
      <RemoveIcon />
    </RemoveButton>
  );
};

RemoveButtonControl.Icon = RemoveIcon;
RemoveButtonControl.Button = RemoveButton;

interface RemoveButtonControl<
  T extends Partial<AIConversationElements> = AIConversationElements,
> {
  (props: { onRemove: () => void }): JSX.Element;
  Button: T['Button'];
  Icon: T['Icon'];
}

const imageIconProps = () => ({
  children: (
    <path
      d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm40-80h480L570-480 450-320l-90-120-120 160Zm-40 80v-560 560Z"
      fill="currentColor"
    />
  ),
  'aria-hidden': true,
  className: `${IMAGE_ITEM_BLOCK}__icon`,
  width: '24',
  height: '24',
  viewBox: '0 -960 960 960',
  fill: 'none',
  variant: 'image',
  xmlns: 'http://www.w3.org/2000/svg',
});

const ImageIcon = withBaseElementProps(Icon, imageIconProps);

const FileNameText = withBaseElementProps(Text, {
  className: `${IMAGE_TEXT_BLOCK}__file-name`,
});

const FileSizeText = withBaseElementProps(Text, {
  className: `${IMAGE_TEXT_BLOCK}__file-size`,
});

const Separator = withBaseElementProps(Span, {
  'aria-hidden': true,
  className: `${IMAGE_TEXT_BLOCK}__separator`,
  children: '|',
});

const TextContainer = withBaseElementProps(View, {
  className: `${IMAGE_TEXT_BLOCK}__container`,
});

export const TextControl: TextControl = ({ fileName, fileSize }) => {
  return (
    <TextContainer>
      <FileNameText>{fileName}</FileNameText>
      <Separator />
      <FileSizeText>{fileSize}</FileSizeText>
    </TextContainer>
  );
};

TextControl.Container = TextContainer;
TextControl.FileName = FileNameText;
TextControl.FileSize = FileSizeText;
TextControl.Separator = Separator;

interface TextControl<
  T extends Partial<AIConversationElements> = AIConversationElements,
> {
  (props: { fileName: string; fileSize: number }): JSX.Element;
  Container: T['View'];
  FileName: T['Text'];
  FileSize: T['Text'];
  Separator: T['Span'];
}

const Container = withBaseElementProps(ListItem, {
  className: `${IMAGE_ITEM_BLOCK}__list-item`,
});

const AttachmentControl: AttachmentControl = ({ image, onRemove }) => {
  return (
    <Container>
      <ImageIcon />
      <TextControl fileName={image.name} fileSize={image.size} />
      <RemoveButtonControl onRemove={onRemove} />
    </Container>
  );
};

AttachmentControl.Container = Container;
AttachmentControl.ImageIcon = ImageIcon;
AttachmentControl.RemoveButton = RemoveButtonControl;
AttachmentControl.Text = TextControl;

interface AttachmentControl<
  T extends Partial<AIConversationElements> = AIConversationElements,
> {
  (props: { image: File; onRemove: () => void }): JSX.Element;
  Container: T['ListItem'];
  ImageIcon: T['Icon'];
  RemoveButton: RemoveButtonControl<T>;
  Text: TextControl<T>;
}

const UnorderedList = withBaseElementProps(ListElement, {
  className: `${IMAGE_LIST_BLOCK}__unordered-list`,
});

export const AttachmentListControl: AttachmentListControl = () => {
  const { fileInput, setFileInput } = React.useContext(InputContext);
  return (
    <UnorderedList>
      {fileInput?.map((image, index) => {
        const onRemove = () => {
          if (setFileInput) {
            setFileInput((prevFiles) =>
              prevFiles.filter((_, idx) => idx !== index)
            );
          }
        };
        return (
          <AttachmentControl key={index} image={image} onRemove={onRemove} />
        );
      })}
    </UnorderedList>
  );
};

AttachmentListControl.List = UnorderedList;
AttachmentListControl.Item = AttachmentControl;

export interface AttachmentListControl<
  T extends Partial<AIConversationElements> = AIConversationElements,
> {
  (): JSX.Element;
  List: T['UnorderedList'];
  Item: AttachmentControl<T>;
}
