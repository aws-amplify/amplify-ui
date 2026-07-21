# E2E Plan — Folder Download (PR #7046) + SW Streaming Download (PR #7044)

**Target harness:** `packages/e2e` (Cypress 14 + `@badeball/cypress-cucumber-preprocessor`, esbuild bundler).
**Target page:** `ui/components/storage/storage-browser/default-auth` (Next `examples/next`, served at `localhost:3000` via `next start`).
**Branch under test:** `bobbor/feat/folder-download` (worktree `/local/home/phandpau/workspace/amplify/ui/folder-download`).
**Do NOT modify source/test/feature files while planning.** Implementation happens on a fresh branch (assumed to exist).

All facts below were read from real code; file:line references are included so the implementation agent can re-verify.

---

## 1. SCOPE & FEASIBILITY

### 1a. Can the service worker register/stream under `next start` + Cypress on localhost:3000?

**No — not as the repo stands.** Verified:

- The e2e target page `examples/next/pages/ui/components/storage/storage-browser/default-auth/index.page.tsx` renders `<StorageBrowser />` and **never registers a service worker** (no `navigator.serviceWorker.register`, no import of `download-sw`).
- `examples/next/public/` contains only images (`listing-logo.svg`, `osaka.jpg`, …) — **no `download-sw.js` is served**. There is no `copy-serviceworker` step in the example build.
- The zip handler resolves the SW via `navigator.serviceWorker.getRegistration('/amplify-storage-download/')` and, when `!reg?.active`, sets `state.blobPromise = collectBlob(...)` — the **blob fallback** (`packages/react-storage/src/components/StorageBrowser/actions/handlers/zipdownload.ts:144-162`).

**Consequence:** every multi-file download in the e2e harness takes the **blob-fallback** path, not the SW-streamed path. The SW streaming path (`/amplify-storage-download/<id>` fetch intercepted by the worker, Content-Disposition filename) is therefore **NOT exercisable** at the default-auth page without first (a) building/serving `download-sw.js` at scope `/` and (b) registering it on the page. Treat SW-streamed byte delivery as **STRETCH / out-of-scope** unless the example is modified (a source change explicitly disallowed here — flag to human, see §7).

### 1b. How to verify a "download" happened

Three candidate strategies, assessed against what the harness already supports:

| Strategy                                                                       | Confidence             | Notes                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ------------------------------------------------------------------------------ | ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`cy.intercept('HEAD', 'https://_.s3._.amazonaws.com/**')` and assert 200\*\* | **HIGH — recommended** | This is exactly what the existing single-file step does (`storagebrowser.ts:88-104`). Every per-file download (single **and** each file inside a zip batch) calls `getUrl({ validateObjectExistence: true })` which fires an S3 **HEAD** (`download.ts:71-79`, `zipdownload.ts` per-file `download()` ~line 225). So a zip of N files fires N HEADs. **This is the S3-HEAD-only limitation to extend** (from single `cy.wait` to multiple/`cy.get(alias.all)`). |
| **UI-observable completion state**                                             | **HIGH — recommended** | On success the DownloadView renders `getActionCompleteMessage` → `'All files downloaded.'` (`downloadView.ts:14-16`). Enumeration/empty/error states each render a distinct, assertable message string. Reuse `Then I see "…"`.                                                                                                                                                                                                                                 |
| **`cy.readFile('cypress/downloads/<name>.zip')`**                              | **LOW — STRETCH only** | No `downloadsFolder` override in `cypress.config.ts` (defaults to `cypress/downloads`). Blob-fallback triggers an `<a download="${folder}.zip">` on a `blob:` object URL; headless Chrome _may_ persist it, but this is flaky and unproven in this harness. Use only to opportunistically assert the **zip filename** (the folder-naming feature). Do not gate MUST scenarios on it.                                                                            |
| `cy.intercept` on the `/amplify-storage-download/` fetch                       | N/A here               | Only meaningful when the SW is registered (§1a). Out of scope.                                                                                                                                                                                                                                                                                                                                                                                                  |

**Recommended verification strategy:** assert **(HEAD 200 × fileCount)** + **UI completion/enumeration message strings**. Zip filename assertion via `cy.readFile` is a single tagged STRETCH scenario.

