/**
 * At (`@`) rule set.
 */
type AtRule = ASTNode | AtRuleBase;
type AtRuleBase = {
    /**
     * Rule node type.
     */
    type: string;
    /**
     * Rule parts (e.g. keyframes name or media queries).
     */
    props: string[];
};
/**
 * Rule set.
 */
type Rule = ASTNode | RuleBase;
type RuleBase = {
    /**
     * Rule node type.
     */
    type: "rule";
    /**
     * Rule selectors.
     */
    props: string[];
};
/**
 * Comment.
 */
type Comment = ASTNode | CommentBase;
type CommentBase = {
    /**
     * Comment node type.
     */
    type: "comm";
    /**
     * Comment type: `'\n'` - double slash comment. `'/'` - Multiline comment.
     */
    props: "\n" | "/";
    /**
     * Comment value.
     */
    children: string;
};
/**
 * Declaration.
 */
type Declaration = ASTNode | DeclarationBase;
type DeclarationBase = {
    /**
     * Declaration node type.
     */
    type: "decl";
    /**
     * Declaration key.
     */
    props: string;
    /**
     * Declaration value.
     */
    children: string;
};
/**
 * AST Node common interface.
 */
type ASTNode = {
    /**
     * CSS value.
     */
    value: string;
    /**
     * Node type.
     */
    type: string;
    /**
     * Node properties.
     */
    props: string | string[];
    /**
     * Node children.
     */
    children: ASTNode[] | string;
    /**
     * Node's root node.
     */
    root: ASTNode;
    /**
     * Node's parent node.
     */
    parent: ASTNode;
    /**
     * Node line in CSS file.
     */
    line: number;
    /**
     * Node column in CSS file.
     */
    column: number;
};
