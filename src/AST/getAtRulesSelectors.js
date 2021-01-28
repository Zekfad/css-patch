import './nodeTypes';


/**
 * Get all selectors from a rules set.
 * @param {AtRule[]} rules List of rules.
 * @returns {string[]} Selectors.
 */
function getAtRulesSelectors(rules) {
	return rules.map(rule => rule.value);
}

export default getAtRulesSelectors;
