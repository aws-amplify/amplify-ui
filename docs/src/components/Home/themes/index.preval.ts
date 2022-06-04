import preval from 'next-plugin-preval';
import fs from 'fs';
import terminalTheme from './terminalTheme';
import classicTheme from './classicTheme';
import defaultTheme from './defaultTheme';
import synthwaveTheme from './synthwaveTheme';

const terminalStr = fs.readFileSync(__dirname + '/terminalTheme.ts', {
  encoding: 'utf-8',
});
const classicStr = fs.readFileSync(__dirname + '/classicTheme.ts', {
  encoding: 'utf-8',
});
const defaultStr = fs.readFileSync(__dirname + '/defaultTheme.ts', {
  encoding: 'utf-8',
});
const synthwaveStr = fs.readFileSync(__dirname + '/synthwaveTheme.ts', {
  encoding: 'utf-8',
});

export default preval({
  terminal: {
    string: terminalStr,
    code: terminalTheme,
  },
  synthwave: {
    string: synthwaveStr,
    code: synthwaveTheme,
  },
  classic: {
    string: classicStr,
    code: classicTheme,
  },
  default: {
    string: defaultStr,
    code: defaultTheme,
  },
});
