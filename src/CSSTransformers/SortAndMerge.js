import './ASTTypeDefs';
import CSSTransformer from './CSSTransformer';
import getType from './getType';


/**
 * Merge duplicate declarations. Last appeared would be used for value.
 * In order to apply this transformer use static `SortAndMerge.transform(el)`.
 */
class SortAndMerge extends CSSTransformer {
	/**
	 * This is internal state initializer.
	 * Use static `SortAndMerge.transform(el)` method instead.
	 */
	constructor() {
		super();
		this.rulesMaps = new WeakMap();
	}

	/**
	 * Declaration transformer.
	 * @param {Rule}      el             Element.
	 * @param {number}    i              Element index.
	 * @param {ASTNode[]} parentChildren Element's parent children list.
	 * @param {?Function} cb             Callback.
	 */
	rule(el, i, parentChildren, cb) { // eslint-disable-line no-unused-vars
		el.children.forEach((child, _i, _children) => {
			return this.getTransformer(child)(child, _i, _children);
		});
		const
			{ rulesMaps, } = this,
			rule = rulesMaps.get(el),
			declarations = Object.keys(rule).sort();
		let _i = 0;
		el.children = el.children.filter(child => {
			if ('declaration' === getType(child)) {
				if (declarations[_i]) {
					child.props = declarations[_i];
					child.children = rule[declarations[_i]];
					child.value = `${child.props}:${child.children};`;
					_i++;
					return true;
				}
				return false;
			}
			return true;
		});

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
		const
			{ rulesMaps, } = this,
			{ parent, } = el;

		if (!rulesMaps.has(parent))
			rulesMaps.set(parent, {});

		const rule = rulesMaps.get(parent);

		rule[el.props] = el.children;
		return;
	}
}

export default SortAndMerge;
