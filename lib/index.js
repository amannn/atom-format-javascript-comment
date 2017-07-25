'use babel';

const getRange = require('./getRange');
const formatCommentLines = require('./formatCommentLines');

function formatComment(editor) {
  const commentRange = getRange(editor);
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
        const editor = atom.workspace.getActiveTextEditor();
        return formatComment(editor);
      }
    })
};
