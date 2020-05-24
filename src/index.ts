import debug from 'debug';
import { Plugin } from 'prosemirror-state';

const log = debug('sroll2cursor:log');

const DEFAULT_DELAY = 50;
const DEFAULT_OFFSET_BOTTOM = 64;
const DEFAULT_OFFEST_TOP = 168;
const DEFAULT_SCROLL_DISTANCE = 96;

/**
 * Options for customizing Scroll2Cursor plugin
 */
export type Scroll2CursorOptions = {
	/**
	 * Number of milliseconds to wait before starting scrolling. The main reason
	 * for the delay is that it helps prevent flickering when the user hold down
	 * the up/down key. Default to 50.
	 */
	delay?: number,
	/**
	 * Used to override the default function in case there is another
	 * platform-specific implementation.
	 */
	computeScrollTop?: () => number,
	/**
	 * Number of pixels from the bottom where cursor position should be
	 * considered too low. Default to 64.
	 */
	offsetBottom?: number,
	/**
	 * Number of pixels from the top where cursor position should be considered
	 * too high. Default to 168.
	 */
	offsetTop?: number,
	/**
	 * Number of pixels you want to scroll downward/upward when the cursor is
	 * too low/high the. Default to 96.
	 */
	scrollDistance?: number
};

/**
 * Get the number of pixels that the current document is scrolled vertically.
 * It returns `-1` when it cannot determine the value.
 */
export function getScrollTop(): number {
	return window.pageYOffset ||
		document.documentElement.scrollTop ||
		document.body.scrollTop || -1;
}

/**
 * Scroll2Cursor plugin makes sure the cursor is always visible and at the
 * position that is comfortable for typing, not too low at the bottom or too
 * high at the top;
 */
export const newScroll2CursorPlugin = (options?: Scroll2CursorOptions): Plugin => {
	let timeoutScroll: ReturnType<typeof setTimeout>;

	return new Plugin({
		props: {
			handleKeyDown(view) {
				const offsetBottom = options?.offsetBottom ?? DEFAULT_OFFSET_BOTTOM;
				const offsetTop = options?.offsetTop ?? DEFAULT_OFFEST_TOP;
				const scrollDistance = options?.scrollDistance ?? DEFAULT_SCROLL_DISTANCE;
				if (window.innerHeight > offsetBottom + offsetTop + scrollDistance) {
					timeoutScroll && clearTimeout(timeoutScroll);
					timeoutScroll = setTimeout(function () {
						const top = view.coordsAtPos(view.state.selection.$head.pos).top;
						const scrollTop = options?.computeScrollTop ? options.computeScrollTop() : getScrollTop();

						if (scrollTop === -1) {
							log("The plugin could not determine scrollTop");
							return;
						}

						const offBottom = top + offsetBottom - innerHeight;
						if (offBottom > 0) {
							window.scrollTo(0, scrollTop + offBottom + scrollDistance);
							return;
						}

						const offTop = top - offsetTop;
						if (offTop < 0) {
							window.scrollTo(0, scrollTop + offTop - scrollDistance);
						}
					}, options?.delay ?? DEFAULT_DELAY);
				} else {
					log("The window height is too small for the scrolling configurations");
				}

				return false;
			}
		}
	});
}