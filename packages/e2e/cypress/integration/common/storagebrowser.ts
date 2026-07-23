/// <reference types="@testing-library/cypress" />
/// <reference types="cypress" />
/// <reference types="../../support/commands" />

import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import { escapeRegExp } from 'lodash';

import { randomFileName } from './shared';

const FILE_VALIDATION_SIZE_LIMIT = 1000 * 1000; // 1MB

// Per-scenario unique download test folder name. Each seeding scenario mints a
// fresh, unique folder (empty by construction) instead of trying to empty a
// shared fixed folder — a fresh prefix has zero objects, so there is no delete,
// no 412 overwrite collision, and the run stays deterministic even if a prior
// run was killed. Set by "I use a unique download test folder" (upload creates
// it implicitly) or "I create a unique empty download test folder" (created
// empty via the create-folder action for the no-files case). Orphan folders
// accumulating across runs is an accepted tradeoff (handled by a separate
// periodic sweep).
let uniqueDownloadFolder = '';

// URL-safe unique name: only [a-z0-9-]. `Date.now()` disambiguates across runs,
// the random suffix disambiguates within the same millisecond.
const makeUniqueDownloadFolder = () =>
  `e2e-download-${Date.now()}-${Math.floor(Math.random() * 1e6)}`;

When(
  'I select {string} from the {string} dropdown',
  (value: string, label: string) => {
    cy.findByText(label).parent().find('select').select(value);

    // Wait for component remount and state updates to complete
    cy.wait(2000);
  }
);

const selectTableRowCheckBox = (name: string) => {
  cy.contains('table tbody td:nth-child(2)', new RegExp('^' + name + '$'))
    .siblings()
    .first()
    .within(() => {
      cy.get('label').click({ force: true });
    });
};

When(
  'I drag and drop a file into the storage browser with file name {string}',
  (fileName: string) => {
    cy.get('.amplify-storage-browser__drop-zone').trigger('drop', {
      dataTransfer: {
        files: [
          new File(['file contents'], fileName, {
            type: 'text/plain',
            lastModified: Date.now(),
          }),
        ],
      },
      /**
       *  Since the input is hidden, this will need to be forced through Cypress
       */
      force: true,
    });
  }
);

When(
  'I drag and drop a folder into the storage browser with name {string}',
  (folderName: string) => {
    cy.get('.amplify-storage-browser__drop-zone').trigger('drop', {
      dataTransfer: {
        files: [new File([], folderName, { lastModified: Date.now() })],
      },
      /**
       *  Since the input is hidden, this will need to be forced through Cypress
       */
      force: true,
    });
  }
);

Then('I see download for file {string}', (name: string) => {
  cy.contains('table tbody td:nth-child(2)', new RegExp('^' + name + '$'))
    .siblings()
    .last()
    .children('button');
});

Then('I see no download for folder {string}', (name: string) => {
  cy.contains('table tbody td:nth-child(2)', new RegExp('^' + name + '$'))
    .siblings()
    .last()
    .children('div');
});

Then('I click and see download succeed for {string}', (name: string) => {
  cy.intercept('HEAD', 'https://*.s3.*.amazonaws.com/**').as(
    'downloadValidation'
  );

  cy.contains('table tbody td:nth-child(2)', new RegExp('^' + name + '$'))
    .siblings()
    .last()
    .within(() => {
      cy.get('button').click({ force: true });

      cy.wait('@downloadValidation').then((interception) => {
        assert.equal(interception.response.statusCode, 200);
      });
    });
});

Then(
  'I click the download button with label {string} and see the file downloaded',
  (label: string) => {
    cy.intercept('HEAD', 'https://*.s3.*.amazonaws.com/**').as(
      'downloadValidation'
    );

    cy.findAllByLabelText(label).last().click();

    cy.wait('@downloadValidation').then((interception) => {
      assert.equal(interception.response.statusCode, 200);
    });
  }
);

Then('I click checkbox for file {string}', selectTableRowCheckBox);

Then('I click checkbox for file with random name', () => {
  selectTableRowCheckBox(randomFileName);
});

Then('I click checkbox for button containing random name', () => {
  cy.get('table tbody tr')
    .contains('button', new RegExp(randomFileName, 'i'))
    .closest('tr')
    .within(() => {
      cy.get('label').click({ force: true });
    });
});

Then('I see the File preview Loader', () => {
  cy.get('.amplify-storage-browser__preview-placeholder').should('exist');
});

