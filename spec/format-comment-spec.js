'use babel';

const formatCommentLines = require('../lib/formatCommentLines');

describe('FormatComment', () => {
  describe('// comments', () => {
    it('turns one line into two lines', () => {
      expect(formatCommentLines([
        '// Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
      ])).toEqual([
        '// Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod',
        '// tempor incididunt ut labore et dolore magna aliqua.'
      ]);
    });

    it('turns one line into four lines', () => {
      expect(formatCommentLines([
        '// Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure'
      ])).toEqual([
        '// Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod',
        '// tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,',
        '// quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo',
        '// consequat. Duis aute irure'
      ]);
    });

    it('leaves one line as one line', () => {
      expect(formatCommentLines([
        '// Lorem ipsum dolor sit amet'
      ])).toEqual([
        '// Lorem ipsum dolor sit amet'
      ]);
    });

    it('respects two spaces', () => {
      expect(formatCommentLines([
        '  // Lorem ipsum dolor sit amet'
      ])).toEqual([
        '  // Lorem ipsum dolor sit amet'
      ]);
    });

    it('respects four spaces', () => {
      expect(formatCommentLines([
        '    // Lorem ipsum dolor sit amet'
      ])).toEqual([
        '    // Lorem ipsum dolor sit amet'
      ]);
    });

    it('respects a tab', () => {
      expect(formatCommentLines([
        '	// Lorem ipsum dolor sit amet'
      ])).toEqual([
        '	// Lorem ipsum dolor sit amet'
      ]);
    });

    it('respects multiple tabs', () => {
      expect(formatCommentLines([
        '		// Lorem ipsum dolor sit amet'
      ])).toEqual([
        '		// Lorem ipsum dolor sit amet'
      ]);
    });
  });
});
