export default findDeclarationByKey;
/**
 * Find declaration object in list of declarations by given key.
 * @memberof AST
 * @param {string}        selector     Declaration key.
 * @param {Declaration[]} declarations List of declarations.
 * @returns {Declaration}
 */
declare function findDeclarationByKey(key: any, declarations: Declaration[]): Declaration;
