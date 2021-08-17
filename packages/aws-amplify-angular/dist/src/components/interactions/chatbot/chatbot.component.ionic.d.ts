import { ChangeDetectorRef } from '@angular/core';
import { ChatbotComponentCore } from './chatbot.component.core';
import { AmplifyService } from '../../../providers/amplify.service';
export declare class ChatbotComponentIonic extends ChatbotComponentCore {
  amplifyService: AmplifyService;
  inputValue: any;
  constructor(ref: ChangeDetectorRef, amplifyService: AmplifyService);
}
