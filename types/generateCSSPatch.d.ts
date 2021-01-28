export default generateCSSPatch;
/**
 * Generate CSS difference patch between two CSS stylesheets.
 * @param {string} original
 * @param {string} expected
 */
declare function generateCSSPatch(original: string, expected: string): string;
