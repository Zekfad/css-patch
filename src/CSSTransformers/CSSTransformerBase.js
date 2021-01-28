import '../AST/nodeTypes';

import { getNodeType, } from '../AST';


/**
 * CSS AST transformer.
 * In order to apply this transformer use static `CSSTransformerBase.transform(el)`.
 */
class CSSTransformerBase {
	/**
	 * Transform AST using this transformer.
	 * @param {ASTNode | ASTNode[]} el Element.
	 */
	static transform(el) {
		return new this().getTransformer(el)(el);
	}

	/**
	 * This is internal state initializer.
	 * Use static `CSSTransformerBase.transform(el)` method instead.
	 */
	constructor() {}

	/**
	 * Transform all provided sub elements.
	 * @param {ASTNode[]} elements Array of elements.
	 */
	transformSubElements(elements) {
		return elements.forEach((child, _i, _children) =>
			this.getTransformer(child)(child, _i, _children));
	}

	/**
	 * Get node transformer.
	 * @param   {ASTNode} el Element.
	 * @returns {Function}   Node transformer.
	 */
	getTransformer(el) {
		return this[getNodeType(el)]?.bind?.(this) ?? null;
	}

	/**
	 * Root node transformer.
	 * @param {Rule[]}     el             Root element.
	 * @param {?number}    i              Root element index if any.
	 * @param {?ASTNode[]} parentChildren Children of root element parent if there is any parent.
	 * @param {?Function}  cb             Callback.
	 */
	root(el, i, parentChildren, cb) { // eslint-disable-line no-unused-vars
		const rootAnchor = Object.create(null);

		el.forEach(child => child.parent = rootAnchor);

		return this.transformSubElements(el);
	}

	/**
	 * At rule transformer.
	 * @param {AtRule}    el             Element.
	 * @param {number}    i              Element index.
	 * @param {ASTNode[]} parentChildren Element's parent children list.
	 * @param {?Function} cb             Callback.
	 */
	atRule(el, i, parentChildren, cb) { // eslint-disable-line no-unused-vars
		return this.transformSubElements(el.children);
	}

	/**
	 * Rule transformer.
	 * @param {Rule}      el             Element.
	 * @param {number}    i              Element index.
	 * @param {ASTNode[]} parentChildren Element's parent children list.
	 * @param {?Function} cb             Callback.
	 */
	rule(el, i, parentChildren, cb) { // eslint-disable-line no-unused-vars
		return this.transformSubElements(el.children);
	}

	/**
	 * Declaration transformer.
	 * @param {Declaration} el             Element.
	 * @param {number}      i              Element index.
	 * @param {ASTNode[]}   parentChildren Element's parent children list.
	 * @param {?Function}   cb             Callback.
	 */
	declaration(el, i, parentChildren, cb) { // eslint-disable-line no-unused-vars
		return;
	}

	/**
	 * Comment transformer.
	 * @param {Comment}   el             Element.
	 * @param {number}    i              Element index.
	 * @param {ASTNode[]} parentChildren Element's parent children list.
	 * @param {?Function} cb             Callback.
	 */
	comment(el, i, parentChildren, cb) { // eslint-disable-line no-unused-vars
		return;
	}
}

export default CSSTransformerBase;
