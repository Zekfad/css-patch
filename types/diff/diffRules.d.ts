export default diffRules;
/**
 * Compare rules in list of AST nodes.
 * @param {ASTNode[]} originalNodes Original nodes list.
 * @param {ASTNode[]} expectedNodes Expected nodes list.
 */
declare function diffRules(originalNodes: ASTNode[], expectedNodes: ASTNode[]): any[];
