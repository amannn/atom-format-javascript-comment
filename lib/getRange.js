'use babel';

const Range = require('atom').Range;

function autoFindRange(editor, range) {
  if (range.isEmpty()) {
    range = new Range(
      [range.start.row, 0],
      [range.end.row, Number.POSITIVE_INFINITY]
    );

    const curLine = editor.lineTextForBufferRow(range.start.row);
    const matches = curLine.match(/^(\s*)(\/\/|\*)(\s*)/);
    if (!matches) return range;
    let [
      _, whitespaceBefore, symbol, whitespaceAfter // eslint-disable-line
    ] = matches;

    const matchRegex = new RegExp(
      '^' + whitespaceBefore + '\\' + symbol + whitespaceAfter
    );

    const doesRowMatch = rowNumber => {
      const match = editor.lineTextForBufferRow(rowNumber).match(matchRegex);
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

/**
 * Removes non-comment lines and makes sure the `/**`
 * is part of the range if it is such a comment.
 */
function cleanupRange(editor, range) {
  return range;
}

function selectFullLine(editor, range) {
  const startRow = range.start.row;
  const startCol = 0;
  const endRow = range.end.column === 0 ? range.end.row - 1 : range.end.row;
  const endCol = editor.lineTextForBufferRow(endRow).length;
  return new Range([startRow, startCol], [endRow, endCol]);
}

module.exports = function getRange(editor) {
  return editor
    .getSelectedBufferRanges()
    .map(
      range =>
        range.isEmpty()
          ? autoFindRange(editor, range)
          : cleanupRange(editor, range)
    )
    .map(range => selectFullLine(editor, range));
};

/**
 * todo
 *  - fix autoFindRange to find `/**`
 *  - implement cleanupRange
 *  - formatCommentLines needs to detect which of the three comment types it is
 */
