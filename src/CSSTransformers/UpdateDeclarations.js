import './ASTTypeDefs';
import CSSTransformer from './CSSTransformer';


/**
 * Update all declarations.
 */
class UpdateDeclarations extends CSSTransformer {
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
