"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newScroll2CursorPlugin = exports.getScrollTop = void 0;
var prosemirror_state_1 = require("prosemirror-state");
var DEFAULT_DELAY = 50;
var DEFAULT_OFFSET_BOTTOM = 64;
var DEFAULT_OFFEST_TOP = 168;
var DEFAULT_SCROLL_DISTANCE = 96;
/**
 * Get the number of pixels that the current document is scrolled vertically.
 * It returns `-1` when it cannot determine the value.
 */
function getScrollTop() {
    var _a;
    return (_a = (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop)) !== null && _a !== void 0 ? _a : -1;
}
exports.getScrollTop = getScrollTop;
/**
 * Scroll2Cursor plugin makes sure the cursor is always visible and at the
 * position that is comfortable for typing, not too low at the bottom or too
 * high at the top;
 */
exports.newScroll2CursorPlugin = function (options) {
    var timeoutScroll;
    return new prosemirror_state_1.Plugin({
        props: {
            handleKeyDown: function (view) {
                var _a, _b, _c, _d;
                var offsetBottom = (_a = options === null || options === void 0 ? void 0 : options.offsetBottom) !== null && _a !== void 0 ? _a : DEFAULT_OFFSET_BOTTOM;
                var offsetTop = (_b = options === null || options === void 0 ? void 0 : options.offsetTop) !== null && _b !== void 0 ? _b : DEFAULT_OFFEST_TOP;
                var scrollDistance = (_c = options === null || options === void 0 ? void 0 : options.scrollDistance) !== null && _c !== void 0 ? _c : DEFAULT_SCROLL_DISTANCE;
                if (window.innerHeight > offsetBottom + offsetTop + scrollDistance) {
                    timeoutScroll && clearTimeout(timeoutScroll);
                    timeoutScroll = setTimeout(function () {
                        var top = view.coordsAtPos(view.state.selection.$head.pos).top;
                        var scrollTop = (options === null || options === void 0 ? void 0 : options.computeScrollTop) ? options.computeScrollTop() : getScrollTop();
                        if (scrollTop === -1) {
                            (options === null || options === void 0 ? void 0 : options.debugMode) && console.error("The plugin could not determine scrollTop");
                            return;
                        }
                        var offBottom = top + offsetBottom - innerHeight;
                        if (offBottom > 0) {
                            window.scrollTo(0, scrollTop + offBottom + scrollDistance);
                            return;
                        }
                        var offTop = top - offsetTop;
                        if (offTop < 0) {
                            window.scrollTo(0, scrollTop + offTop - scrollDistance);
                        }
                    }, (_d = options === null || options === void 0 ? void 0 : options.delay) !== null && _d !== void 0 ? _d : DEFAULT_DELAY);
                }
                else {
                    (options === null || options === void 0 ? void 0 : options.debugMode) && console.info("The window height is too small for the scrolling configurations");
                }
                return false;
            }
        }
    });
};
