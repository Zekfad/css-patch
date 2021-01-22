import '../CSSTransformers/ASTTypeDefs';

import { diffArrays, } from 'diff';

import getType from '../CSSTransformers/getType';

import findRuleBySelector from './findRuleBySelector';
import getDiffPartState from './getDiffPartState';
import getRulesSelectors from './getRulesSelectors';


/**
 * Compare rules in list of AST nodes.
 * @param {ASTNode[]} originalNodes Original nodes list.
 * @param {ASTNode[]} expectedNodes Expected nodes list.
 */
function diffRules(originalNodes, expectedNodes) {
	/** @type {Rule[][]} */
	const [ original, expected, ] = [ originalNodes, expectedNodes, ].map(
		nodes => nodes.filter(
			child => 'rule' === getType(child)
		)
	);

	/** @type {Array.<Diff.ArrayChange.<string>>} */
	const diff = diffArrays( // eslint-disable-line one-var
			...[ original, expected, ].map(
				rules => getRulesSelectors(rules).sort()
			)
		),
		result = [];

	diff.forEach(diffPart => {
		const state = getDiffPartState(diffPart);

		return result.push(
			...diffPart.value.map(selector => ({
				rule: 0 !== state
					? findRuleBySelector(
						selector,
						state > 0
							? expected
							: original
					) : {
						original: findRuleBySelector(selector, original),
						expected: findRuleBySelector(selector, expected),
					},
				state,
			}))
		);
	});

	return result;
}

export default diffRules;
