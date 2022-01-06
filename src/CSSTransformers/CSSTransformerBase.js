import '../AST/nodeTypes';

import { getNodeType, } from '../AST';


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
class CSSTransformerBase {
	/**
	 * Transform AST using this transformer.
	 * @param {ASTNode | ASTNode[]} el Element.
	 */
	static transform(el) {
		return new this().getTransformer(el)(el);
	}

	/**
	 * Internal state initializer.
	 * To apply transformer use `CSSTransformerBase.transform(el)` instead.
	 */
	constructor() {}

	/**
	 * Transform all (or with exclusions) provided sub elements.
	 * @param {ASTNode[]} elements  Array of elements.
	 * @param {?string[]} list      Blacklist or whitelist of types.
	 * @param {?boolean}  whitelist Whether list is whitelist or blacklist.
	 */
	transformSubElements(elements, list, whitelist) {
		return elements.forEach((child, _i, _children) => {
			if (
				list && (
					(whitelist && !list.includes(getNodeType(child))) ||
					(!whitelist && list.includes(getNodeType(child)))
				)
			)
				return;
			this.getTransformer(child)(child, _i, _children);
		});
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

		el.forEach(child => {
			if ('object' !== typeof (child.parent ?? void 0))
				child.parent = rootAnchor;
		});

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
