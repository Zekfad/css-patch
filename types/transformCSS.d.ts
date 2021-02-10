export default transformCSS;
/**
 * Apply transformations to CSS AST.
 * Transformer function can ether return AST or falsy value
 * (if transformations was applied to the original AST).
 * @param {string}   css         Stylesheet to transform.
 * @param {Function} transformer Transformer function.
 * @returns {string} Transformed stylesheet.
 */
declare function transformCSS(css: string, transformer: Function): string;
