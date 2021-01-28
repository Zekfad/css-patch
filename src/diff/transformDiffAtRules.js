import { Unset, } from '../CSSTransformers';

import diffAtRules from './diffAtRules';
import transformDiffDeclarations from './transformDiffDeclarations';
import transformDiffRules from './transformDiffRules';

/**
 * Compare at rules and apply diff transformation.
 * @param {AtRule[]} original Original rules set.
 * @param {AtRule[]} expected Expected rules set.
 */
function transformDiffAtRules(original, expected) {
	const diff = diffAtRules(original, expected),
		result = [];

	diff.map(({ state, rule, }) => {
		if (0 !== state) return result.push(
			state < 0
				? (Unset.transform(rule), rule)
				: rule
		);

		transformDiffDeclarations(rule.original, rule.expected);
		transformDiffRules(rule.original.children, rule.expected.children);

		return result.push(rule.original);
	});

	return result;
}

export default transformDiffAtRules;