Then(
  'I click checkbox for with {string} files with random names',
  (count: string) => {
    const fileCount = parseInt(count);
    for (let i = 1; i <= fileCount; i++) {
      selectTableRowCheckBox(`${randomFileName}-${i}`);
    }
  }
);

When(
  'I upload {string} valid files of size 1MB and type jpeg with random names',
  (count: string) => {
    cy.fileInputUpload(
      randomFileName,
      parseInt(count),
      FILE_VALIDATION_SIZE_LIMIT,
      'image/jpeg'
    );
  }
);

When(
  'I upload {string} invalid files with size greater than 1MB with random names',
  (count: string) => {
    cy.fileInputUpload(
      randomFileName,
      parseInt(count),
      FILE_VALIDATION_SIZE_LIMIT + 1
    );
  }
);

Then('I see button containing random name', () => {
  cy.findByRole('button', {
    name: new RegExp(randomFileName, 'i'),
  }).should('exist');
});

Then('I see {string} folder deleted', (count: string) => {
  cy.contains(`${count} folder deleted`).should('exist');
});

Then('I see {string} folders deleted', (count: string) => {
  cy.contains(`${count} folders deleted`).should('exist');
});

Then('I see modal with title {string}', (title: string) => {
  cy.get('.amplify-modal__title').should('contain.text', title);
});

When('I click the modal {string} button', (buttonText: string) => {
  cy.get('.amplify-modal__footer').contains('button', buttonText).click();
});

Then('I see modal message {string}', (message: string) => {
  cy.get('.amplify-modal__body').should('contain.text', message);
});

Then('I see modal content {string}', (content: string) => {
  cy.get('.amplify-modal__body').should('contain.text', content);
});

Then('I see folder button containing random name', () => {
  cy.findByRole('button', {
    name: new RegExp(`${randomFileName}/`, 'i'),
  }).should('exist');
});

Then('I see file button containing random name', () => {
  cy.findByRole('button', {
    name: new RegExp(`${randomFileName}-1`, 'i'),
  }).should('exist');
});

Then('I click checkbox for folder containing random name', () => {
  cy.get('table tbody tr')
    .contains('button', new RegExp(`${randomFileName}/$`, 'i'))
    .closest('tr')
    .within(() => {
      cy.get('label').click({ force: true });
    });
});

Then('I click checkbox for file containing random name', () => {
  cy.get('table tbody tr')
    .contains('button', new RegExp(`${randomFileName}-1$`, 'i'))
    .closest('tr')
    .within(() => {
      cy.get('label').click({ force: true });
    });
});

Then(
  'I click checkbox for button containing {string}',
  (buttonText: string) => {
    cy.get('table tbody tr')
      .contains('button', new RegExp(buttonText, 'i'))
      .closest('tr')
      .within(() => {
        cy.get('label').click({ force: true });
      });
  }
);

// --- Folder / multi-file download (PR #7046, #7044) --------------------------

// Row count captured before a per-row remove, so the follow-up assertion can
// verify the count dropped by exactly one (count-agnostic — no hard-coded total).
let downloadRowsBeforeRemove = 0;

// Asserts the DownloadView enumerated at least N file rows without hard-coding
// the folder's exact file count (fixtures may vary across seed runs).
Then('the download list has at least {string} file rows', (count: string) => {
  cy.get('table tbody tr', { timeout: 15000 }).should(
    'have.length.at.least',
    parseInt(count)
  );
});

// Arms the S3 HEAD (per-file download validation) intercept ahead of time so a
// later step can assert whether any per-file download was dispatched.
When('I arm the S3 download validation intercept', () => {
  cy.intercept('HEAD', 'https://*.s3.*.amazonaws.com/**').as(
    'downloadValidation'
  );
});

// The allFoldersReady gate: no per-file S3 validation should fire until Start.
Then('no S3 download validation has fired', () => {
  cy.get('@downloadValidation.all').should('have.length', 0);
});

