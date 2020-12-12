const
	assert = require('assert'),

	stub = require('..');


describe('stub', () => {

	describe('#stub', () => {

		it('should return \'bar\' with false as argument or with no arguments at all', () => {

			assert.strictEqual(stub.stub(false), 'bar');
			assert.strictEqual(stub.stub(), 'bar');

		});

		it('should return \'foo\' with true as argument', () => {

			assert.strictEqual(stub.stub(true), 'foo');

		});

	});
});
