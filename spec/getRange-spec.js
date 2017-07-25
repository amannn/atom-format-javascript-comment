'use babel';

const Range = require('atom').Range;
const getRange = require('../lib/getRange');

function createEditor(lines, ranges) {
  return {
    getSelectedBufferRanges() {
      return ranges;
    },
    lineTextForBufferRow(row) {
      return lines[row];
    },
    getLineCount() {
      return lines.length;
    }
  };
}

describe('getRange', () => {
  it('expands a partial selection to a full line', () => {
    const ranges = [new Range([1, 2], [1, 3])];
    const lines = ['let test = 2;', '// a comment', 'test++;'];
    const editor = createEditor(lines, ranges);
    const result = getRange(editor);
    expect(result).toEqual([new Range([1, 0], [1, 12])]);
  });

  it('expands a partial selection across multiple lines to full lines', () => {
    const ranges = [new Range([1, 2], [2, 3])];
    const lines = [
      'let test = 2;',
      '// a comment',
      '// another comment',
      'test++;'
    ];
    const editor = createEditor(lines, ranges);
    const result = getRange(editor);
    expect(result).toEqual([new Range([1, 0], [2, 18])]);
  });

  it('automatically finds multiline // comments', () => {
    const ranges = [new Range([1, 2], [1, 2])];
    const lines = [
      'let test = 2;',
      '// a comment',
      '// another comment',
      'test++;'
    ];
    const editor = createEditor(lines, ranges);
    const result = getRange(editor);
    expect(result).toEqual([new Range([1, 0], [2, 18])]);
  });

  it('automatically finds multiline * comments', () => {
    const ranges = [new Range([4, 2], [4, 2])];
    const lines = [
      'let test = 2;',
      '',
      '/**',
      ' * desc line 1',
      ' * desc line 2',
      ' * @param {number} param1 description',
      ' * @param {number} param2 description',
      ' * continued description',
      ' * @return {number} description',
      ' */',
      'test = 3;'
    ];
    const editor = createEditor(lines, ranges);
    const result = getRange(editor);
    expect(result).toEqual([new Range([3, 0], [8, 31])]);
  });
});
