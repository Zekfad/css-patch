import findDeclarationByKey from '../AST/findDeclarationByKey';
import { Unset, UpdateDeclarations, } from '../CSSTransformers';

import diffDeclarations from './diffDeclarations';


/**
 * Compare declarations between rules and apply diff transformation.
 * @param {Rule} originalRule Original rule.
 * @param {Rule} expectedRule Expected rule.
 * @returns {Rule}
 */
function transformDiffDeclarations(originalRule, expectedRule) {
	const diff = diffDeclarations(originalRule, expectedRule);

	diff.map(({ state, declaration, }) => {
		switch (state) {
			case -1:
				Unset.transform(
					findDeclarationByKey(
						declaration.props, originalRule.children
					)
				);
				break;
			case 1:
				originalRule.children.push(declaration);
				break;
			case 0: {
				const { original: originalDeclaration, expected: expectedDeclaration, } = declaration;

				if (originalDeclaration.children !== expectedDeclaration.children) {
					originalDeclaration.children = expectedDeclaration.children;
					UpdateDeclarations.transform(originalDeclaration);
				} else {
					originalRule.children.splice(originalRule.children.indexOf(originalDeclaration), 1);
				}

				break;
			}
		}
	});

	return originalRule;
}

export default transformDiffDeclarations;
