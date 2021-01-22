import './CSSTransformers/ASTTypeDefs';
import { compile, serialize, stringify, } from 'stylis';

import { SortAndMerge, Unset, UpdateDeclarations, } from './CSSTransformers';
import { diffAtRules, diffRules, diffDeclarations, } from './diff';
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
 * Compare declarations in rules and apply diff transformation.
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

/**
 * Transform lists of rules.
 * @param {Rule[]} original Original rules set.
 * @param {Rule[]} expected Expected rules set.
 */
function transformDiffRules(original, expected) {
	const diff = diffRules(original, expected),
		result = [];

	diff.map(({ state, rule, }) => {
		result.push(
			0 !== state
				? state < 0
					? (Unset.transform(rule), rule)
					: rule
				: transformDiffDeclarations(rule.original, rule.expected)
		);
	});

	return result;
}

/**
 * Transform lists of at rules.
 * @param {AtRule[]} original Original rules set.
 * @param {AtRule[]} expected Expected rules set.
 */
function transformDiffAtRules(original, expected) {
	const diff = diffAtRules(original, expected),
		result = [];

	diff.map(({ state, rule, }) => {
		if (0 !== state) return result.push(
			state < 0
				? (Unset.transform(rule), rule)
				: rule
		);

		transformDiffDeclarations(rule.original, rule.expected);
		transformDiffRules(rule.original.children, rule.expected.children);

		return result.push(rule.original);
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

	result.push(...[
		...transformDiffRules(ast[0], ast[1]),
		...transformDiffAtRules(ast[0], ast[1]),
	]);

	return serialize(result, stringify);
}

export default generateCSSPatch;
