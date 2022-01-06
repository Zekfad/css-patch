export default CSSTransformerBase;
/**
 * CSS AST transformer.
 * To apply this transformer call `CSSTransformerBase.transform(el)`.
 * Base class for CSS AST transformer.
 * Advanced usage notes:
 * You can subclass it to implement your own transformer.
 * Just remember to call `this.transformSubElements(el.children)` if you deal
 * with multi-level items (roots, rules, at rules).
 * @memberof CSSTransformers
 * @class
 */
declare class CSSTransformerBase {
    /**
     * Transform AST using this transformer.
     * @param {ASTNode | ASTNode[]} el Element.
     */
    static transform(el: ASTNode | ASTNode[]): any;
    /**
     * Transform all (or with exclusions) provided sub elements.
     * @param {ASTNode[]} elements  Array of elements.
     * @param {?string[]} list      Blacklist or whitelist of types.
     * @param {?boolean}  whitelist Whether list is whitelist or blacklist.
     */
    transformSubElements(elements: ASTNode[], list: string[] | null, whitelist: boolean | null): void;
    /**
     * Get node transformer.
     * @param   {ASTNode} el Element.
     * @returns {Function}   Node transformer.
     */
    getTransformer(el: ASTNode): Function;
    /**
     * Root node transformer.
     * @param {Rule[]}     el             Root element.
     * @param {?number}    i              Root element index if any.
     * @param {?ASTNode[]} parentChildren Children of root element parent if there is any parent.
     * @param {?Function}  cb             Callback.
     */
    root(el: Rule[], i: number | null, parentChildren: ASTNode[] | null, cb: Function | null): void;
    /**
     * At rule transformer.
     * @param {AtRule}    el             Element.
     * @param {number}    i              Element index.
     * @param {ASTNode[]} parentChildren Element's parent children list.
     * @param {?Function} cb             Callback.
     */
    atRule(el: AtRule, i: number, parentChildren: ASTNode[], cb: Function | null): void;
    /**
     * Rule transformer.
     * @param {Rule}      el             Element.
     * @param {number}    i              Element index.
     * @param {ASTNode[]} parentChildren Element's parent children list.
     * @param {?Function} cb             Callback.
     */
    rule(el: Rule, i: number, parentChildren: ASTNode[], cb: Function | null): void;
    /**
     * Declaration transformer.
     * @param {Declaration} el             Element.
     * @param {number}      i              Element index.
     * @param {ASTNode[]}   parentChildren Element's parent children list.
     * @param {?Function}   cb             Callback.
     */
    declaration(el: Declaration, i: number, parentChildren: ASTNode[], cb: Function | null): void;
    /**
     * Comment transformer.
     * @param {Comment}   el             Element.
     * @param {number}    i              Element index.
     * @param {ASTNode[]} parentChildren Element's parent children list.
     * @param {?Function} cb             Callback.
     */
    comment(el: Comment, i: number, parentChildren: ASTNode[], cb: Function | null): void;
}