### 1c. Routing (verified, drives scenario design)

`composedDownloadHandler` (`actions/handlers/composedDownloadHandler.ts:5-6`):

```ts
input.all.length === 1 ? downloadHandler(input) : zipDownloadHandler(input);
```

- **1 file** → `downloadHandler` → direct presigned `getUrl` + `<a download>` (single HEAD). Same as today's row-level download.
- **≥2 files** → `zipDownloadHandler` → SW stream _or_ blob fallback (blob in this harness). Multiple HEADs + `'All files downloaded.'`.

### Feasibility verdict

- **MUST (high-confidence, UI-observable):** folder selection enables Download menuitem; enumeration message; file rows render; Start gated by `allFoldersReady`; no-files/empty; enumeration error; per-row removal; single-file direct route (existing); multi-file zip route via HEAD×N + completion message; **blob fallback is the implicit default path** (so "multi-file zip" scenarios _are_ the fallback path).
- **STRETCH:** zip filename == selected-folder name (via `cy.readFile`); over-file-limit (needs 5000+ seeded files — infeasible, document only).
- **NOT e2e-testable here:** SW-streamed byte delivery / `/amplify-storage-download/` fetch; cancel-mid-stream browser-dialog dismissal; keepalive.

---

## 2. FEATURE FILES

**Decision:** Keep the existing `download.feature` untouched (its two row-level scenarios still pass). **Add one new file** `packages/e2e/features/ui/components/storage/storage-browser/folder-download.feature` for the batch/folder flows. Do **not** add a separate `sw-download.feature` (SW path is untestable here, §1a).

Path: `packages/e2e/features/ui/components/storage/storage-browser/folder-download.feature`

Shared Background (copied verbatim from `download.feature` / `folder-deletion.feature`):

```gherkin
Feature: Folder & multi-file download on Storage Browser

  Background:
    Given I'm running the example "ui/components/storage/storage-browser/default-auth"
    And I type my "email" with status "CONFIRMED"
    And I type my password
    And I click the "Sign in" button
```

### Scenarios (priority tagged inline as comments; all carry `@react`)

**S1 — MUST — Selecting a folder enables the batch Download action**

```gherkin
  When I click the first button containing "public"
  Then I click checkbox for button containing "DoNotDeleteThisFolder_CanDeleteAllChildren"
  When I click the "Menu Toggle" button
  Then I see the "Download" menuitem
```

Reuses: `click first button containing`, `click checkbox for button containing`, `Menu Toggle` click, `see … menuitem`. **All existing.**

**S2 — MUST — Folder enumeration shows the listing message, then renders file rows**

```gherkin
  When I click the first button containing "public"
  Then I click checkbox for button containing "DoNotDeleteThisFolder_CanDeleteAllChildren"
  When I click the "Menu Toggle" button
  When I click the "Download" menuitem
  Then I see "Listing folder contents"
  Then the table should have "1" rows
```

Notes: assert the **substring** `Listing folder contents` (avoid the trailing `…` U+2026 in `enumeratingMessage: 'Listing folder contents…'`). `the table should have "N" rows` already exists (`storagebrowser.ts`). Row count must match the seeded folder's file count (see §4 — adjust "1" to real count).

**S3 — MUST — Start (Download button) disabled during enumeration, enabled once folders are ready**

```gherkin
  … open Download view on a folder selection …
  Then the "Download" button is disabled
  Then the "Download" button is enabled
```

Reuses `the "{name}" button is disabled|enabled` (existing). The disabled assertion targets the transient `isEnumerating` state (also covers `isActionStartDisabled` in `DownloadViewProvider.tsx:113-135`). **Flaky risk:** enumeration may settle before the disabled assertion runs (see §7); if flaky, drop the `disabled` line and keep only `enabled` (SHOULD).

**S4 — MUST — Multi-file (zip) download succeeds via the batch route**

```gherkin
  When I click the first button containing "public"
  Then I click checkbox for button containing "DoNotDeleteThisFolder_CanDeleteAllChildren"
  When I click the "Menu Toggle" button
  When I click the "Download" menuitem
  Then I start the download and see "2" file validations succeed
  Then I see "All files downloaded."
```

