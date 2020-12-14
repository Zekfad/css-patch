const
	assert = require('assert'),

	{ generateCSSPatch, } = require('..');


describe('Package', () => {

	describe('#generateCSSPath', () => {

		it('should create CSS path', () => {

			assert.strictEqual(
				generateCSSPatch(
					'a{a:1;b:1;}b{b:1;}c{a:1;}d{a:1;}',
					'a{a:1;}b{b:2;}c{a:1;}'
				),
				'a{b:unset;}b{b:2;}d{a:unset;}'
			);

		});

	});
});
