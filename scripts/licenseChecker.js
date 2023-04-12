const checker = require('license-checker');
const path = require('path');

// The licenses prohibited from use at Amazon - https://policy.a2z.com/docs/82477/publication
const prohibitedLicenses = [
  'AGPL-1.0',
  'AGPL-3.0',
  'APSL-2.0',
  'CDLA-1.0',
  'CPAL-1.0',
  'MIT-enna',
  'EUPL-1.1',
  'EUPL-1.2',
  'LGPL-3.0',
  'GPL-3.0',
  'HPL-1.0',
  'NOSA-1.3',
  'ODbL',
  'OSL-3.0',
  'Parity-7.0',
  'RPSL-1.0',
  'SSPL-1.0',
  'BSL-1.1',
  'Commons-Clause',
  'CRAPL',
  'CC-BY-NC-1.0',
  'CC-BY-NC-2.0',
  'CC-BY-NC-2.5',
  'CC-BY-NC-3.0',
  'CC-BY-NC-4.0',
  'ELv2',
  'Prosperity-3.0',
  'RSALv1',
  "UC Berkeley's Standard Copyright and Disclaimer Notice",
  'University of Wisconsin Web Cache Simulator License',
];

checker.init(
  {
    start: path.resolve(__dirname, '..'),
    failOn: prohibitedLicenses.join(';'),
    excludePrivatePackages: true,
  },
  function (error) {
    if (error) {
      console.log(error);
    } else {
      console.log('✅ No prohibited licenses found.');
    }
  }
);