Uses **new step** `I start the download and see "{int}" file validations succeed` (§3, new-1). `All files downloaded.` is the exact success string (`downloadView.ts:16`). Set the int to the real seeded file count.

**S5 — MUST — Single-file selection uses the direct route (regression guard for the composed handler)**

```gherkin
  When I click the first button containing "public"
  Then I see download for file "001_dont_delete_file.txt"
  Then I click and see download succeed for "001_dont_delete_file.txt"
```

100% reuse of existing `download.feature` steps — proves `all.length === 1 → downloadHandler`. (Optional: this duplicates existing coverage; include only if consolidating.)

**S6 — SHOULD — No-files message when only empty folders are selected**

```gherkin
  … create an empty folder (Create Folder flow from folder-deletion.feature) …
  Then I click checkbox for button containing random name
  When I click the "Menu Toggle" button
  When I click the "Download" menuitem
  Then I see "The selected folders contain no files to download."
```

Exact string from `noFilesMessage` (`downloadView.ts`). Reuses the Create-Folder step sequence already proven in `folder-deletion.feature`.

**S7 — SHOULD — Per-row removal drops a file from the batch**

```gherkin
  … open Download view on a folder with ≥2 files …
  Then the table should have "2" rows
  When I click the remove button on the first download row
  Then the table should have "1" rows
```

Uses **new step** `I click the remove button on the first download row` (§3, new-2). Verifies `onTaskRemove` / `removedItemIds` (`useDownloadView.ts` onTaskRemove).

**S8 — SHOULD — Enumeration error surfaces the retry message**

```gherkin
  When I click the first button containing "public"
  Then I click checkbox for button containing "DoNotDeleteThisFolder_CanDeleteAllChildren"
  When A network failure occurs
  When I click the "Menu Toggle" button
  When I click the "Download" menuitem
  Then I see "Failed to list folder contents"
```

Reuses `A network failure occurs` (destroys requests → `list()` rejects → `isEnumerationError`). Exact string prefix of `enumerationErrorMessage`. **Risk:** `A network failure occurs` destroys _all_ requests including the menu/route needed to open the view; may need `A network failure occurs after a delay` (existing) or reorder so the intercept is armed only after the view is opened. Implementation agent must confirm which ordering actually reaches the error branch (mark SHOULD).

**S9 — SHOULD — Cancel during enumeration returns to idle**

```gherkin
  … open Download view on a large-ish folder …
  Then I see "Listing folder contents"
  When I click the "Cancel" button
  Then the "Exit" button is enabled
```

Targets `onActionCancel` enumerating branch (`useDownloadView.ts`). Reuses `click "{name}" button`, `the "{name}" button is enabled`. **Race-prone** (enumeration may finish first) — mark SHOULD.

**S10 — STRETCH — Zip is named after the selected folder**

```gherkin
  … multi-file folder download via Download button …
  Then I see "All files downloaded."
  Then a zip file named "DoNotDeleteThisFolder_CanDeleteAllChildren.zip" was downloaded
```

Uses **new step** `a zip file named "{string}" was downloaded` (§3, new-3, `cy.readFile('cypress/downloads/…')`). Verifies single-folder naming rule (`resolveArchiveName` → folder basename, `DownloadView/utils.ts`). **Blob-fallback download persistence is unproven — STRETCH only.**

**Not planned (documented in §7):** over-file-limit (`tooManyFilesMessage`, needs 5000+ files); SW-streamed delivery; longest-common-ancestor naming across multiple folders (needs multi-folder seed + readFile).

---

## 3. STEP DEFINITIONS

Add to `packages/e2e/cypress/integration/common/storagebrowser.ts`.

**Reused (no change):** `I'm running the example`, `I type my … / password / Sign in` (shared.ts/sign-in.ts), `I click the first button containing`, `I click checkbox for button containing`, `I click the "{name}" button`, `I click the "{name}" menuitem`, `I see the "{name}" menuitem`, `I see "{string}"`, `the table should have "{string}" rows`, `the "{name}" button is disabled|enabled`, `A network failure occurs [after a delay]`, `I see download for file`, `I click and see download succeed for`.

**New steps:**

