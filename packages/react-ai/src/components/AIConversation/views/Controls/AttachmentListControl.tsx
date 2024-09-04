import React from 'react';

import { withBaseElementProps } from '@aws-amplify/ui-react-core/elements';
import { ConversationInputContext } from '../../context';
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

const RemoveIcon = withBaseElementProps(Icon, {
  className: `${REMOVE_IMAGE_BLOCK}__icon`,
  variant: 'close',
});

const RemoveButton = withBaseElementProps(Button, {
  'aria-label': 'Remove file',
  className: `${REMOVE_IMAGE_BLOCK}__button`,
  variant: 'remove',
  type: 'button',
});

export const RemoveButtonControl: RemoveButtonControl = ({ onRemove }) => {
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

const ImageIcon = withBaseElementProps(Icon, {
  className: `${IMAGE_ITEM_BLOCK}__icon`,
  variant: 'image',
});

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

export const AttachmentControl: AttachmentControl = ({ image, onRemove }) => {
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
  const { input, setInput } = React.useContext(ConversationInputContext);
  return (
    <UnorderedList>
      {input?.files?.map((file, index) => {
        const onRemove = () => {
          if (setInput) {
            setInput((prevInput) => ({
              ...prevInput,
              files: prevInput?.files?.filter((_file) => _file !== file),
            }));
          }
        };
        return (
          <AttachmentControl key={index} image={file} onRemove={onRemove} />
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
