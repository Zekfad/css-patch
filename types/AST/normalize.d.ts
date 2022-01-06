export default normalize;
/**
 * Sort declarations and merge equal rules in order they appear.
 * @memberof AST
 * @param {stylis.Element[]} ast
 */
declare function normalize(ast: stylis.Element[]): import("stylis").Element[];