- **new-1 — `Then('I start the download and see {int} file validations succeed', (n) => …)`**
  Approach: `cy.intercept('HEAD','https://*.s3.*.amazonaws.com/**').as('dl')` **before** clicking; click the Start button via `cy.findByRole('button',{name:/^Download$/i})`; then `for i in 0..n-1: cy.wait('@dl').its('response.statusCode').should('eq',200)`. Mirrors existing `I click and see download succeed for` but loops N times for the zip batch.

- **new-2 — `When('I click the remove button on the first download row', () => …)`**
  Approach: within the first `table tbody tr`, click the row's remove/cancel control. Selector to confirm from `downloadResolvers.ts` (the per-row remove control rendered when `onTaskRemove` is provided) — likely `cy.get('table tbody tr').first().find('button').last().click({force:true})` or a `findByLabelText` on the remove aria-label. Implementation agent MUST read `views/utils/tableResolvers/downloadResolvers.ts` to get the exact button/aria-label.

- **new-3 (STRETCH) — `Then('a zip file named {string} was downloaded', (name) => …)`**
  Approach: `cy.readFile(\`cypress/downloads/${name}\`, { timeout: 15000 }).should('exist')`. Only used by S10.

Optional convenience (only if S3/S9 phrasing needs it) — none required; existing button-state steps suffice.

---

## 4. FIXTURES / BACKEND ⚠️ DEPENDENCY / RISK

Backend is seeded via gen2 (app-id `d3w3sj6rqvjdb0`, branch `gen2-storage-backend`, `us-east-2`); tests target **seeded paths**. Confirmed seeded references already used by existing specs:

- `public/` (navigable via `I click the first button containing "public"`).
- `public/001_dont_delete_file.txt` (single-file download, `download.feature`).
- `public/DO_NOT_DELETE/` (folder, `download.feature` negative case).
- `DoNotDeleteThisFolder_CanDeleteAllChildren` (folder used by `folder-deletion.feature`).

**What the folder-download scenarios need:** a **stable, non-mutating folder under `public/` containing a known, small (2–5) number of real files**, ideally with at least one nested subfolder, whose contents will NOT be changed by other specs.

- `folder-deletion.feature` **uploads into and deletes** `DoNotDeleteThisFolder_CanDeleteAllChildren`, so its file count is **not stable** — do **not** hard-code a row count against it.
- **RISK:** No confirmed pre-seeded read-only multi-file folder with a fixed count exists. Options for the implementation agent, in order of preference:
  1. **Discover an existing stable folder** by manually running the app against the seeded backend and picking a folder with fixed contents; hard-code its real count in S2/S4/S7.
  2. If none exists, scenarios that assert an exact row count become **blocked on new seed data** — this requires reseeding gen2, which is **out of this agent's authority**. Flag to human (see §7). Fall back to count-agnostic assertions (`the table should have at least 1 row` — would need a new step) or use the `public/` root itself if it holds ≥2 stable files.
- **Do NOT assume you can reseed.** State this dependency explicitly in the handoff back to the human.

---

## 5. TAGS & RUN

