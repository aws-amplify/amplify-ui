import {
  ChangeDetectorRef,
  ElementRef,
  EventEmitter,
  NgZone,
} from '@angular/core';
export declare const proxyInputs: (Cmp: any, inputs: string[]) => void;
export declare const proxyMethods: (Cmp: any, methods: string[]) => void;
export declare const proxyOutputs: (
  instance: any,
  el: any,
  events: string[]
) => void;
export declare function ProxyCmp(opts: {
  inputs?: any;
  methods?: any;
}): (cls: any) => any;
import { Components } from '@aws-amplify/ui-components';
export declare interface AmplifyAmazonButton
  extends Components.AmplifyAmazonButton {}
export declare class AmplifyAmazonButton {
  protected z: NgZone;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, z: NgZone);
}
export declare interface AmplifyAuthContainer
  extends Components.AmplifyAuthContainer {}
export declare class AmplifyAuthContainer {
  protected z: NgZone;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, z: NgZone);
}
export declare interface AmplifyAuthFields
  extends Components.AmplifyAuthFields {}
export declare class AmplifyAuthFields {
  protected z: NgZone;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, z: NgZone);
}
export declare interface AmplifyAuth0Button
  extends Components.AmplifyAuth0Button {}
export declare class AmplifyAuth0Button {
  protected z: NgZone;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, z: NgZone);
}
export declare interface AmplifyAuthenticator
  extends Components.AmplifyAuthenticator {}
export declare class AmplifyAuthenticator {
  protected z: NgZone;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, z: NgZone);
}
export declare interface AmplifyButton extends Components.AmplifyButton {}
export declare class AmplifyButton {
  protected z: NgZone;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, z: NgZone);
}
export declare interface AmplifyChatbot extends Components.AmplifyChatbot {}
export declare class AmplifyChatbot {
  protected z: NgZone;
  chatCompleted: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, z: NgZone);
}
export declare interface AmplifyCheckbox extends Components.AmplifyCheckbox {}
export declare class AmplifyCheckbox {
  protected z: NgZone;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, z: NgZone);
}
export declare interface AmplifyCodeField extends Components.AmplifyCodeField {}
export declare class AmplifyCodeField {
  protected z: NgZone;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, z: NgZone);
}
export declare interface AmplifyConfirmSignIn
  extends Components.AmplifyConfirmSignIn {}
export declare class AmplifyConfirmSignIn {
  protected z: NgZone;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, z: NgZone);
}
export declare interface AmplifyConfirmSignUp
  extends Components.AmplifyConfirmSignUp {}
export declare class AmplifyConfirmSignUp {
  protected z: NgZone;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, z: NgZone);
}
export declare interface AmplifyContainer extends Components.AmplifyContainer {}
export declare class AmplifyContainer {
  protected z: NgZone;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, z: NgZone);
}
export declare interface AmplifyCountryDialCode
  extends Components.AmplifyCountryDialCode {}
export declare class AmplifyCountryDialCode {
  protected z: NgZone;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, z: NgZone);
}
export declare interface AmplifyEmailField
  extends Components.AmplifyEmailField {}
export declare class AmplifyEmailField {
  protected z: NgZone;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, z: NgZone);
}
export declare interface AmplifyFacebookButton
  extends Components.AmplifyFacebookButton {}
export declare class AmplifyFacebookButton {
  protected z: NgZone;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, z: NgZone);
}
export declare interface AmplifyFederatedButtons
  extends Components.AmplifyFederatedButtons {}
export declare class AmplifyFederatedButtons {
  protected z: NgZone;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, z: NgZone);
}
export declare interface AmplifyFederatedSignIn
  extends Components.AmplifyFederatedSignIn {}
export declare class AmplifyFederatedSignIn {
  protected z: NgZone;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, z: NgZone);
}
export declare interface AmplifyForgotPassword
  extends Components.AmplifyForgotPassword {}
export declare class AmplifyForgotPassword {
  protected z: NgZone;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, z: NgZone);
}
export declare interface AmplifyFormField extends Components.AmplifyFormField {}
export declare class AmplifyFormField {
  protected z: NgZone;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, z: NgZone);
}
export declare interface AmplifyFormSection
  extends Components.AmplifyFormSection {}
export declare class AmplifyFormSection {
  protected z: NgZone;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, z: NgZone);
}
export declare interface AmplifyGoogleButton
  extends Components.AmplifyGoogleButton {}
export declare class AmplifyGoogleButton {
  protected z: NgZone;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, z: NgZone);
}
export declare interface AmplifyGreetings extends Components.AmplifyGreetings {}
export declare class AmplifyGreetings {
  protected z: NgZone;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, z: NgZone);
}
export declare interface AmplifyHint extends Components.AmplifyHint {}
export declare class AmplifyHint {
  protected z: NgZone;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, z: NgZone);
}
export declare interface AmplifyIcon extends Components.AmplifyIcon {}
export declare class AmplifyIcon {
  protected z: NgZone;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, z: NgZone);
}
export declare interface AmplifyIconButton
  extends Components.AmplifyIconButton {}
