import '../CSSTransformers/ASTTypeDefs';

import { diffArrays, } from 'diff';

import getType from '../CSSTransformers/getType';

import findDeclarationByKey from './findDeclarationByKey';
import getDiffPartState from './getDiffPartState';


/**
 * Compare declarations in rules.
 * @param {Rule} originalRule Original rule.
 * @param {Rule} expectedRule Expected rule.
 */
function diffDeclarations(originalRule, expectedRule) {
	/** @type {Declaration[][]} */
	const [ original, expected, ] = [ originalRule, expectedRule, ].map(
		rule => rule.children.filter(
			child => 'declaration' === getType(child)
		)
	);

	/** @type {Array.<Diff.ArrayChange<string>>} */
	const diff = diffArrays( // eslint-disable-line one-var
			...[ original, expected, ].map(
				declarations => declarations.map(
					declaration => declaration.props
				)
			)
		),
		result = [];

	diff.forEach(diffPart => {
		const state = getDiffPartState(diffPart);

		result.push(
			...diffPart.value.map(key => ({
				declaration: 0 !== state
					? findDeclarationByKey(
						key,
						state > 0
							? expected
							: original
					) : {
						original: findDeclarationByKey(key, original),
						expected: findDeclarationByKey(key, expected),
					},
				state,
			}))
		);
		return;
	});

	return result;
}

export default diffDeclarations;
