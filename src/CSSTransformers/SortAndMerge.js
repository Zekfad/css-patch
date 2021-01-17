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
		this.rootsMaps = new WeakMap();
	}

	/**
	 * Root node transformer.
	 * @param {Rule[]}     el             Root element.
	 * @param {?number}    i              Root element index if any.
	 * @param {?ASTNode[]} parentChildren Children of root element parent if there is any parent.
	 * @param {?Function}  cb             Callback.
	 */
	root(el, i, parentChildren, cb) { // eslint-disable-line no-unused-vars
		let rootAnchor = Object.create(null);

		el.forEach(child => {
			if ('object' !== typeof (child.parent ?? void 0))
				child.parent = rootAnchor;
			else
				rootAnchor = child.parent;
		});

		this.transformSubElements(el);

		const
			{ rootsMaps, } = this,
			root = rootsMaps.get(rootAnchor),
			rules = 'object' === typeof root
				? Object.keys(root)
				: [];

		let _i = 0;

		el.forEach((child, childIndex, _el) => {
			if ('rule' === getType(child)) {
				if (rules[_i]) {
					_el[childIndex] = root[rules[_i]];
					_i++;
					return true;
				}
				_el.splice(childIndex, 1);
				return false;
			}
			return true;
		});
	}

	/**
	 * Declaration transformer.
	 * @param {AtRule}    el             Element.
	 * @param {number}    i              Element index.
	 * @param {ASTNode[]} parentChildren Element's parent children list.
	 * @param {?Function} cb             Callback.
	 */
	atRule(el, i, parentChildren, cb) { // eslint-disable-line no-unused-vars
		this.root(el.children, i, parentChildren, cb);
	}

	/**
	 * Declaration transformer.
	 * @param {Rule}      el             Element.
	 * @param {number}    i              Element index.
	 * @param {ASTNode[]} parentChildren Element's parent children list.
	 * @param {?Function} cb             Callback.
	 */
	rule(el, i, parentChildren, cb) { // eslint-disable-line no-unused-vars
		const
			{ rootsMaps, } = this,
			{ parent, } = el;

		if (!rootsMaps.has(parent))
			rootsMaps.set(parent, {});

		const root = rootsMaps.get(parent);

		if (root[el.props])
			root[el.props].children.forEach(child => {
				child.parent = el;
				el.children.push(child);
			});

		root[el.props] = el;

		this.transformSubElements(el.children);

		const
			{ rulesMaps, } = this,
			rule = rulesMaps.get(el),
			declarations = 'object' === typeof rule
				? Object.keys(rule).sort()
				: [];

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
