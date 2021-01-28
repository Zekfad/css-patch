import './AST/nodeTypes';
import { compile, serialize, stringify, } from 'stylis';

import { normalize, } from './AST';
import { transformDiffRules, transformDiffAtRules, } from './diff';


/**
 * Generate CSS difference patch between two CSS stylesheets.
 * @param {string} original Original CSS stylesheet.
 * @param {string} expected Desired CSS stylesheet.
 * @returns {string} CSS patch difference.
 */
function generateCSSPatch(original, expected) {
	const ast = [
			original,
			expected,
		].map(ast => normalize(
			compile(
				serialize(
					compile(ast),
					stringify
				)
			)
		)),
		result = [];

	result.push(...[
		...transformDiffRules(ast[0], ast[1]),
		...transformDiffAtRules(ast[0], ast[1]),
	]);

	return serialize(result, stringify);
}

export default generateCSSPatch;
