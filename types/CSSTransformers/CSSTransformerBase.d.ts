export default CSSTransformerBase;
/**
 * CSS AST transformer.
 * In order to apply this transformer use static `CSSTransformerBase.transform(el)`.
 */
declare class CSSTransformerBase {
    /**
     * Transform AST using this transformer.
     * @param {ASTNode | ASTNode[]} el Element.
     */
    static transform(el: ASTNode | ASTNode[]): any;
    /**
     * Transform all provided sub elements.
     * @param {ASTNode[]} elements Array of elements.
     */
    transformSubElements(elements: ASTNode[]): void;
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