export declare class AmplifyIconButton {
  protected z: NgZone;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, z: NgZone);
}
export declare interface AmplifyInput extends Components.AmplifyInput {}
export declare class AmplifyInput {
  protected z: NgZone;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, z: NgZone);
}
export declare interface AmplifyLabel extends Components.AmplifyLabel {}
export declare class AmplifyLabel {
  protected z: NgZone;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, z: NgZone);
}
export declare interface AmplifyLink extends Components.AmplifyLink {}
export declare class AmplifyLink {
  protected z: NgZone;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, z: NgZone);
}
export declare interface AmplifyLoadingSpinner
  extends Components.AmplifyLoadingSpinner {}
export declare class AmplifyLoadingSpinner {
  protected z: NgZone;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, z: NgZone);
}
export declare interface AmplifyNav extends Components.AmplifyNav {}
export declare class AmplifyNav {
  protected z: NgZone;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, z: NgZone);
}
export declare interface AmplifyOauthButton
  extends Components.AmplifyOauthButton {}
export declare class AmplifyOauthButton {
  protected z: NgZone;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, z: NgZone);
}
export declare interface AmplifyPasswordField
  extends Components.AmplifyPasswordField {}
export declare class AmplifyPasswordField {
  protected z: NgZone;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, z: NgZone);
}
export declare interface AmplifyPhoneField
  extends Components.AmplifyPhoneField {}
export declare class AmplifyPhoneField {
  protected z: NgZone;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, z: NgZone);
}
export declare interface AmplifyPhotoPicker
  extends Components.AmplifyPhotoPicker {}
export declare class AmplifyPhotoPicker {
  protected z: NgZone;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, z: NgZone);
}
export declare interface AmplifyPicker extends Components.AmplifyPicker {}
export declare class AmplifyPicker {
  protected z: NgZone;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, z: NgZone);
}
export declare interface AmplifyRadioButton
  extends Components.AmplifyRadioButton {}
export declare class AmplifyRadioButton {
  protected z: NgZone;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, z: NgZone);
}
export declare interface AmplifyRequireNewPassword
  extends Components.AmplifyRequireNewPassword {}
export declare class AmplifyRequireNewPassword {
  protected z: NgZone;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, z: NgZone);
}
export declare interface AmplifyS3Album extends Components.AmplifyS3Album {}
export declare class AmplifyS3Album {
  protected z: NgZone;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, z: NgZone);
}
export declare interface AmplifyS3Image extends Components.AmplifyS3Image {}
export declare class AmplifyS3Image {
  protected z: NgZone;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, z: NgZone);
}
export declare interface AmplifyS3ImagePicker
  extends Components.AmplifyS3ImagePicker {}
export declare class AmplifyS3ImagePicker {
  protected z: NgZone;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, z: NgZone);
}
export declare interface AmplifyS3Text extends Components.AmplifyS3Text {}
export declare class AmplifyS3Text {
  protected z: NgZone;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, z: NgZone);
}
export declare interface AmplifyS3TextPicker
  extends Components.AmplifyS3TextPicker {}
export declare class AmplifyS3TextPicker {
  protected z: NgZone;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, z: NgZone);
}
export declare interface AmplifySection extends Components.AmplifySection {}
export declare class AmplifySection {
  protected z: NgZone;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, z: NgZone);
}
export declare interface AmplifySelect extends Components.AmplifySelect {}
export declare class AmplifySelect {
  protected z: NgZone;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, z: NgZone);
}
export declare interface AmplifySelectMfaType
  extends Components.AmplifySelectMfaType {}
export declare class AmplifySelectMfaType {
  protected z: NgZone;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, z: NgZone);
}
export declare interface AmplifySignIn extends Components.AmplifySignIn {}
export declare class AmplifySignIn {
  protected z: NgZone;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, z: NgZone);
}
export declare interface AmplifySignInButton
  extends Components.AmplifySignInButton {}
export declare class AmplifySignInButton {
  protected z: NgZone;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, z: NgZone);
}
export declare interface AmplifySignOut extends Components.AmplifySignOut {}
export declare class AmplifySignOut {
  protected z: NgZone;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, z: NgZone);
}
export declare interface AmplifySignUp extends Components.AmplifySignUp {}
export declare class AmplifySignUp {
  protected z: NgZone;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, z: NgZone);
}
export declare interface AmplifyStrike extends Components.AmplifyStrike {}
export declare class AmplifyStrike {
  protected z: NgZone;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, z: NgZone);
}
export declare interface AmplifyToast extends Components.AmplifyToast {}
export declare class AmplifyToast {
  protected z: NgZone;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, z: NgZone);
}
export declare interface AmplifyTooltip extends Components.AmplifyTooltip {}
export declare class AmplifyTooltip {
  protected z: NgZone;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, z: NgZone);
}
export declare interface AmplifyTotpSetup extends Components.AmplifyTotpSetup {}
export declare class AmplifyTotpSetup {
  protected z: NgZone;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, z: NgZone);
}
export declare interface AmplifyUsernameField
  extends Components.AmplifyUsernameField {}
export declare class AmplifyUsernameField {
  protected z: NgZone;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, z: NgZone);
}
export declare interface AmplifyVerifyContact
  extends Components.AmplifyVerifyContact {}
export declare class AmplifyVerifyContact {
  protected z: NgZone;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, z: NgZone);
}
