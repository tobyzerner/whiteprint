import * as m from "mithril";

import { AbstractComponent } from "../../abstractComponent";
import { IAttrs, removeNonHTMLAttrs } from "../../common/attrs";
import * as Classes from "../../common/classes";
import * as Errors from "../../common/errors";
import { safeInvoke } from "../../common/utils";

export interface IPortalAttrs extends IAttrs {
    /**
     * A React `ref` handler callback for the detached container root element.
     * As this component renders its contents into a separate container, the result of the `ref`
     * prop is not backed by a DOM node. Hence this callback is necessary to get the real DOM node.
     */
    containerRef?: (ref: HTMLDivElement) => void;

    /**
     * Callback invoked when the children of this `Portal` have been added to the DOM.
     */
    onChildrenMount?: () => void;
}

// TODO
// export interface IPortalContext {
//     [>* Additional class to add to portal element <]
//     blueprintPortalClassName?: string;
// }

/**
 * This component detaches its contents and re-attaches them to document.body.
 * Use it when you need to circumvent DOM z-stacking (for dialogs, popovers, etc.).
 * Any class names passed to this element will be propagated to the new container element on document.body.
 */
export class Portal extends AbstractComponent<IPortalAttrs> {
    private rootElement: HTMLElement;
    private content: m.Component<{}, {}>;

    public view() {
        return m.fragment({}, []);
    }

    public oncreate({children, attrs}: m.CVnodeDOM<IPortalAttrs>) {
        const rootElement = document.createElement("div");
        rootElement.classList.add(Classes.PORTAL);

        document.body.appendChild(rootElement);
        this.rootElement = rootElement;
        this.content = {
            oncreate: ({dom}: m.CVnodeDOM<IPortalAttrs>) => {
                if (attrs) {
                    safeInvoke(attrs.containerRef, dom as HTMLDivElement);
                    safeInvoke(attrs.onChildrenMount);
                }
            },
            view: () => {
                return (
                    <div {...removeNonHTMLAttrs(attrs)}>
                    {children}
                    </div>
                );
            },
        };

        m.mount(this.rootElement, this.content);
    }

    public onbeforeupdate({children, attrs}: m.CVnodeDOM<IPortalAttrs>) {
        this.content.view = () => {
            return (
                <div {...removeNonHTMLAttrs(attrs)}>
                {children}
                </div>
            );
        };
    }

    public onremove() {
        if (document.body.contains(this.rootElement)) {
            m.mount(this.rootElement, null);
            this.rootElement.remove();
        }
    }
}
