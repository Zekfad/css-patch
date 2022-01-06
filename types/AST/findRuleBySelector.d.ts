export default findRuleBySelector;
/**
 * Find rule object in list of rules by given selector.
 * @memberof AST
 * @param {string} selector String selector (multiple selectors are joined by comma).
 * @param {Rule[]} rules    List of rules.
 * @returns {Rule}
 */
declare function findRuleBySelector(selector: string, rules: Rule[]): Rule;
