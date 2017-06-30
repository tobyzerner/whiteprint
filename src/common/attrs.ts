/*
 * Copyright 2015 Palantir Technologies, Inc. All rights reserved.
 * Licensed under the BSD-3 License as modified (the “License”); you may obtain a copy
 * of the license at https://github.com/palantir/blueprint/blob/master/LICENSE
 * and https://github.com/palantir/blueprint/blob/master/PATENTS
 */

import * as m from "mithril";

import { Intent } from "./intent";

// TODO
// export type HTMLInputProps = React.HTMLProps<HTMLInputElement>;

/**
 * A shared base interface for all Blueprint component attrs.
 */
export interface IAttrs extends m.Attributes {
}

export interface IIntentAttrs {
    /** Visual intent color to apply to element. */
    intent?: Intent;
}

/**
 * Interface for a clickable action, such as a button or menu item.
 * These attrs can be spready directly to a `<Button>` or `<MenuItem>` element.
 */
export interface IActionAttrs extends IIntentAttrs, IAttrs {
    /** Whether this action is non-interactive. */
    disabled?: boolean;

    /** Name of the icon (the part after `pt-icon-`) to add to the button. */
    iconName?: string;

    /** Click event handler. */
    onclick?: (event: MouseEvent) => void;

    /** Action text. */
    text?: string;
}

/** Interface for a link, with support for customizing target window. */
export interface ILinkAttrs {
    /** Link URL. */
    href?: string;

    /** Link target attribute. Use `"_blank"` to open in a new window. */
    target?: string;
}

/** Interface for a controlled input. */
export interface IControlledAttrs {
    /** Initial value of the input, for uncontrolled usage. */
    defaultValue?: string;

    /** Change event handler. Use `event.target.value` for new value. */
    onchange?: (event: Event) => void;

    /** Form value of the input, for controlled usage. */
    value?: string;
}

/**
 * An interface for an option in a list, such as in a `<select>` or `RadioGroup`.
 * These Attrs can be spread directly to an `<option>` or `<Radio>` element.
 */
export interface IOptionAttrs extends IAttrs {
    /** Whether this option is non-interactive. */
    disabled?: boolean;

    /** Label text for this option. */
    label: string;

    /** Value of this option. */
    value: string;
}

/** A collection of curated prop keys used across our Components which are not valid HTMLElement Attrs. */
const INVALID_ATTRS = [
    "active",
    "containerRef",
    "elementRef",
    "iconName",
    "inputRef",
    "intent",
    "loading",
    "leftIconName",
    "onChildrenMount",
    "onRemove",
    "rightElement",
    "rightIconName",
    "text",
];

/**
 * Typically applied to HTMLElements to filter out blacklisted attrs. When applied to a Component,
 * can filter attrs from being passed down to the children. Can also filter by a combined list of
 * supplied prop keys and the blacklist (only appropriate for HTMLElements).
 * @param attrs The original attrs object to filter down.
 * @param {string[]} invalidAttrs If supplied, overwrites the default blacklist.
 * @param {boolean} shouldMerge If true, will merge supplied invalidAttrs and blacklist together.
 */
export function removeNonHTMLAttrs(
    attrs: { [key: string]: any },
    invalidAttrs = INVALID_ATTRS,
    shouldMerge = false,
): { [key: string]: any } {

    if (shouldMerge) {
        invalidAttrs = invalidAttrs.concat(INVALID_ATTRS);
    }

    return invalidAttrs.reduce((prev, curr) => {
        if (prev.hasOwnProperty(curr)) {
            delete (prev as any)[curr];
        }
        return prev;
    }, { ...attrs });
}
