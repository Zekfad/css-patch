import { CSSTransformer, } from './CSSTransformer';


const transformer = new CSSTransformer();

class RemovedProp {
	constructor(object) {
		Object.assign(this, object);
		transformer.getTransformer(this)(this);
	}
}

export default RemovedProp;
