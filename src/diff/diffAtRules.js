import '../AST/nodeTypes';

import { diffArrays, } from 'diff';

import {
	findAtRuleBySelector,
	getAtRulesSelectors,
	getNodeType,
} from '../AST';

import getDiffPartState from './getDiffPartState';


/**
 * Compare at rules between lists of AST nodes.
 * @memberof diff
 * @param {ASTNode[]} originalNodes Original nodes list.
 * @param {ASTNode[]} expectedNodes Expected nodes list.
 */
function diffAtRules(originalNodes, expectedNodes) {
	/** @type {AtRule[][]} */
	const [ original, expected, ] = [ originalNodes, expectedNodes, ].map(
		nodes => nodes.filter(
			child => 'atRule' === getNodeType(child)
		)
	);

	/** @type {Array.<Diff.ArrayChange.<string>>} */
	const diff = diffArrays( // eslint-disable-line one-var
			...[ original, expected, ].map(
				rules => getAtRulesSelectors(rules).sort()
			)
		),
		result = [];

	diff.forEach(diffPart => {
		const state = getDiffPartState(diffPart);

		return result.push(
			...diffPart.value.map(selector => ({
				rule: 0 !== state
					? findAtRuleBySelector(
						selector,
						state > 0
							? expected
							: original
					) : {
						original: findAtRuleBySelector(selector, original),
						expected: findAtRuleBySelector(selector, expected),
					},
				state,
			}))
		);
	});

	return result;
}

export default diffAtRules;
