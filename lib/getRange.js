'use babel';

const Range = require('atom').Range;

function autoFindRange(editor, range) {
  if (range.isEmpty()) {
    range = new Range(
      [range.start.row, 0],
      [range.end.row, Number.POSITIVE_INFINITY]
    );

    let curLine = editor.lineTextForBufferRow(range.start.row);
    let matches = curLine.match(/^(\s*)(\/\/|\*)(\s*)/);
    if (!matches) return range;
    let [
      _, whitespaceBefore, symbol, whitespaceAfter // eslint-disable-line
    ] = matches;

    let matchRegex = new RegExp(
      '^' + whitespaceBefore + '\\' + symbol + whitespaceAfter
    );

    let doesRowMatch = rowNumber => {
      let match = editor.lineTextForBufferRow(rowNumber).match(matchRegex);
      return match !== null && match[0].trim().length > 0;
    };

    // Expand rows upwards
    let curRow = range.start.row;
    while (curRow >= 0) {
      if (doesRowMatch(curRow)) range.start.row = curRow;
      else break;
      curRow--;
    }

    // Expand rows downwards
    curRow = range.end.row;
    while (curRow < editor.getLineCount()) {
      if (doesRowMatch(curRow)) range.end.row = curRow;
      else break;
      curRow++;
    }

    return range;
  }
  return range;
}

function selectFullLine(editor, range) {
  let startRow = range.start.row;
  let startCol = 0;
  let endRow = range.end.column === 0 ? range.end.row - 1 : range.end.row;
  let endCol = editor.lineTextForBufferRow(endRow).length;
  return new Range([startRow, startCol], [endRow, endCol]);
}

module.exports = function getRange(editor) {
  return editor
    .getSelectedBufferRanges()
    .map(autoFindRange.bind(this, editor))
    .map(selectFullLine.bind(this, editor));
};
