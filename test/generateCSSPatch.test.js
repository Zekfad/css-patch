const
	assert = require('assert'),

	{ generateCSSPatch, } = require('..');


describe('Package', () => {

	describe('#generateCSSPatch', () => {

		it('should create CSS patch', () => {

			assert.strictEqual(
				generateCSSPatch(
					'a{a:1;b:1;}b{b:1;}c{a:1;}d{a:1;}',
					'a{a:1;}b{b:2;}c{a:1;}'
				),
				'a{b:unset;}b{b:2;}d{a:unset;}'
			);

			assert.strictEqual(
				generateCSSPatch(
					'a1{a:1;b:2;}a{a:1;b:2;}b{a:1;}',
					'a1{a:1;c:1;}a{a:2;c:1;}c{a:1;}'
				),
				'a{a:2;b:unset;c:1;}a1{b:unset;c:1;}b{a:unset;}c{a:1;}'
			);

		});

		it.skip('should handle at rules', () => {
			assert.strictEqual(
				generateCSSPatch(
					'@a{a{a:1}a{b:2}}@b{a{a1:1}a{b1:2}}a{a1:1}a{b1:2}',
					// '@a{a{a:1;b:2;}}@b{a{a1:1;b1:2;}}a{a1:1;b1:2;}'
					'a{b:0;a:1;b:1;a:2;a{a:1;a:2;}}b{b:1;}c{a:1;}d{a:1;}a{a{a:1}}'
					// 'a{b:1;a:2;a{a:2;}}b{b:1;}c{a:1;}d{a:1;}a{a{a:1}}'
					// 'a{b:1;a:2;}a a{a:2;}b{b:1;}c{a:1;}d{a:1;}a a{a:1}}'
					// 'a{b:1;a:2;}a a{a:1;}b{b:1;}c{a:1;}d{a:1;}}'
				),
				'@a{a{a:unset;b:unset;}}@b{a{a1:unset;b1:unset;}}a{a1:unset;b1:unset;a:2;b:1;}a a{a:1;}b{b:1;}c{a:1;}d{a:1;}'
			);
		});

	});
});
