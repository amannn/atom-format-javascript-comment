'use babel';

const Range = require('atom').Range;

module.exports = class RangeFinder {
  static rangesFor(editor) {
    return new RangeFinder(editor).ranges();
  }

  constructor(editor) {
    this.editor = editor;
  }

  ranges() {
    return this.selectionRanges().map(selectionRange =>
      this.sortableRangeFrom(selectionRange)
    );
  }

  selectionRanges() {
    return this.editor.getSelectedBufferRanges().filter(range =>
      !range.isEmpty()
    );
  }

  sortableRangeFrom(selectionRange) {
    let startRow = selectionRange.start.row;
    let startCol = 0;
    let endRow = selectionRange.end.column === 0
      ? selectionRange.end.row - 1
      : selectionRange.end.row;
    let endCol = this.editor.lineTextForBufferRow(endRow).length;
    return new Range([startRow, startCol], [endRow, endCol]);
  }
};
