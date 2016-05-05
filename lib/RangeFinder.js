'use babel';

const Range = require('atom').Range;

// Mostly from the sort lines plugin
module.exports = class RangeFinder {
  static rangesFor(editor) {
    return new RangeFinder(editor).ranges();
  }

  constructor(editor) {
    this.editor = editor;
  }

  ranges() {
    return this.getSelectionRanges()

      // Extend selections from the first column to the last,
      // so only complete lines are in the selection.
      .map(selectionRange => {
        let startRow = selectionRange.start.row;
        let startCol = 0;
        let endRow = selectionRange.end.column === 0
          ? selectionRange.end.row - 1
          : selectionRange.end.row;
        let endCol = this.editor.lineTextForBufferRow(endRow).length;
        return new Range([startRow, startCol], [endRow, endCol]);
      });
  }

  getSelectionRanges() {
    let ranges = this.editor.getSelectedBufferRanges();

    // Empty ranges will be auto-matched to an appropriate range
    return ranges.map(range => {
      if (range.isEmpty()) {
        range.start.column = 0;
        range.end.column = Number.POSITIVE_INFINITY;
        let curLine = this.editor.getTextInBufferRange(range);
        let matches = curLine.match(/^(\s*)(\/\/|\*)(\s*)/);
        if (!matches) return range;
        let [
          _, whitespaceBefore, symbol, whitespaceAfter // eslint-disable-line
        ] = matches;

        let matchRegex = new RegExp(
          '^' + whitespaceBefore + '\\' + symbol + whitespaceAfter
        );

        let doesRowMatch = (rowNumber) => {
          let curRange = new Range(
            [rowNumber, 0], [rowNumber, Number.POSITIVE_INFINITY]
          );
          let match = this.editor.getTextInBufferRange(curRange)
            .match(matchRegex);
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
        while (curRow < 1000) {
          if (doesRowMatch(curRow)) range.end.row = curRow;
          else break;
          curRow++;
        }

        return range;
      }
      return range;
    });
  }
};
