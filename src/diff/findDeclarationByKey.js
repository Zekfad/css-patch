import '../CSSTransformers/ASTTypeDefs';


/**
 * Find declaration object in list of declarations by given key.
 * @param {string}        selector     Declaration key.
 * @param {Declaration[]} declarations List of declarations.
 * @returns {Declaration}
 */
function findDeclarationByKey(key, declarations) {
	return declarations.find(declaration => key === declaration.props);
}

export default findDeclarationByKey;
