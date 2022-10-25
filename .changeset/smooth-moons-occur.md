---
'@aws-amplify/ui-angular': minor
---

Expose `subscribe` from `AuthenticatorService`.

```ts
@Component()
class MyComponent implements OnInit, OnDelete {
  private unsubscribe: () => void = null;
  constructor(private authenticator: Authenticator, private route: Router) {}

  ngOnInit() {
    this.unsubscribe = authenticator.subscribe(({ authStatus }) => {
      if (authStatus === 'authenticated') {
        this.router.navigate(['/admin']);
      }
    });
  }

  ngOnDelete() {
    this.unsubscribe();
  }
}
```
