import '../AST/nodeTypes';

import { getNodeType, } from '../AST';

import CSSTransformerBase from './CSSTransformerBase';


/**
 * Compare values.
 * @memberof CSSTransformers
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
 * Sorting rule is simple: atRule > rule > anything else.
 * Same typed nodes are sorted in alphabetic order.
 * @memberof CSSTransformers
 * @param {ASTNode} a Node A.
 * @param {ASTNode} b Node B.
 * @returns {number}
 */
function nodesSorter(a, b) {
	if ('atRule' !== getNodeType(a) && 'atRule' === getNodeType(b))
		return 1;

	if ('atRule' === getNodeType(a)) {
		if ('atRule' === getNodeType(b))
			return compareValues(a.value, b.value);
		return -1;
	}

	if ('rule' !== getNodeType(a) && 'rule' === getNodeType(b))
		return 1;

	if ('rule' === getNodeType(a)) {
		if ('rule' === getNodeType(b))
			return compareValues(a.props.join(','), b.props.join(','));
		return -1;
	}

	return 0;
}

/**
 * Merge duplicate declarations. For duplicated identifies last one would be used.
 * To apply this transformer call `SortAndMerge.transform(el)`.
 * @memberof CSSTransformers
 * @class
 */
class SortAndMerge extends CSSTransformerBase {
	/**
	 * Internal state initializer.
	 * To apply transformer use `SortAndMerge.transform(el)` instead.
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
			if ([ 'rule', 'atRule', ].includes(getNodeType(child))) {
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
	 * At rule transformer.
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
	 * Rule transformer.
	 * @param {Rule}      el             Element.
	 * @param {number}    i              Element index.
	 * @param {ASTNode[]} parentChildren Element's parent children list.
	 * @param {?Function} cb             Callback.
	 */
	rule(el, i, parentChildren, cb) { // eslint-disable-line no-unused-vars
		const
			{ rootsMaps, } = this,
			{ parent, } = el,
			id = 'atRule' !== getNodeType(el)
				? el.props.join(',')
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

		if ('atRule' !== getNodeType(el))
			this.transformSubElements(el.children);
		else
			this.transformSubElements(el.children, [ 'declaration', ], true);

		const
			{ rulesMaps, } = this,
			rule = rulesMaps.get(el),
			declarations = 'object' === typeof rule
				? Object.keys(rule).sort()
				: [];

		let _i = 0;

		const droppedItems = [];
		el.children.forEach(child => {
			if ('declaration' === getNodeType(child)) {
				if (declarations[_i]) {
					child.props = declarations[_i];
					child.children = rule[declarations[_i]];
					child.value = `${child.props}:${child.children};`;
					_i++;
					return true;
				}
				droppedItems.push(child);
				return false;
			}
			return true;
		});
		droppedItems.forEach(
			item => el.children.splice(el.children.indexOf(item), 1)
		);

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
