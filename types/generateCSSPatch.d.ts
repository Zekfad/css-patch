export default generateCSSPatch;
/**
 * Generate CSS difference patch between two CSS stylesheets.
 * @param {string} original Original CSS stylesheet.
 * @param {string} expected Desired CSS stylesheet.
 * @returns {string} CSS patch difference.
 */
declare function generateCSSPatch(original: string, expected: string): string;
