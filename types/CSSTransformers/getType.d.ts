export default getType;
/**
 * Get node type.
 * @param   {ASTNode|ASTNode[]} el Element.
 * @returns {?string}              Node transformer name.
 */
declare function getType(el: ASTNode | ASTNode[]): string | null;
