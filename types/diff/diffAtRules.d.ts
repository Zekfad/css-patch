export default diffAtRules;
/**
 * Compare at rules between lists of AST nodes.
 * @param {ASTNode[]} originalNodes Original nodes list.
 * @param {ASTNode[]} expectedNodes Expected nodes list.
 */
declare function diffAtRules(originalNodes: ASTNode[], expectedNodes: ASTNode[]): any[];
