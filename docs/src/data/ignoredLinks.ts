/**
 * IGNORED_LINKS is a manually maintained allowlist.
 * Any links on this list will not be tested, so KEEP THIS LIST AS SHORT AS POSSIBLE.
 * External Links added to this list because they are good links returning a bad status code (not 200, 301, 303).
 * e.g. 403 error may caused by WAF blocking NodeJS HTTP(s) request from linux.
 */

export const IGNORED_LINKS = [
  'https://docs.aws.amazon.com/AmazonS3/latest/userguide/mpuoverview.html', // 403
  'https://docs.aws.amazon.com/pinpoint/latest/userguide/channels-inapp.html', // 403
  'https://docs.aws.amazon.com/amplify/latest/userguide/getting-started.html', // 403
  'https://docs.aws.amazon.com/cognito/latest/developerguide/getting-started-with-identity-pools.html', // 403
  'https://docs.aws.amazon.com/cognito/latest/developerguide/getting-started-with-identity-pools.html#create-identity-pool', // 403
  'https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-settings-attributes.html', // 403
  'https://docs.aws.amazon.com/general/latest/gr/rekognition.html', // 403,
  'https://docs.aws.amazon.com/rekognition/latest/dg/face-liveness-programming-api.html', // 403
  'https://docs.aws.amazon.com/rekognition/latest/dg/recommendations-liveness.html', // 403
  'https://docs.aws.amazon.com/rekognition/latest/dg/face-liveness-prerequisites.html#face-liveness-prerequisites-amplify', // 403
  'https://docs.aws.amazon.com/STS/latest/APIReference/API_AssumeRole.html', // 403
  'https://github.com/aws-amplify/amplify-ui/issues/new/choose', // 302. Only at test. Can't reproduce the status code. Can't find the redirected link.
  'https://github.com/aws-amplify/amplify-ui-android/issues/new/choose', // 302
  'https://github.com/aws-amplify/amplify-ui-swift/issues/new/choose', // 302 amplify-ui-wift redirects to amplify-ui-swift-liveness
  'https://github.com/aws-amplify/amplify-ui-swift-liveness/issues/new/choose', // 302 amplify-ui-swift-liveness does not have issue templates yet
  'https://developer.apple.com/design/human-interface-guidelines/patterns/accessing-private-data/', // 401 Apple doesn't like bots maybe
  'https://developer.apple.com/documentation/xcode/localization', // 403
  'https://twitter.com/AWSAmplify',
  'https://tfhub.dev/tensorflow/tfjs-model/blazeface/1/default/1/model.json?tfjs-format=file', // 302 to a google cdn
  'https://cdn.liveness.rekognition.amazonaws.com/face-detection/tensorflow/tfjs-backend-wasm/3.11.0/', // 404 this is the intentional path as the tfjs library will append the correct file name
  'https://tfhub.dev/mediapipe/tfjs-model/face_detection/short/1', // 302 redirects to kaggle/models/mediapipe/face-detection/frameworks/tfJs/variations/short/versions/1
  'https://cdn.liveness.rekognition.amazonaws.com',
  'https://www.figma.com/community/file/1047600760128127424',
  'https://www.figma.com/community/plugin/1040722185526429545/AWS-Amplify-Theme-Editor',
  'https://www.w3.org/WAI/ARIA/apg/patterns/tabs/',
  'https://www.w3.org/WAI/standards-guidelines/act/rules/0ssw9k/proposed/',
  'https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/#aria_lh_step3',
  'https://www.w3.org/WAI/ARIA/apg/patterns/alert/examples/alert/',
  'https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/',
  'https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/',
  'https://pub.dev/documentation/amplify_authenticator/latest/amplify_authenticator/AuthenticatorStep.html',
  'https://pub.dev/documentation/amplify_authenticator/latest/amplify_authenticator/AuthenticatorState-class.html',
  'https://pub.dev/documentation/amplify_authenticator/latest/amplify_authenticator/amplify_authenticator-library.html',
  'https://docs.flutter.dev/ui/accessibility-and-localization/internationalization',
  'https://cdn.liveness.rekognition.amazonaws.com/face-detection/tensorflow/tfjs-backend-wasm/4.11.0/',
  'https://tfhub.dev/mediapipe/tfjs-model/face_detection/short/1',
];
