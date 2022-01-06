import { Unset, } from '../CSSTransformers';

import diffRules from './diffRules';
import transformDiffDeclarations from './transformDiffDeclarations';


/**
 * Compare rules and apply diff transformation.
 * @memberof diff
 * @param {Rule[]} original Original rules set.
 * @param {Rule[]} expected Expected rules set.
 */
function transformDiffRules(original, expected) {
	const diff = diffRules(original, expected),
		result = [];

	diff.map(({ state, rule, }) => {
		result.push(
			0 !== state
				? state < 0
					? (Unset.transform(rule), rule)
					: rule
				: transformDiffDeclarations(rule.original, rule.expected)
		);
	});

	return result;
}

export default transformDiffRules;
