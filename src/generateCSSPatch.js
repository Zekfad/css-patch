import './CSSTransformers/ASTTypeDefs';

import { diffArrays, } from 'diff';
import { compile, serialize, stringify, } from 'stylis';

import { SortAndMerge, Unset, UpdateDeclarations, } from './CSSTransformers';
import getType from './CSSTransformers/getType';
import { diffRules, diffDeclarations, } from './diff';
import findDeclarationByKey from './diff/findDeclarationByKey';


/**
 * Sort declarations and merge equal rules in order they appear.
 * @param {stylis.Element[]} ast
 */
function normalize(ast) {
	SortAndMerge.transform(ast);
	return ast;
}

/**
 * Transform lists of rules.
 * @param {Rule[]} original Original rules set.
 * @param {Rule[]} expected Expected rules set.
 */
function transformDiffRules(original, expected) {
	const rulesDiff = diffRules(original, expected),
		result = [];

	rulesDiff.map(({ state, rule, }) => {
		switch (state) {
			case -1:
				Unset.transform(rule);
				result.push(rule);
				break;
			case 1:
				result.push(rule);
				break;
			case 0: {
				const { original: originalRule, expected: expectedRule, } = rule,
					declarationsDiff = diffDeclarations(originalRule, expectedRule);

				declarationsDiff.map(({ state, declaration, }) => {
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
				result.push(originalRule);
				break;
			}
		}
	});

	return result;
}

/**
 * @param {string} original
 * @param {string} expected
 */
function generateCSSPatch(original, expected) {
	const ast = [
			original,
			expected,
		]
			.map(compile)
			.map(ast => compile(
				serialize(ast, stringify)
			))
			.map(normalize),
		result = [];

	result.push(...transformDiffRules(ast[0], ast[1]));

	return serialize(result, stringify);
}

export default generateCSSPatch;
