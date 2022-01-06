export default transformDiffAtRules;
/**
 * Compare at rules and apply diff transformation.
 * @memberof diff
 * @param {AtRule[]} original Original rules set.
 * @param {AtRule[]} expected Expected rules set.
 */
declare function transformDiffAtRules(original: AtRule[], expected: AtRule[]): any[];
