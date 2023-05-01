const checker = require('license-checker');
const path = require('path');

// A list of approved license
const approvedLicenses = [
  '0BSD',
  'Apache-2.0',
  'Boost',
  'BouncyCastle',
  'BSD-1-Clause',
  'BSD-2-Clause-FreeBSD',
  'BSD-2-Clause',
  'BSD-3-Clause-Attribution',
  'BSD-3-Clause',
  'BSD-Source-Code',
  'BSD',
  'bzip2',
  'CC-BY-3.0',
  'CC-BY-4.0',
  'CC0-1.0',
  'curl',
  'EDL',
  'HDF5',
  'ISC',
  'JSON',
  'libjpeg',
  'libpng',
  'MIT',
  'MPL-2.0',
  'NTP',
  'OFL-1.0',
  'OLDAP-2.8',
  'OpenSSL',
  'PDDL-1.0',
  'PIL',
  'PostgreSQL',
  'Python-2.0',
  'Python-2.1.1',
  'Spencer-94',
  'SQLite',
  'Unicode-DFS-2015',
  'Unicode-DFS-2016',
  'Unlicense',
  'WTFPL-2.0',
  'WTFPL',
  'X11',
  'zlib-acknowledgement',
  'Zlib',
];

// Excluding packages that are either unlicensed or license cannot be inferred correctly
const excludePackages = [
  // This is MIT licensed but cannot infer correclty
  // https://github.com/mapbox/jsonlint
  '@mapbox/jsonlint-lines-primitives@2.0.2',
  // This is MIT licensed but cannot infer correclty
  // https://github.com/tecfu/breakword
  'breakword@1.0.5',
  // This package does not exist in Github but still available in npm without being licensed
  // https://www.npmjs.com/package/buffers
  'buffers@0.1.1',
];

checker.init(
  {
    start: path.resolve(__dirname, '..'),
    onlyAllow: approvedLicenses.join(';'),
    excludePackages: excludePackages.join(';'),
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
