export default getNodeType;
/**
 * Get node type.
 * @memberof AST
 * @param   {ASTNode|ASTNode[]} el Element.
 * @returns {?string}              Node transformer name.
 */
declare function getNodeType(el: ASTNode | ASTNode[]): string | null;