// Clicks Start (the DownloadView action button, also labelled "Download") and
// asserts exactly one S3 HEAD validation succeeds per rendered download row.
// Count is read from the DOM, never hard-coded, so it tracks the seeded folder.
Then('I click Start and every file row validates successfully', () => {
  cy.intercept('HEAD', 'https://*.s3.*.amazonaws.com/**').as(
    'downloadValidation'
  );

  // Enumeration must fully settle BEFORE snapshotting the row count: the Start
  // button re-enables and the transient "Listing folder contents…" message
  // clears only once every folder is expanded. Counting earlier could miss
  // rows that render after the snapshot, silently under-validating.
  cy.findByRole('button', { name: /^Download$/i }).should('not.be.disabled');
  cy.contains('Listing folder contents…').should('not.exist');

  cy.get('table tbody tr').then(($rows) => {
    const fileCount = $rows.length;

    // Start button (button role) is disambiguated from the batch action
    // menuitem (menuitem role) that opened this view.
    cy.findByRole('button', { name: /^Download$/i }).click();

    for (let i = 0; i < fileCount; i += 1) {
      cy.wait('@downloadValidation')
        .its('response.statusCode')
        .should('eq', 200);
    }

    // Guard against over- OR under-firing: the total intercepted validations
    // must equal the enumerated row count exactly.
    cy.get('@downloadValidation.all').should('have.length', fileCount);
  });
});

// Removes the first pending (QUEUED) download row via its per-row control. The
// control's accessible name is `Remove item: <fileName>` (downloadResolvers.ts).
When('I remove the first file row from the download list', () => {
  cy.get('table tbody tr')
    .its('length')
    .then((length: number) => {
      downloadRowsBeforeRemove = length;
    });

  cy.findAllByLabelText(/^Remove item:/i)
    .first()
    .click({ force: true });
});

Then('the download row count decreases by one', () => {
  cy.get('table tbody tr').should('have.length', downloadRowsBeforeRemove - 1);
});

// Forces the DownloadView enumeration to fail. Scoped narrowly to the S3
// ListObjectsV2 (`list-type=2`) request so browsing/menu requests are
// unaffected — only the folder-contents listing rejects.
When('a folder listing failure occurs', () => {
  cy.intercept(
    {
      method: 'GET',
      hostname: /s3\..*\.amazonaws\.com/,
      query: { 'list-type': '2' },
    },
    { forceNetworkError: true }
  ).as('folderListFailure');
});

// Holds the enumeration LIST response open (same narrow `list-type=2` scope) so
// transient enumerating states (listing message, cancel-while-enumerating) are
// deterministically observable before the real response resolves.
When('folder listing is delayed', () => {
  cy.intercept(
    {
      method: 'GET',
      hostname: /s3\..*\.amazonaws\.com/,
      query: { 'list-type': '2' },
    },
    (req) => {
      req.on('response', (res) => {
        res.setDelay(2500);
      });
    }
  ).as('folderListDelayed');
});

// --- SW-vs-blob download path coverage (sw-download.feature) ------------------
// These steps discriminate the two folder-download delivery paths of
// zipdownload.ts: the service-worker stream path (anchor href points at
// `/amplify-storage-download/<id>`, URL.createObjectURL is never called) and the
// in-memory blob fallback (URL.createObjectURL(blob) → anchor href, taken when
// navigator.serviceWorker is absent or the download SW is not active).

declare global {
  interface Window {
    // Populated by the download instrumentation installed in onBeforeLoad.
    __dlHref?: string;
    __dlName?: string;
    __dlBlob?: Blob;
  }
}

// Captures the download trigger WITHOUT performing a real navigation/download:
// stubs URL.createObjectURL (its call is the blob-path marker and lets us read
// the produced zip bytes) and the anchor click (records href + download name,
// deliberately NOT calling through so no real file is saved). Shared by both
// visit-variant steps below.
const installDownloadInstrumentation = (win: Cypress.AUTWindow) => {
  win.__dlHref = undefined;
  win.__dlName = undefined;
  win.__dlBlob = undefined;

  cy.stub(win.URL, 'createObjectURL').callsFake((blob: Blob) => {
    win.__dlBlob = blob;
    return 'blob:captured';
  });
  cy.stub(win.URL, 'revokeObjectURL');
  // Only intercepts PROGRAMMATIC .click() calls; Cypress user clicks dispatch
  // native events rather than invoking this method, so sign-in/browse
  // interactions are unaffected.
  cy.stub(win.HTMLAnchorElement.prototype, 'click').callsFake(function (
    this: HTMLAnchorElement
  ) {
    win.__dlHref = this.href;
    win.__dlName = this.download;
  });
};

