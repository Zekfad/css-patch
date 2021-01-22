export default diffAtRules;
/**
 * Compare rules in list of AST nodes.
 * @param {ASTNode[]} originalNodes Original nodes list.
 * @param {ASTNode[]} expectedNodes Expected nodes list.
 */
declare function diffAtRules(originalNodes: ASTNode[], expectedNodes: ASTNode[]): any[];
