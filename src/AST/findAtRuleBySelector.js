import './nodeTypes';


/**
 * Find at rule object in list of at rules by given selector.
 * @memberof AST
 * @param {string}   selector String selector (multiple selectors are joined by comma).
 * @param {AtRule[]} rules    List of rules.
 * @returns {AtRule}
 */
function findAtRuleBySelector(selector, rules) {
	return rules.find(rule => rule.value === selector);
}

export default findAtRuleBySelector;
