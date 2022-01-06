import 'diff';


/**
 * Get numeric state of a diff part.
 * @memberof diff
 * @param {Diff.ArrayChange.<any>} diffPart Diff part.
 * @returns {number}
 */
function getDiffPartState(diffPart) {
	return diffPart.added
		? 1
		: diffPart.removed
			? -1
			: 0;
}

export default getDiffPartState;
