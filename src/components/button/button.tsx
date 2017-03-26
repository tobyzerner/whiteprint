import * as m from "mithril";

import { AbstractButton, IButtonAttrs } from "./abstractButton";

export { IButtonAttrs };

export class Button extends AbstractButton {
  public view(vnode: m.CVnode<IButtonAttrs>) {
    return (
      <button
        type="button"
        {...vnode.attrs}
        {...this.getCommonButtonAttrs(vnode)}
      >
        {vnode.children}
      </button>
    );
  }
}

export class AnchorButton extends AbstractButton {
  public view(vnode: m.CVnode<IButtonAttrs>) {
    const { href, tabIndex = 0 } = vnode.attrs;
    const commonAttrs = this.getCommonButtonAttrs(vnode);

    return (
      <a
        role="button"
        {...vnode.attrs}
        {...commonAttrs}
        href={commonAttrs.disabled ? undefined : href}
        tabIndex={commonAttrs.disabled ? undefined : tabIndex}
      >
        {vnode.children}
      </a>
    );
  }
}
