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

class CSSTransformer {
	static typesMap = {
		'@' : 'atRule',
		rule: 'rule',
		comm: 'comment',
		decl: 'declaration',
	}

	/**
	 * Get node type.
	 * @param   {ASTNode} el Element.
	 * @returns {function}   Node transformer.
	 */
	static getType(el) {
		const
			{ typesMap: types, } = this,
			{ type, } = el;

		return types[type] ?? (type.startsWith('@')
			? types['@']
			: null);
	}

	/**
	 * Get node transformer.
	 * @param   {ASTNode} el Element.
	 * @returns {function}   Node transformer.
	 */
	getTransformer(el) {
		return this[this.constructor.getType(el)]?.bind?.(this) ?? null;
	}

	/**
	 * Declaration transformer.
	 * @param {AtRule}    el       Element.
	 * @param {number}    i        Element index.
	 * @param {ASTNode[]} children Element children.
	 * @param {Function}  cb       Callback.
	 */
	atRule(el, i, children, cb) { // eslint-disable-line no-unused-vars
		el.children.forEach((child, _i, _children) => {
			return this.getTransformer(child)(child, _i, _children);
		});
		return;
	}

	/**
	 * Declaration transformer.
	 * @param {Rule}      el       Element.
	 * @param {number}    i        Element index.
	 * @param {ASTNode[]} children Element children.
	 * @param {Function}  cb       Callback.
	 */
	rule(el, i, children, cb) { // eslint-disable-line no-unused-vars
		el.children.forEach((child, _i, _children)  => {
			return this.getTransformer(child)(child, _i, _children);
		});
		return;
	}

	/**
	 * Declaration transformer.
	 * @param {Declaration} el       Element.
	 * @param {number}      i        Element index.
	 * @param {ASTNode[]}   children Element children.
	 * @param {Function}    cb       Callback.
	 */
	declaration(el, i, children, cb) {  // eslint-disable-line no-unused-vars
		el.children = 'unset';
		el.value = `${el.props}:${el.children};`;
		return;
	}

	/**
	 * Declaration transformer.
	 * @param {Comment}   el       Element.
	 * @param {number}    i        Element index.
	 * @param {ASTNode[]} children Element children.
	 * @param {Function}  cb       Callback.
	 */
	comment(el, i, children, cb) {  // eslint-disable-line no-unused-vars
		return;
	}
}

const getType = CSSTransformer.getType.bind(CSSTransformer);

Object.assign(CSSTransformer, {
	getType,
});

export {
	CSSTransformer,
	getType,
};
