export default transformDiffDeclarations;
/**
 * Compare declarations between rules and apply diff transformation.
 * @memberof diff
 * @param {Rule} originalRule Original rule.
 * @param {Rule} expectedRule Expected rule.
 * @returns {Rule}
 */
declare function transformDiffDeclarations(originalRule: Rule, expectedRule: Rule): Rule;
