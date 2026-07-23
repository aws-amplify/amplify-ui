Feature: Service worker vs blob download path on Storage Browser

  # Unlike folder-download.feature these scenarios cannot share a Background that
  # boots the example: each needs a DIFFERENT page visit (SW disabled to force
  # the blob fallback vs SW served/active to exercise the SW path) and Gherkin
  # runs Background steps before any scenario step. The visit-variant + sign-in
  # sequence is therefore inlined per scenario; the sign-in steps are reused
  # verbatim (sign-in.ts), exactly as folder-download.feature signs in. The
  # instrumented cy.visit MUST remain the scenario entry so the onBeforeLoad
  # stubs (createObjectURL / anchor.click, plus the SW-disabling navigator stub)
  # are installed before app scripts run; all seeding thereafter is via SPA
  # clicks with NO page reload, so the stubs stay intact.
  #
  # Seeding strategy (shared with folder-download.feature): each scenario mints a
  # UNIQUE fresh folder per run and uploads into it (empty by construction — no
  # delete, no overwrite collision). File COUNTS are never hard-coded; only the
  # deterministic per-run folder name and its resulting zip name are asserted.
  # A single selected folder X yields a zip named "X.zip" whose entries are each
  # prefixed "X/" (computed relative to the current "public/" browse prefix) — a
  # raw-byte substring that proves archive contents without unzipping.

  @react
  Scenario: Folder download uses the blob fallback and produces a correctly named, valid zip
    Given I'm running the example "ui/components/storage/storage-browser/default-auth" with the download service worker disabled
    And I type my "email" with status "CONFIRMED"
    And I type my password
    And I click the "Sign in" button
    # Self-seed a fresh unique folder with 3 files so the zip has real multi-file
    # contents (no disk fixture, no pre-delete required).
    Given I use a unique download test folder
    When I click the first button containing "public"
    When I click the "Menu Toggle" button
    When I click the "Upload" menuitem
    When I upload "3" files into the unique download folder
    When I click the "Upload" button
    Then I see "All files uploaded"
    When I click the "Exit" button
    When I open the download view for the unique download folder
    Then the download list has at least "3" file rows
    Then I click Start and every file row validates successfully
    Then I see "All files downloaded."
    Then the download used the blob path
    And the downloaded zip is named after the unique download folder
    And the downloaded zip is a valid archive containing the unique download folder

  @react
  Scenario: Folder download uses the service worker when it is registered and active
    Given I'm running the example "ui/components/storage/storage-browser/default-auth" with download instrumentation
    And I type my "email" with status "CONFIRMED"
    And I type my password
    And I click the "Sign in" button
    And I wait for the download service worker to be active
    # Self-seed a fresh unique folder with 3 files.
    Given I use a unique download test folder
    When I click the first button containing "public"
    When I click the "Menu Toggle" button
    When I click the "Upload" menuitem
    When I upload "3" files into the unique download folder
    When I click the "Upload" button
    Then I see "All files uploaded"
    When I click the "Exit" button
    When I open the download view for the unique download folder
    Then the download list has at least "3" file rows
    # Lightweight start (no N-HEAD wait): the SW zip stream stalls after file 1
    # in-harness, but the SW handshake sets __dlHref before any drain, so the
    # SW-path assertion (retrying) can confirm the path without completing.
    When I start the folder download
    Then the download used the service worker path
    And the downloaded zip is named after the unique download folder
