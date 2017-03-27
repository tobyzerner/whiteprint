import * as classNames from "classnames";
import * as m from "mithril";

import * as Classes from "../../common/classes";
import { Spinner } from "./spinner";

export class SVGSpinner extends Spinner {
    protected renderContainer(classes: string, content) {
        return (
            <g className={classNames(Classes.SVG_SPINNER, classes)}>
                <g className="pt-svg-spinner-transform-group">
                    {content}
                </g>
            </g>
        );
    }
}
