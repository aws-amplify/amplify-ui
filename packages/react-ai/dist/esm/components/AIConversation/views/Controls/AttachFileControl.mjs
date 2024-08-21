import React from 'react';
import { withBaseElementProps } from '@aws-amplify/ui-react-core/elements';
import '../../context/ActionsContext.mjs';
import '../../context/AvatarsContext.mjs';
import { InputContext } from '../../context/InputContext.mjs';
import '../../context/MessagesContext.mjs';
import '../../context/SuggestedPromptsContext.mjs';
import '../../context/MessageVariantContext.mjs';
import { AIConversationElements } from '../../context/elements/definitions.mjs';

const { Button, Icon, View } = AIConversationElements;
const ATTACH_FILE_BLOCK = 'ai-attach-file';
const FIELD_BLOCK = 'ai-field';
const AttachFileIcon = withBaseElementProps(Icon, {
    className: `${ATTACH_FILE_BLOCK}__icon`,
    variant: 'attach',
});
const AttachFileContainer = withBaseElementProps(View, {
    className: `${ATTACH_FILE_BLOCK}__container`,
});
const VisuallyHidden = withBaseElementProps(View, {
    className: `${FIELD_BLOCK}__visually-hidden`,
});
const AttachFileButton = withBaseElementProps(Button, {
    'aria-label': 'Attach file',
    className: `${FIELD_BLOCK}__button`,
    type: 'button',
    variant: 'attach',
});
const AttachFileControl = () => {
    const hiddenInput = React.useRef(null);
    const { setInput } = React.useContext(InputContext);
    function handleButtonClick() {
        if (hiddenInput.current) {
            hiddenInput.current.click();
            hiddenInput.current.value = '';
        }
    }
    function handleFileChange(e) {
        const { files } = e.target;
        if (files && files?.length > 0 && setInput) {
            Array.from(files).forEach((file) => {
                setInput((prevInput) => ({
                    ...prevInput,
                    files: [...(prevInput?.files ?? []), file],
                }));
            });
        }
    }
    return (React.createElement(AttachFileContainer, null,
        React.createElement(AttachFileButton, { onClick: handleButtonClick },
            React.createElement(AttachFileIcon, null)),
        React.createElement(VisuallyHidden, null,
            React.createElement("input", { 
                // TODO follow up about what file types are accepted
                accept: ".jpeg,.png,.webp,.gif", "data-testid": "hidden-file-input", onChange: handleFileChange, ref: hiddenInput, type: "file", multiple: true }))));
};
AttachFileControl.Icon = AttachFileIcon;
AttachFileControl.Button = AttachFileButton;
AttachFileControl.Container = AttachFileContainer;

export { AttachFileControl };
