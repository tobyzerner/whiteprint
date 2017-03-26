import * as classNames from "classnames";
import * as m from "mithril";

import { AbstractComponent } from "../../abstractComponent";
import * as Classes from "../../common/classes";

export interface IButtonAttrs extends m.Attributes {
  disabled?: boolean;
  active?: boolean;
  loading?: boolean;
  onClick?: string;
}

export abstract class AbstractButton extends AbstractComponent<IButtonAttrs> {
  protected isActive;

  protected getCommonButtonAttrs(vnode: m.CVnode<IButtonAttrs>)  {
    const attrs = vnode.attrs || {} as IButtonAttrs;
    const disabled = attrs.disabled || attrs.loading;

    const className = classNames(
      Classes.BUTTON,
      {
        [Classes.ACTIVE]: this.isActive || attrs.active,
        [Classes.DISABLED]: disabled,
        [Classes.LOADING]: attrs.loading,
      },
      Classes.iconClass(attrs.iconName),
      // Classes.intentClass(attrs.intent),
      attrs.className,
    );

    return {
      className,
      disabled,
      onClick: disabled ? undefined : attrs.onClick,
      // onKeyDown: this.handleKeyDown,
      // onKeyUp: this.handleKeyUp,
    };
  }
}