- **Tag:** every scenario gets `@react` (matches all existing storage-browser scenarios; the storage suite has no per-framework split).
- **Local run prerequisites** (two terminals):
  1. Build + start the example on port 3000: from repo root `cd examples/next && yarn build && yarn start` (or the repo's documented example-serve script). The e2e `baseUrl` is `http://localhost:3000/`.
  2. Env: `packages/e2e` reads `.env` via `dotenv` — `VALID_PASSWORD`, `USERNAME`, email alias envs must be set (same as any existing storage e2e run).
  3. Run only these specs:
     ```bash
     cd packages/e2e
     yarn cypress run --spec 'features/ui/components/storage/storage-browser/folder-download.feature' --browser chrome
     ```
     Or the whole storage suite: `yarn test:storage` (globs `features/ui/components/storage/**/*.feature`).
  4. Interactive debugging: `yarn dev` (`cypress open`).
- **CI touchpoints:** `.github/workflows/reusable-e2e.yml` (the reusable e2e workflow). The storage job runs `test:storage`, which auto-includes the new `.feature` (glob-based, no workflow edit needed). Verify the storage e2e job's env/seed wiring there; do not add a new job.

---

## 6. TASK BREAKDOWN (ordered, dependency-aware)

Assumes a fresh branch off `bobbor/feat/folder-download` already exists. Agentic effort estimates.

- [ ] **T1** (dep: none, ~10m) Read `views/utils/tableResolvers/downloadResolvers.ts` to get the exact **per-row remove control** selector/aria-label (needed for new-2 / S7).
- [ ] **T2** (dep: none, ~15m) Manually (or via a throwaway `cy dev` session) identify a **stable multi-file folder** under `public/` on the seeded backend and record its exact file count + any nested subfolder. If none is stable → **STOP, flag §4/§7 to human** before writing count-based scenarios.
- [ ] **T3** (dep: T1, ~15m) Add the 3 new step defs (new-1, new-2, new-3) to `storagebrowser.ts`. Reuse existing patterns; do not duplicate existing steps.
- [ ] **T4** (dep: T2, ~30m) Create `folder-download.feature` with the Background + MUST scenarios S1–S5 (use the real count from T2).
- [ ] **T5** (dep: T4, ~20m) Add SHOULD scenarios S6–S9.
- [ ] **T6** (dep: T4, ~10m) Add STRETCH scenario S10 (guarded, keep it isolated so its flakiness can't fail the MUST set).
- [ ] **T7 — VERIFY** (dep: T3–T6, ~20m) Start the example, then `cd packages/e2e && yarn cypress run --spec '…/folder-download.feature' --browser chrome`. Iterate on selector/race issues. **All MUST scenarios must pass green** before handoff. Record which SHOULD/STRETCH pass vs are quarantined.
- [ ] **T8** (dep: T7, ~10m) Run the full `yarn test:storage` once to confirm no regression in `download.feature` / `folder-deletion.feature`.
- [ ] **T9** (dep: T7) Hand results back: list passing MUST scenarios, any quarantined SHOULD/STRETCH, and the §4 seed-data decision. Do NOT open the PR until the human validates the flaky/seed items (§7).

**Verification gate (MCM mantra):** new feature code (steps) exercised by new scenarios; specs run green; no lint break in `storagebrowser.ts`; existing storage specs still pass (T8).

---

## 7. RISKS / OPEN QUESTIONS

1. **SW path untestable in this harness (confirmed).** The default-auth example registers no SW and serves no `download-sw.js`, so all multi-file downloads use the **blob fallback**. True SW streaming (`/amplify-storage-download/` fetch, Content-Disposition) cannot be e2e-verified without a source change to register+serve the SW on the example page — **out of scope; flag to human** whether that example change is desired for a dedicated SW e2e.
2. **Download filename assertion is weak.** Filename (`${folder}.zip`) is never rendered in the UI; only `cy.readFile` on `cypress/downloads` can confirm it, and blob-fallback download persistence in headless Chrome is unproven/flaky → **STRETCH only** (S10). MUST scenarios rely on HEAD 200 + completion message.
3. **Cold-start / app-router race (known repo issue).** `defaultCommandTimeout` is 15s; the repo has a documented Next app-router + Cypress cold-start flake. Transient-state assertions (S3 `disabled`, S9 cancel-during-enumeration) race against fast enumeration and may be intermittently red — keep them SHOULD and quarantine if flaky; prefer the settled-state assertions.
4. **`A network failure occurs` blast radius (S8).** It destroys _all_ requests; arming it too early can block opening the DownloadView itself, never reaching the enumeration-error branch. Needs careful ordering / possibly the `…after a delay` variant. Confirm during T7.
5. **Seed-data dependency (§4).** No confirmed pre-seeded read-only folder with a _fixed_ file count. `DoNotDeleteThisFolder_CanDeleteAllChildren` mutates in the deletion suite. Exact row-count scenarios (S2/S4/S7) are **blocked on identifying stable seed data or reseeding gen2** — reseeding is **not** in the implementation agent's authority. **Human decision required.**
6. **Per-row remove selector unknown until T1.** new-2's selector must be read from `downloadResolvers.ts`, not guessed.
7. **Over-file-limit (`tooManyFilesMessage`, 5000-file cap)** is not feasible to seed → documented, not automated.

**Human/manual validation required before PR:** (a) whether to modify the example to register the SW for a dedicated SW e2e; (b) the seed-data question in §5/§4; (c) sign-off on any quarantined flaky SHOULD/STRETCH scenarios.
