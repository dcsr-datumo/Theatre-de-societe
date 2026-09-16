const assert = require('node:assert/strict');
const test = require('node:test');
const fs = require('node:fs');
const ts = require('typescript');
const { createRequire } = require('node:module');
const path = require('node:path');
const source = path.join(__dirname, '../src/app/models/format-knora-date.ts');
const compiled = ts.transpileModule(fs.readFileSync(source, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS }
}).outputText;
const mod = { exports: {} };
new Function('require', 'module', 'exports', compiled)(createRequire(source), mod, mod.exports);
const format = mod.exports.formatKnoraDate;
for (const [name, input, expected] of [
  ['missing', null, null],
  ['year', {year:1750}, '1750'],
  ['month', {year:1750,month:10}, '10/1750'],
  ['day', {year:1750,month:10,day:3}, '3/10/1750'],
  ['period', {start:{year:1747},end:{year:1771}}, '1747–1771'],
  ['equal endpoints', {start:{year:1750},end:{year:1750}}, '1750'],
  ['BCE', {year:50,era:'BCE'}, '50 av. J.-C.'],
  ['incomplete period', {start:{year:1750},end:{}}, null],
  ['missing year', {}, null]
]) test(name, () => assert.equal(format(input), expected));
