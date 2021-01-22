import './ASTTypeDefs';
import CSSTransformer from './CSSTransformer';
import getType from './getType';


/**
 * Compare values.
 * @param {any} a Value A.
 * @param {any} b Value B.
 * @returns {number}
 */
function compareValues(a, b) {
	return a < b
		? -1
		: a > b
			? 1
			: 0;
}

/**
 * Compare nodes.
 * Higher means closer to the start.
 * Sort rule is simple: atRule > rule > anything else.
 * Same typed nodes are sorted in alphabetic order.
 * @param {ASTNode} a Node A.
 * @param {ASTNode} b Node B.
 * @returns {number}
 */
function nodesSorter(a, b) {
	if ('atRule' !== getType(a) && 'atRule' === getType(b))
		return 1;

	if ('atRule' === getType(a)) {
		if ('atRule' === getType(b))
			return compareValues(a.value, b.value);
		return -1;
	}

	if ('rule' !== getType(a) && 'rule' === getType(b))
		return 1;

	if ('rule' === getType(a)) {
		if ('rule' === getType(b))
			return compareValues(a.props.join(','), b.props.join(','));
		return -1;
	}

	return 0;
}

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

		const droppedItems = [];
		el.forEach((child, childIndex, _el) => {
			if ([ 'rule', 'atRule', ].includes(getType(child))) {
				if (rules[_i]) {
					_el[childIndex] = root[rules[_i]];
					_i++;
					return true;
				}
				droppedItems.push(child);
				return false;
			}
			return true;
		});
		droppedItems.forEach(
			item => el.splice(el.indexOf(item), 1)
		);

		el.sort(nodesSorter).map((item, i) => el[i] = item);
	}

	/**
	 * Declaration transformer.
	 * @param {AtRule}    el             Element.
	 * @param {number}    i              Element index.
	 * @param {ASTNode[]} parentChildren Element's parent children list.
	 * @param {?Function} cb             Callback.
	 */
	atRule(el, i, parentChildren, cb) { // eslint-disable-line no-unused-vars
		this.rule(el, i, parentChildren, cb);
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
			{ parent, } = el,
			id = 'atRule' !== getType(el)
				? el.props
				: el.value;

		if (!rootsMaps.has(parent))
			rootsMaps.set(parent, {});

		const root = rootsMaps.get(parent);

		if (root[id])
			root[id].children.forEach(child => {
				child.parent = el;
				el.children.unshift(child);
			});

		root[id] = el;

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
