export default transformDiffRules;
/**
 * Compare rules and apply diff transformation.
 * @memberof diff
 * @param {Rule[]} original Original rules set.
 * @param {Rule[]} expected Expected rules set.
 */
declare function transformDiffRules(original: Rule[], expected: Rule[]): any[];
