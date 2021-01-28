/**
 * At (`@`) rule set.
 * @typedef {ASTNode | AtRuleBase} AtRule
 */
/**
 * @typedef {Object} AtRuleBase
 * @property {string}   type  Rule node type.
 * @property {string[]} props Rule parts (e.g. keyframes name or media queries).
 */

/**
 * Rule set.
 * @typedef {ASTNode | RuleBase} Rule
 */
/**
 * @typedef {Object} RuleBase
 * @property {"rule"}   type  Rule node type.
 * @property {string[]} props Rule selectors.
 */

/**
 * Comment.
 * @typedef {ASTNode | CommentBase} Comment
 */
/**
 * @typedef {Object} CommentBase
 * @property {"comm"}     type     Comment node type.
 * @property {"\n" | "/"} props    Comment type: `'\n'` - double slash comment. `'/'` - Multiline comment.
 * @property {string}     children Comment value.
 */

/**
 * Declaration.
 * @typedef {ASTNode | DeclarationBase} Declaration
 */
/**
 * @typedef {Object} DeclarationBase
 * @property {"decl"} type     Declaration node type.
 * @property {string} props    Declaration key.
 * @property {string} children Declaration value.
 */

/**
 * AST Node common interface.
 * @typedef {Object} ASTNode
 * @property {string}             value    CSS value.
 * @property {string}             type     Node type.
 * @property {string | string[]}  props    Node properties.
 * @property {ASTNode[] | string} children Node children.
 * @property {ASTNode}            root     Node's root node.
 * @property {ASTNode}            parent     Node's parent node.
 * @property {number}             line     Node line in CSS file.
 * @property {number}             column   Node column in CSS file.
 */
