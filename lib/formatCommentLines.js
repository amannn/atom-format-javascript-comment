'use babel';

const fairLines = require('fair-lines');

const MAX_TOTAL_LINE_LENGTH = 80;
const JSDOC_TAGS = [
  '@author',
  '@constructor',
  '@deprecated',
  '@exception',
  '@exports',
  '@param',
  '@private',
  '@property',
  '@return',
  '@returns',
  '@see',
  '@this',
  '@throws',
  '@version'
];

/**
 * @param {array} lines
 * @return {array} The formatted lines.
 */
module.exports = function formatCommentLines(lines) {
  if (lines.length === 0) return lines;

  // Remember the whitespace before the symbol,
  // after the symbol and the symbol itself.
  const whitespaceBefore = lines[0].match(/^\s*/);
  const symbol = lines[0].match(/\/\/|\*/)[0];
  const whitespaceAfter = ' ';

  // Remove whitespace and symbol
  const comment = lines
    .map(line =>
      line
        .replace(new RegExp('^' + whitespaceBefore + '\\' + symbol), '')
        .trimLeft()
    )
    .join(' ');

  const maxLineLength =
    MAX_TOTAL_LINE_LENGTH -
    whitespaceBefore.length -
    symbol.length -
    whitespaceAfter.length;

  const jsdocGroup = '(' + JSDOC_TAGS.join('|') + ')';
  const splitLineRegex = new RegExp(`${jsdocGroup}.*?(?=${jsdocGroup}|$)`, 'g');
  let newLines = [];
  const result = comment.replace(splitLineRegex, match => {
    newLines.push(match);
    return '';
  });

  if (newLines.length === 0) newLines.push(comment);
  else newLines.unshift(result);

  newLines = newLines.map(line =>
    fairLines.balanced(line, {
      width: maxLineLength
    })
  );

  // Flatten the two dimensional array
  newLines = newLines.concat.apply([], newLines);

  // Insert comment symbol with the whitespace
  newLines = newLines.map(
    line => whitespaceBefore + symbol + whitespaceAfter + line.trimRight()
  );

  return newLines;
};
