/**
 * Get `'foo'` or `'bar'`.
 * @param {boolean} [foo=false] Whatever to return `'foo'` instead of `'bar'`.
 * @returns {string} `'foo'` or `'bar'`.
 */
function stub(foo = false) {
	return foo
		? 'foo'
		: 'bar';
}

export default stub;
