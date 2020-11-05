import { Plugin } from 'prosemirror-state';
/**
 * Options for customizing Scroll2Cursor plugin
 */
export declare type Scroll2CursorOptions = {
    /**
     * The HTML element that wraps around the editor on which you would
     * call `scrollTo` to scroll to the cursor. Default to `window`.
     */
    scrollerElement?: HTMLElement;
    /**
     * Number of milliseconds to wait before starting scrolling. The main reason
     * for the delay is that it helps prevent flickering when the user hold down
     * the up/down key. Default to 50.
     */
    delay?: number;
    /**
     * Used to override the default function in case there is another
     * platform-specific implementation.
     */
    computeScrollTop?: () => number;
    /**
     * Number of pixels from the bottom where cursor position should be
     * considered too low. Default to 64.
     */
    offsetBottom?: number;
    /**
     * Number of pixels from the top where cursor position should be considered
     * too high. Default to 168.
     */
    offsetTop?: number;
    /**
     * Number of pixels you want to scroll downward/upward when the cursor is
     * too low/high the. Default to 96.
     */
    scrollDistance?: number;
    /**
     * When debugMode is false or not set, the plugin will not print anything to
     * the console.
     */
    debugMode?: boolean;
};
/**
 * Scroll2Cursor plugin makes sure the cursor is always visible and at the
 * position that is comfortable for typing, not too low at the bottom or too
 * high at the top;
 */
export declare const newScroll2CursorPlugin: (options?: Scroll2CursorOptions | undefined) => Plugin;
