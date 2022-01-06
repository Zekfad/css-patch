import '../AST/nodeTypes';

import CSSTransformerBase from './CSSTransformerBase';


/**
 * Update all declarations.
 * To apply this transformer call `UpdateDeclarations.transform(el)`.
 * @memberof CSSTransformers
 * @class
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
