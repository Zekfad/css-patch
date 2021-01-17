import './ASTTypeDefs';


const typesMap = {
	'@' : 'atRule',
	rule: 'rule',
	comm: 'comment',
	decl: 'declaration',
};

/**
 * Get node type.
 * @param   {ASTNode} el Element.
 * @returns {?string}    Node transformer name.
 */
function getType(el) {
	const { type, } = el;

	if (!type)
		return null;

	return typesMap[type] ?? (type.startsWith('@')
		? typesMap['@']
		: null);
}

export default getType;
