import '../CSSTransformers/ASTTypeDefs';


/**
 * Find rule object in list of rules by given selector.
 * @param {string} selector String selector (multiple selectors are joined by comma).
 * @param {Rule[]} rules List of rules.
 * @returns {Rule}
 */
function findRuleBySelector(selector, rules) {
	return rules.find(rule => rule.props.join(',') === selector);
}

export default findRuleBySelector;
