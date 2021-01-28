import '../AST/nodeTypes';

import CSSTransformerBase from './CSSTransformerBase';


/**
 * Update all declarations.
 * In order to apply this transformer use static `UpdateDeclarations.transform(el)`.
 */
class UpdateDeclarations extends CSSTransformerBase {
	/**
	 * Declaration transformer.
	 * @param {Declaration} el       Element.
	 * @param {number}      i        Element index.
	 * @param {ASTNode[]}   children Element's parent children list.
	 * @param {?Function}   cb       Callback.
	 */
	declaration(el, i, children, cb) {  // eslint-disable-line no-unused-vars
		el.value = `${el.props}:${el.children};`;
		return;
	}
}

export default UpdateDeclarations;
