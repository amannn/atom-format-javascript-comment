'use babel';

const MAX_TOTAL_LINE_LENGTH = 80;

/**
 * First, hacky implementation. But the tests pass :).
 * @param {array} lines
 * @return {array} The formatted lines.
 */
module.exports = function formatCommentLines(lines) {
  if (lines.length === 0) return lines;

  let whitespaceBefore = lines[0].match(/^\s*/);
  let symbol = lines[0].match(/\/\/|\*/)[0];
  let whitespaceAfter = ' ';

  let comment = lines
    // Remove whitespace and symbol
    .map(line =>
      line
        .replace(new RegExp('^' + whitespaceBefore + '\\' + symbol), '')
        .trimLeft()
    ).join(' ');

  let maxLineLength = MAX_TOTAL_LINE_LENGTH
    - whitespaceBefore.length
    - symbol.length
    - whitespaceAfter.length;

  let parts = comment.split(' ');
  let newLines = [];
  let curLine = -1;

  while (parts.length > 0) {
    if (
      newLines[curLine] === undefined
      || newLines[curLine].length + parts[0].length > maxLineLength
    ) {
      curLine++;
      newLines[curLine] = '';
    }
    newLines[curLine] += parts[0] + ' ';
    parts.splice(0, 1);
  }

  // Insert comment symbol
  newLines = newLines.map(line =>
    whitespaceBefore + symbol + whitespaceAfter + line.trimRight()
  );

  return newLines;
};
