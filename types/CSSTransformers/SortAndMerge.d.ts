export default SortAndMerge;
/**
 * Merge duplicate declarations. For duplicated identifies last one would be used.
 * In order to apply this transformer use static `SortAndMerge.transform(el)`.
 */
declare class SortAndMerge extends CSSTransformerBase {
    rulesMaps: WeakMap<object, any>;
    rootsMaps: WeakMap<object, any>;
}
import CSSTransformerBase from "./CSSTransformerBase";
