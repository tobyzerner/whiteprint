import { Children, ClassComponent, CVnode } from "mithril";

export abstract class AbstractComponent<A> implements ClassComponent<A> {
    public abstract view(this: ClassComponent<A>, vnode: CVnode<A>): Children | null | void;
}
