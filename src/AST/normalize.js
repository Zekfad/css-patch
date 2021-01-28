import { SortAndMerge, } from '../CSSTransformers';


/**
 * Sort declarations and merge equal rules in order they appear.
 * @param {stylis.Element[]} ast
 */
function normalize(ast) {
	SortAndMerge.transform(ast);
	return ast;
}

export default normalize;
