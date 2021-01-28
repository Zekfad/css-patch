export default diffRules;
/**
 * Compare rules between lists of AST nodes.
 * @param {ASTNode[]} originalNodes Original nodes list.
 * @param {ASTNode[]} expectedNodes Expected nodes list.
 */
declare function diffRules(originalNodes: ASTNode[], expectedNodes: ASTNode[]): any[];