// Visit-variant: force the blob fallback by making navigator.serviceWorker
// undefined before app scripts run (initServiceWorkerStream's getRegistration
// guard then always chooses collectBlob), plus install the instrumentation.
When(
  "I'm running the example {string} with the download service worker disabled",
  (example: string) => {
    cy.visit(example, {
      onBeforeLoad(win) {
        Object.defineProperty(win.navigator, 'language', { value: 'en-US' });
        try {
          // Stub object (NOT undefined): the app both null-checks
          // `navigator.serviceWorker` AND does `'serviceWorker' in navigator`
          // followed by `.register(...)`. A getter returning undefined passes
          // the `in` check but makes `.register` throw synchronously on mount
          // (the hook's .catch cannot catch a sync throw). The stub registers
          // cleanly yet reports no active registration, so initServiceWorkerStream's
          // `!reg?.active` guard forces the blob fallback.
          Object.defineProperty(win.navigator, 'serviceWorker', {
            configurable: true,
            get: () => ({
              register: () => Promise.resolve(),
              getRegistration: () => Promise.resolve(undefined),
              addEventListener: () => {},
            }),
          });
        } catch {
          // Some engines expose navigator.serviceWorker as non-configurable;
          // the getRegistration guard still forces the blob path if this throws.
        }
        installDownloadInstrumentation(win);
      },
    });
  }
);

// Visit-variant: leave navigator.serviceWorker intact (so a served, active SW is
// used) and install the instrumentation.
When(
  "I'm running the example {string} with download instrumentation",
  (example: string) => {
    cy.visit(example, {
      onBeforeLoad(win) {
        Object.defineProperty(win.navigator, 'language', { value: 'en-US' });
        installDownloadInstrumentation(win);
      },
    });
  }
);

// Bounded recursive poll (NOT `.should` retry, which does not retry over the
// getRegistration promise) until the download SW registration is active.
When('I wait for the download service worker to be active', () => {
  const deadline = Date.now() + 20000;
  const poll = () => {
    cy.window().then((win) =>
      win.navigator.serviceWorker
        .getRegistration('/amplify-storage-download/')
        .then((reg) => {
          if (reg?.active) {
            return;
          }
          if (Date.now() > deadline) {
            throw new Error('Download service worker did not become active');
          }
          cy.wait(500).then(poll);
        })
    );
  };
  poll();
});

