import './nodeTypes';


const typesMap = {
	'@' : 'atRule',
	rule: 'rule',
	comm: 'comment',
	decl: 'declaration',
	root: 'root',
};

/**
 * Get node type.
 * @param   {ASTNode|ASTNode[]} el Element.
 * @returns {?string}              Node transformer name.
 */
function getNodeType(el) {
	if (Array.isArray(el))
		return typesMap.root;

	const { type, } = el;

	if (!type)
		return null;

	return typesMap[type] ?? (type.startsWith('@')
		? typesMap['@']
		: null);
}

export default getNodeType;
