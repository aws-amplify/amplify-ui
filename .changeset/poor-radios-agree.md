---
"@aws-amplify/ui-docs": patch
"@aws-amplify/ui-angular-example": patch
"@aws-amplify/ui-angular-mono": patch
"@aws-amplify/ui-e2e": patch
"@aws-amplify/ui": patch
"@aws-amplify/ui-angular": patch
---

feat(angular): add support for onpush change detection strategy. 

The `OnPush` change detection strategy can now be used with the Angular `authenticator` like so:
```
@Component({
  selector: 'sign-in-with-email-onpush',
  template: '<amplify-authenticator></amplify-authenticator>'
  changeDetection: ChangeDetectionStrategy.OnPush
})
```
