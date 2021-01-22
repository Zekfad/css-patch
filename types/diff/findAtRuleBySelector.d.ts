export default findAtRuleBySelector;
/**
 * Find at rule object in list of at rules by given selector.
 * @param {string}   selector String selector (multiple selectors are joined by comma).
 * @param {AtRule[]} rules    List of rules.
 * @returns {AtRule}
 */
declare function findAtRuleBySelector(selector: string, rules: AtRule[]): AtRule;
