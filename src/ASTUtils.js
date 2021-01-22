import { getType, } from './CSSTransformer';
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

const hasProp = (obj, propName) =>
	Object.prototype.hasOwnProperty.call(obj, propName);

function generateDiffAST(object, patch) {
	//debugger;
	const
		isArray = Array.isArray(object),
		buffer = isArray ? [] : {},
		keys = [ ...Object.keys(object ?? {}), ...Object.keys(patch ?? {}), ];

	let arrayOffsets = keys.map((el, i) => i);

	for (let key of keys) {
		if (isArray)
			key = arrayOffsets[key];
		//console.log('checkin', key, 'a', object, patch,'bufnow', buffer);
		if (!object) {
			//console.log('wtf', object,'k', key, patch, buffer);
			debugger;
			buffer[key] = patch[key];
			continue;
		}

		if (!hasProp(patch, key) && !isArray) {
			buffer[key] = object[key];
		} else if (void 0 !== patch[key] && 'object' === typeof patch[key]) {
			console.log('Key:',object, key, patch);
			if (object[key] && getType(object[key]) === 'rule' && hasProp(patch[key], 'value')) {
				let children = Object.keys(patch[key].children).map(el => patch[key].children[el]);

				buffer[key + 1] = generateDiffAST(object[key], Object.assign({}, patch[key], {
					children: [
						...children,
						...object[key].children.filter(
							child => !children.some(
								({ value, }) => value.substring(0, value.indexOf(':')) === child.props
							)
						),
					],
				}));
				console.log('aaa', object[key].children);
				buffer[key] = generateDiffAST(object[key], Object.assign(
					{},
					object[key],
					{
						children: object[key].children.map(() => void 0),
						//children: [...object[key].children, ...Object.keys(patch[key].children).map(key => patch[key].children[key]),],
					}
				));
				arrayOffsets = arrayOffsets.map((el, i) => i >= key ? el + 1 : el);

				console.log('Rule edited:',  object[key], 'Buffer:', buffer, 'pathch', patch, buffer[key + 1]);
			} else
				buffer[key] = generateDiffAST(object[key], patch[key]);
		}
	}
	for (let key in patch) {
		let objKey = isArray
			? arrayOffsets[key]
			: key;
		//console.log('patchin', key, objKey, patch, buffer);
		if ('object' !== typeof patch[key])
			if (typeof patch[key] === 'undefined')
				if ('object' === typeof object[objKey])
					buffer[key] = new RemovedProp(object[objKey]);
				else
					console.log('nani');
			else
				buffer[key] = patch[key];
	}
	console.log('returning', buffer);
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
