---
'@aws-amplify/ui-angular': major
'@aws-amplify/ui-react': major
'@aws-amplify/ui': major
'@aws-amplify/ui-vue': major
---


Zero-Configuration Authenticator for Angular, React, & Vue


The `Authenticator` has been updated based on customer feedback & real-world use-cases  to deliver an improved out-of-the-box experience & greater customization.

_See: [RFC: Authenticator@next](https://github.com/aws-amplify/amplify-ui/discussions/200)_

## Goals

* **Zero-config** – The Authenticator automatically infers Amplify CLI & Admin UI settings to work out-of-the-box.

	Run `amplify pull` with the latest CLI whenever your backend changes, and the Authenticator automatically reflects the correct login mechanism, social providers, & more.
	
	
* **Native** – The Authenticator is implemented in its respective framework (e.g. Angular, React, Vue) for consistency & familiarity.

* **Stable** – Existing & upcoming Authenticator behavior is captured & tested to reduce & prevent regressions.

	[Authenticator behavior](https://github.com/aws-amplify/amplify-ui/tree/main/packages/e2e/features/ui/components/authenticator) is tested as [E2E tests](https://github.com/aws-amplify/amplify-ui/blob/main/CONTRIBUTING.md#e2e-testing) on every PR.

* **Interoperable** – Work with password managers, autofill, existing styles, & other common features.

* **Customizable** – More ways to customize the UI & behavior without losing the benefits of the Authenticator.

	Customers have access to the same functionality that the `Authenticator` uses internally to even build a 100% custom Authenticator, without sacrificing any of the logic.

* **Reproducible** – Authentication is complex. The Authenticator is is developed & tested against a myriad of Amplify backends, example apps, and specifications.

	Check out our [environments](https://github.com/aws-amplify/amplify-ui/tree/main/environments) and [examples](https://github.com/aws-amplify/amplify-ui/tree/main/examples) for more.
	
---

Learn more by visiting the [Authenticator Documentation](https://ui.docs.amplify.aws/components/authenticator).

