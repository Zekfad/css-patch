export default SortAndMerge;
/**
 * Merge duplicate declarations. For duplicated identifies last one would be used.
 * To apply this transformer call `SortAndMerge.transform(el)`.
 * @memberof CSSTransformers
 * @class
 */
declare class SortAndMerge extends CSSTransformerBase {
    rulesMaps: WeakMap<object, any>;
    rootsMaps: WeakMap<object, any>;
}
import CSSTransformerBase from "./CSSTransformerBase";
