import { compile, serialize, stringify, } from 'stylis';


/**
 * Apply transformations to CSS AST.
 * Transformer function can ether return AST or falsy value
 * (if transformations was applied to the original AST).
 * @param {string}   css         Stylesheet to transform.
 * @param {Function} transformer Transformer function.
 * @returns {string} Transformed stylesheet.
 */
function transformCSS(css, transformer) {
	const ast = compile(css);

	let result = transformer(ast);

	return serialize(
		result || ast,
		stringify
	);
}

export default transformCSS;
