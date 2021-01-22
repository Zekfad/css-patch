import { diffArrays, } from 'diff';
import { compile, serialize, stringify, } from 'stylis';

import { SortAndMerge, Unset, UpdateDeclarations, } from './CSSTransformers';
import getType from './CSSTransformers/getType';
import './CSSTransformers/ASTTypeDefs';

/**
 * Sort declarations and merge equal rules in order they appear.
 * @param {stylis.Element[]} ast
 */
function normalize(ast) {
	SortAndMerge.transform(ast);
	return ast;
}

/**
 * Find rule object in list of rules by given selector.
 * @param {string} selector String selector (multiple selectors are joined by comma).
 * @param {Rule[]} rules List of rules.
 * @returns {Rule}
 */
function findRuleBySelector(selector, rules) {
	return rules.find(rule => rule.props.join(',') === selector);
}

/**
 * Get all selectors from a rules set.
 * @param {Rule[]} rules List of rules.
 * @returns {string[]} Selectors.
 */
function getRulesSelectors(rules) {
	return rules.map(rule => rule.props.join(','));
}

/**
 * Get numeric state of a diff part.
 * @param {Diff.ArrayChange.<any>} diffPart Diff part.
 * @returns {number}
 */
function getDiffPartState(diffPart) {
	return diffPart.added
		? 1
		: diffPart.removed
			? -1
			: 0;
}

/**
 * Compare lists of rules.
 * @param {Rule[]} original Original rules set.
 * @param {Rule[]} expected Expected rules set.
 */
function diffRules(original, expected) {
	/** @type {Array.<Diff.ArrayChange.<string>>} */
	const diff = diffArrays(
			...[ original, expected, ].map(
				selectors => getRulesSelectors(selectors).sort()
			)
		),
		result = [];

	diff.forEach(diffPart => {
		const state = getDiffPartState(diffPart);

		return result.push(
			...diffPart.value.map(selector => ({
				rule: 0 !== state
					? findRuleBySelector(
						selector,
						state > 0
							? expected
							: original
					) : {
						original: findRuleBySelector(selector, original),
						expected: findRuleBySelector(selector, expected),
					},
				state,
			}))
		);
	});

	return result;
}

/**
 * Find declaration object in list of declarations by given key.
 * @param {string} selector Declarations key.
 * @param {Declaration[]} declarations List of declarations.
 * @returns {Declaration}
 */
function findDeclarationByKey(key, declarations) {
	return declarations.find(declaration => key === declaration.props);
}

/**
 * Compare sets of declarations.
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
							console.log({ originalDeclaration, expectedDeclaration, });

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
