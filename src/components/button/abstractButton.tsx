import * as classNames from "classnames";
import * as m from "mithril";

import { AbstractComponent } from "../../abstractComponent";
import * as Classes from "../../common/classes";
import * as Keys from "../../common/keys";
import { safeInvoke } from "../../common/utils";
import { Spinner } from "../spinner/spinner";

export interface IButtonAttrs extends m.Attributes {
    /** A ref handler that receives the native HTML element backing this component. */
    elementRef?: (ref: HTMLElement) => any;

    /** Name of the icon (the part after `pt-icon-`) to add to the button. */
    rightIconName?: string;

    /**
     * If set to `true`, the button will display a centered loading spinner instead of its contents.
     * The width of the button is not affected by the value of this prop.
     * @default false
     */
    loading?: boolean;

    /**
     * If set to `true`, the button will display in an active state.
     * This is equivalent to setting `pt-active` via className.
     * @default false
     */
    active?: boolean;

    /**
     * HTML `type` attribute of button. Common values are `"button"` and `"submit"`.
     * Note that this prop has no effect on `AnchorButton`; it only affects `Button`.
     * @default "button"
     */
    type?: string;
}

export abstract class AbstractButton extends AbstractComponent<IButtonAttrs> {
    protected isActive = false;
    protected currentKeyDown: number = null;

    protected getCommonButtonAttrs(vnode: m.CVnode<IButtonAttrs>) {
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
            onclick: disabled ? undefined : attrs.onClick,
            // should be cleanup after https://github.com/lhorie/mithril.js/issues/1744
            // onkeydown: this.handleKeyDown,
            // onkeyup: this.handleKeyUp,
        };
    }

    // we're casting as `any` to get around a somewhat opaque safeInvoke error
    // that "Type argument candidate 'KeyboardEvent<T>' is not a valid type
    // argument because it is not a supertype of candidate
    // 'KeyboardEvent<HTMLElement>'."
    protected handleKeyDown = (e: any, vnode: m.CVnodeDOM<IButtonAttrs>) => {
        if (isKeyboardClick(e.keyCode)) {
            e.preventDefault();
            if (e.keyCode !== this.currentKeyDown) {
                this.isActive = true;
            }
        }
        this.currentKeyDown = e.keyCode;
        safeInvoke(vnode.attrs.onkeydown, e);
    }

    protected handleKeyUp = (e: any, vnode: m.CVnodeDOM<IButtonAttrs>) => {
        if (isKeyboardClick(e.keyCode)) {
            this.isActive = false;
            // this.buttonRef.click();
        }
        this.currentKeyDown = null;
        safeInvoke(vnode.attrs.onkeyup, e);
    }

    protected renderChildren(vnode: m.CVnode<IButtonAttrs>) {
        const { loading, rightIconName, text } = vnode.attrs || {} as IButtonAttrs;
        const iconClasses = classNames(Classes.ICON_STANDARD, Classes.iconClass(rightIconName), Classes.ALIGN_RIGHT);

        const children = vnode.text ? <span key="text-child">{vnode.text}</span> : vnode.children;

        return [
            loading ? <Spinner className="pt-small pt-button-spinner" key="spinner" /> : undefined,
            text != null ? <span key="text">{text}</span> : undefined,
            vnode.children,
            rightIconName != null ? <span className={iconClasses} key="icon" /> : undefined,
        ];
    }
}

function isKeyboardClick(keyCode: number) {
    return keyCode === Keys.ENTER || keyCode === Keys.SPACE;
}
