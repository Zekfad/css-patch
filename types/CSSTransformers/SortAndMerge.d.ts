export default SortAndMerge;
/**
 * Merge duplicate declarations. Last appeared would be used for value.
 * In order to apply this transformer use static `SortAndMerge.transform(el)`.
 */
declare class SortAndMerge extends CSSTransformer {
    rulesMaps: WeakMap<object, any>;
    rootsMaps: WeakMap<object, any>;
}
import CSSTransformer from "./CSSTransformer";
