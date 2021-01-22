import '../CSSTransformers/ASTTypeDefs';


/**
 * Get all selectors from a rules set.
 * @param {Rule[]} rules List of rules.
 * @returns {string[]} Selectors.
 */
function getRulesSelectors(rules) {
	return rules.map(rule => rule.props.join(','));
}

export default getRulesSelectors;
