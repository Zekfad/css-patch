import './ASTTypeDefs';
import getType from './getType';


/**
 * CSS AST transformer.
 * In order to apply this transformer use static `CSSTransformer.transform(el)`.
 */
class CSSTransformer {
	/**
	 * Transform AST with this transformer.
	 * @param   {ASTNode} el Element.
	 */
	static transform(el) {
		return new this().getTransformer(el)(el);
	}

	/**
	 * This is internal state initializer.
	 * Use static `CSSTransformer.transform(el)` method instead.
	 */
	constructor() {}

	/**
	 * Get node transformer.
	 * @param   {ASTNode} el Element.
	 * @returns {Function}   Node transformer.
	 */
	getTransformer(el) {
		return this[getType(el)]?.bind?.(this) ?? null;
	}

	/**
	 * Declaration transformer.
	 * @param {AtRule}    el             Element.
	 * @param {number}    i              Element index.
	 * @param {ASTNode[]} parentChildren Element's parent children list.
	 * @param {?Function} cb             Callback.
	 */
	atRule(el, i, parentChildren, cb) { // eslint-disable-line no-unused-vars
		el.children.forEach((child, _i, _children) =>
			this.getTransformer(child)(child, _i, _children));
		return;
	}

	/**
	 * Declaration transformer.
	 * @param {Rule}      el             Element.
	 * @param {number}    i              Element index.
	 * @param {ASTNode[]} parentChildren Element's parent children list.
	 * @param {?Function} cb             Callback.
	 */
	rule(el, i, parentChildren, cb) { // eslint-disable-line no-unused-vars
		el.children.forEach((child, _i, _children) =>
			this.getTransformer(child)(child, _i, _children));
		return;
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
	 * Declaration transformer.
	 * @param {Comment}   el             Element.
	 * @param {number}    i              Element index.
	 * @param {ASTNode[]} parentChildren Element's parent children list.
	 * @param {?Function} cb             Callback.
	 */
	comment(el, i, parentChildren, cb) { // eslint-disable-line no-unused-vars
		return;
	}
}

export default CSSTransformer;