// Blob fallback: URL.createObjectURL was invoked (blob captured) and the anchor
// href is NOT the SW stream URL. Anchor `.href` resolves to an absolute URL, so
// we match the path segment rather than a leading slash.
Then('the download used the blob path', () => {
  cy.window().then((win) => {
    expect(win.__dlBlob, 'URL.createObjectURL captured a blob').to.exist;
    expect(
      win.__dlHref ?? '',
      'anchor href is not the SW stream URL'
    ).not.to.match(/\/amplify-storage-download\//);
  });
});

// Lightweight Start: clicks the DownloadView Start button (also labelled
// "Download") WITHOUT waiting for the N per-file HEAD validations. The SW path's
// zip stream stalls after file 1 in-harness (the stubbed anchor click never
// navigates, so the stream never drains and file 2's HEAD never fires), yet the
// SW handshake still sets __dlHref before any drain — so the SW-active assertion
// can run off just this start click.
When('I start the folder download', () => {
  cy.findByRole('button', { name: /^Download$/i }).click();
});

// SW path: the clicked anchor points at the SW stream URL and
// URL.createObjectURL was never called (no in-memory blob). Uses retrying
// cy.its()+should() (NOT a one-shot cy.window().then) because __dlHref is set
// asynchronously in the SW handshake ack (port1.onmessage) after Start; the
// query retries until the handshake populates it. `.href` resolves to an
// absolute URL, so match the path segment rather than a leading slash.
Then('the download used the service worker path', () => {
  cy.window()
    .its('__dlHref')
    .should('match', /\/amplify-storage-download\//);
  cy.window().its('__dlBlob').should('be.undefined');
});

// Shared zip assertions (used by both the literal-name steps below and the
// dynamic "unique download folder" variants). Extracted so the SW-vs-blob
// coverage and the unique-folder coverage validate the produced archive with
// identical logic.
const assertDownloadedZipNamed = (expected: string) => {
  cy.window().then((win) => {
    expect(win.__dlName).to.eq(expected);
  });
};

// Dependency-free zip validation: check the local-file-header magic
// (PK\x03\x04) and search the raw bytes for the entry path. Zip stores entry
// names uncompressed in the local/central headers, so a substring match proves
// the entry exists without unzipping.
const assertDownloadedZipContains = (entryName: string) => {
  cy.window().then((win) => {
    expect(win.__dlBlob, 'captured download blob').to.exist;
    return win.__dlBlob!.arrayBuffer().then((buffer) => {
      const bytes = new Uint8Array(buffer);
      expect(bytes.byteLength, 'zip byte length').to.be.greaterThan(0);
      expect(
        [bytes[0], bytes[1], bytes[2], bytes[3]],
        'PK\\x03\\x04 local file header magic'
      ).to.deep.equal([0x50, 0x4b, 0x03, 0x04]);

      const raw = new TextDecoder('latin1').decode(bytes);
      expect(raw, 'archive contains entry path').to.include(entryName);
    });
  });
};

// Dynamic-name variants: a single selected folder X yields a zip named "X.zip"
// whose entries are prefixed "X/" (resolveArchiveName / entry-path prefixing),
// so the fresh per-scenario folder name is asserted verbatim.
Then('the downloaded zip is named after the unique download folder', () => {
  assertDownloadedZipNamed(`${uniqueDownloadFolder}.zip`);
});

Then(
  'the downloaded zip is a valid archive containing the unique download folder',
  () => {
    assertDownloadedZipContains(`${uniqueDownloadFolder}/`);
  }
);

// --- Self-seeding setup: unique fresh folder per scenario -------------------
// A fresh, uniquely-named folder is empty by construction, so there is nothing
// to delete before seeding: no 412 overwrite collision, deterministic, and
// robust to killed runs (a prior run's orphan folder has a different name and
// is ignored). This replaces the old delete-based "ensure folder empty" flow,
// which never actually removed the S3 objects in this harness.

// Mint a fresh unique folder name for the scenario. Does NOT create it — the
// seeding upload creates it implicitly by uploading into "<folder>/<file>".
Given('I use a unique download test folder', () => {
  uniqueDownloadFolder = makeUniqueDownloadFolder();
});

// Seed the unique folder with N files, mirroring shared.ts's
// "I upload a folder ... with ... files" mechanism (cy.fileInputUpload with a
// "<folder>/<file>" prefix). Only the folder name differs (dynamic). The
// surrounding Upload menuitem / Upload button / "All files uploaded" steps stay
// in the feature, exactly as the original seeding flow. A fresh folder never
// collides, so the upload always succeeds.
When(
  'I upload {string} files into the unique download folder',
  (count: string) => {
    cy.fileInputUpload(
      `${uniqueDownloadFolder}/${randomFileName}`,
      parseInt(count)
    );
  }
);

// Create a fresh unique folder that is actually EMPTY (no upload), for the
// no-files scenario. Reuses folder-deletion.feature's create-folder controls
// (Menu Toggle -> "Create Folder" menuitem -> type name -> "Create Folder"
// button -> "Folder created" -> Exit); only the typed name is dynamic. Enters
// public/ first and Exit returns there, so the folder is selectable from the
// same listing the download-view step selects from.
Given('I create a unique empty download test folder', () => {
  uniqueDownloadFolder = makeUniqueDownloadFolder();

  cy.findAllByRole('button', { name: /public/i })
    .first()
    .click();
  cy.findByRole('button', { name: /^Menu Toggle$/i }).click();
  cy.findByRole('menuitem', { name: /^Create Folder$/i }).click();
  cy.typeInInputHandler('Folder name', uniqueDownloadFolder);
  cy.findByRole('button', { name: /^Create Folder$/i }).click();
  // App success text is "Folder created." (trailing period, createFolderView.ts),
  // so use a substring/contains match rather than findByText's exact match.
  cy.contains(/Folder created/i).should('exist');
  cy.findByRole('button', { name: /^Exit$/i }).click();
});

// Select the unique folder from the current (public/) listing and open the
// batch DownloadView. Reuses the proven per-row checkbox idiom ("I click
// checkbox for button containing …"), just with the dynamic folder name via
// escapeRegExp, then opens the batch Download action (Menu Toggle -> "Download"
// menuitem). Ordering note: steps that must arm an intercept BEFORE the
// enumeration LIST fires (e.g. "folder listing is delayed", "I arm the S3
// download validation intercept") are placed in the feature just before this
// step, since the "Download" menuitem click here triggers enumeration.
When('I open the download view for the unique download folder', () => {
  cy.get('table tbody tr')
    .contains('button', new RegExp(escapeRegExp(uniqueDownloadFolder), 'i'))
    .closest('tr')
    .within(() => {
      cy.get('label').click({ force: true });
    });

  cy.findByRole('button', { name: /^Menu Toggle$/i }).click();
  cy.findByRole('menuitem', { name: /^Download$/i }).click();
});
