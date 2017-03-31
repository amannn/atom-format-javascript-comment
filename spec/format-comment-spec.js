/* eslint-disable max-len */
'use babel';

const formatCommentLines = require('../lib/formatCommentLines');

describe('formatCommentLines', () => {
  describe('// comments', () => {
    it('turns one line into two lines', () => {
      expect(formatCommentLines([
        '// Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
      ])).toEqual([
        '// Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed',
        '// do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
      ]);
    });

    it('turns one line into four lines', () => {
      expect(formatCommentLines([
        '// Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure'
      ])).toEqual([
        '// Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed',
        '// do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        '// Ut enim ad minim veniam, quis nostrud exercitation ullamco',
        '// laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure'
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

  describe('\\* comments', () => {
    it('turns one line into two lines', () => {
      expect(formatCommentLines([
        '* Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
      ])).toEqual([
        '* Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed',
        '* do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
      ]);
    });

    it('turns one line into four lines with leading spaces', () => {
      expect(formatCommentLines([
        '  * Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure'
      ])).toEqual([
        '  * Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed',
        '  * do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        '  * Ut enim ad minim veniam, quis nostrud exercitation ullamco',
        '  * laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure'
      ]);
    });

    it('respects multiple tabs', () => {
      expect(formatCommentLines([
        '		* Lorem ipsum dolor sit amet'
      ])).toEqual([
        '		* Lorem ipsum dolor sit amet'
      ]);
    });

    describe('JSDOC', () => {
      it('supports @param', () => {
        expect(formatCommentLines([
          '  * Description',
          '  * @param {string} test Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do.',
          '  * @param {string} [test = 2] Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        ])).toEqual([
          '  * Description',
          '  * @param {string} test Lorem ipsum dolor sit',
          '  * amet, consectetur adipisicing elit, sed do.',
          '  * @param {string} [test = 2] Lorem ipsum dolor sit',
          '  * amet, consectetur adipisicing elit, sed do eiusmod',
          '  * tempor incididunt ut labore et dolore magna aliqua.'
        ]);
      });
      it('supports @property', () => {
        expect(formatCommentLines([
          '  * Description',
          '  * @property {string} test Lorem ipsum'
        ])).toEqual([
          '  * Description',
          '  * @property {string} test Lorem ipsum'
        ]);
      });
    });

    it('doesn\'t advance for non-JSDOC @ signs', () => {
      expect(formatCommentLines([
        ' * This is an email: jan@amann.me. I\'m currently @ home. It\'s also possible to write it like @home if I want'
      ])).toEqual([
        ' * This is an email: jan@amann.me. I\'m currently @ home.',
        ' * It\'s also possible to write it like @home if I want'
      ]);
    });
  });
});
