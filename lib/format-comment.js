'use babel';

const RangeFinder = require('./RangeFinder');
const formatCommentLines = require('./formatCommentLines');

function formatComment(editor) {
  let commentRange = RangeFinder.rangesFor(editor);
  commentRange.forEach(range => {
    let textLines = editor.getTextInBufferRange(range).split(/\r?\n/g);
    textLines = formatCommentLines(textLines);
    editor.setTextInBufferRange(range, textLines.join('\n'));
  });
}

module.exports = {
  activate: () =>
    atom.commands.add('atom-text-editor:not([mini])', {
      'format-comment': () => {
        let editor = atom.workspace.getActiveTextEditor();
        return formatComment(editor);
      },
    })
};
