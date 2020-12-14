import RemovedProp from './RemovedProp';


const allowedProps = [
	'value',
	'type',
	'props',
	'children',
];

function propsHider(object) {
	for (let key in object) {
		if ((/^[0-9]+$/).test(key) || -~allowedProps.indexOf(key)) {
			if ('object' === typeof object[key]) {
				propsHider(object[key]);
			}
		} else {
			Object.defineProperty(object, key, {
				enumerable  : false,
				configurable: true,
				writable    : true,
			});
		}
	}
	return object;
}

function isASTEqual(left, right) {
	if (left === right)
		return true;

	if ([ left, right, ].every(side => Array.isArray(side))) {
		if (left.length !== right.length)
			return false;
		return left.every((el, i) => isASTEqual(el, right[i]));
	}

	return allowedProps.every(prop => {
		if ([ left, right, ].some(side => !(side && Object.prototype.hasOwnProperty.call(side, prop))))
			return false;
		return isASTEqual(left[prop], right[prop]);
	});
}

function generateDiffAST(object, patch) {
	let buffer = Array.isArray(object) ? [] : {};
	for (let key in object) {
		if (!Object.prototype.hasOwnProperty.call(patch, key) && !Array.isArray(object)) {
			buffer[key] = object[key];
		} else if (void 0 !== patch[key] && 'object' === typeof patch[key])
			buffer[key] = generateDiffAST(object[key], patch[key]);
	}
	for (let key in patch) {
		if ('object' !== typeof patch[key])
			if (typeof patch[key] === 'undefined')
				buffer[key] = new RemovedProp(object[key]);
			else
				buffer[key] = patch[key];
	}
	return Array.isArray(buffer)
		? buffer.filter(el => void 0 !== el)
		: buffer;
}

export {
	RemovedProp,
	propsHider,
	generateDiffAST,
	isASTEqual,
};
