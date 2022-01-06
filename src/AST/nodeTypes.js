/**
 * At (`@`) rule set.
 * @memberof AST
 * @typedef {ASTNode | AtRuleBase} AtRule
 */
/**
 * @memberof AST
 * @typedef {Object} AtRuleBase
 * @property {string}   type  Rule node type.
 * @property {string[]} props Rule parts (e.g. keyframes name or media queries).
 */

/**
 * Rule set.
 * @memberof AST
 * @typedef {ASTNode | RuleBase} Rule
 */
/**
 * @memberof AST
 * @typedef {Object} RuleBase
 * @property {"rule"}   type  Rule node type.
 * @property {string[]} props Rule selectors.
 */

/**
 * Comment.
 * @memberof AST
 * @typedef {ASTNode | CommentBase} Comment
 */
/**
 * @memberof AST
 * @typedef {Object} CommentBase
 * @property {"comm"}     type     Comment node type.
 * @property {"\n" | "/"} props    Comment type: `'\n'` - double slash comment. `'/'` - Multiline comment.
 * @property {string}     children Comment value.
 */

/**
 * Declaration.
 * @memberof AST
 * @typedef {ASTNode | DeclarationBase} Declaration
 */
/**
 * @memberof AST
 * @typedef {Object} DeclarationBase
 * @property {"decl"} type     Declaration node type.
 * @property {string} props    Declaration key.
 * @property {string} children Declaration value.
 */

/**
 * AST Node common interface.
 * @memberof AST
 * @typedef {Object} ASTNode
 * @property {string}             value    CSS value.
 * @property {string}             type     Node type.
 * @property {string | string[]}  props    Node properties.
 * @property {ASTNode[] | string} children Node children.
 * @property {ASTNode}            root     Node's root node.
 * @property {ASTNode}            parent   Node's parent node.
 * @property {number}             line     Node line in CSS file.
 * @property {number}             column   Node column in CSS file.
 */
