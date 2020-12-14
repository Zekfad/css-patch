import { diff, } from 'deep-object-diff';
import { compile, serialize, stringify, } from 'stylis';

import {
	propsHider,
	generateDiffAST,
} from './ASTUtils';


function generateCSSPatch(original, expected) {
	const ast = [
		compile(original),
		compile(expected),
	].map(propsHider);

	return serialize(
		generateDiffAST(
			ast[0],
			diff(
				ast[0],
				ast[1]
			)
		),
		stringify
	);
}

export default generateCSSPatch;
