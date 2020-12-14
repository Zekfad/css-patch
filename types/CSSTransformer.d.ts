/**
 * At (`@`) rule set.
 */
export type AtRule = ASTNode | AtRuleBase;
export type AtRuleBase = {
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
export type Rule = ASTNode | RuleBase;
export type RuleBase = {
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
export type Comment = ASTNode | CommentBase;
export type CommentBase = {
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
export type Declaration = ASTNode | DeclarationBase;
export type DeclarationBase = {
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
export type ASTNode = {
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
export class CSSTransformer {
    static typesMap: {
        '@': string;
        rule: string;
        comm: string;
        decl: string;
    };
    /**
     * Get node type.
     * @param   {ASTNode} el Element.
     * @returns {function}   Node transformer.
     */
    static getType(el: ASTNode): Function;
    /**
     * Get node transformer.
     * @param   {ASTNode} el Element.
     * @returns {function}   Node transformer.
     */
    getTransformer(el: ASTNode): Function;
    /**
     * Declaration transformer.
     * @param {AtRule}    el       Element.
     * @param {number}    i        Element index.
     * @param {ASTNode[]} children Element children.
     * @param {Function}  cb       Callback.
     */
    atRule(el: AtRule, i: number, children: ASTNode[], cb: Function): void;
    /**
     * Declaration transformer.
     * @param {Rule}      el       Element.
     * @param {number}    i        Element index.
     * @param {ASTNode[]} children Element children.
     * @param {Function}  cb       Callback.
     */
    rule(el: Rule, i: number, children: ASTNode[], cb: Function): void;
    /**
     * Declaration transformer.
     * @param {Declaration} el       Element.
     * @param {number}      i        Element index.
     * @param {ASTNode[]}   children Element children.
     * @param {Function}    cb       Callback.
     */
    declaration(el: Declaration, i: number, children: ASTNode[], cb: Function): void;
    /**
     * Declaration transformer.
     * @param {Comment}   el       Element.
     * @param {number}    i        Element index.
     * @param {ASTNode[]} children Element children.
     * @param {Function}  cb       Callback.
     */
    comment(el: Comment, i: number, children: ASTNode[], cb: Function): void;
}
export const getType: any;
