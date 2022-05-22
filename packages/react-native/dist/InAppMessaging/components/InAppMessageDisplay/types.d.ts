import { MessageComponents, MessageStyles } from '@aws-amplify/ui-react-core';
import { MessageOverrideStyle } from '../../hooks';
export interface InAppMessageDisplayProps {
    /**
     * Message UI components
     */
    components?: MessageComponents<MessageOverrideStyle>;
    /**
     *  Message override styles
     */
    styles?: MessageStyles<MessageOverrideStyle>;
}
