"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newScroll2CursorPlugin = void 0;
var prosemirror_state_1 = require("prosemirror-state");
var DEFAULT_DELAY = 100;
var DEFAULT_OFFSET_BOTTOM = 64;
var DEFAULT_OFFEST_TOP = 64;
var DEFAULT_SCROLL_DISTANCE = 96;
/**
 * Scroll2Cursor plugin makes sure the cursor is always visible and at the
 * position that is comfortable for typing, not too low at the bottom or too
 * high at the top;
 */
exports.newScroll2CursorPlugin = function (options) {
    var _a, _b, _c, _d, _e;
    var timeoutScroll;
    var offsetBottom = (_a = options === null || options === void 0 ? void 0 : options.offsetBottom) !== null && _a !== void 0 ? _a : DEFAULT_OFFSET_BOTTOM;
    var offsetTop = (_b = options === null || options === void 0 ? void 0 : options.offsetTop) !== null && _b !== void 0 ? _b : DEFAULT_OFFEST_TOP;
    var scrollDistance = (_c = options === null || options === void 0 ? void 0 : options.scrollDistance) !== null && _c !== void 0 ? _c : DEFAULT_SCROLL_DISTANCE;
    var scrollerHeight = (_e = (_d = options === null || options === void 0 ? void 0 : options.scrollerElement) === null || _d === void 0 ? void 0 : _d.getBoundingClientRect().height) !== null && _e !== void 0 ? _e : window.innerHeight;
    function scrollTo(x, y) {
        var _a;
        ((_a = options === null || options === void 0 ? void 0 : options.scrollerElement) !== null && _a !== void 0 ? _a : window).scrollTo(x, y);
    }
    return new prosemirror_state_1.Plugin({
        props: {
            handleScrollToSelection: function (view) {
                var _a;
                if (scrollerHeight <= offsetBottom + offsetTop + scrollDistance) {
                    (options === null || options === void 0 ? void 0 : options.debugMode) && console.info("The window height is too small for the scrolling configurations");
                    return false;
                }
                timeoutScroll && clearTimeout(timeoutScroll);
                timeoutScroll = setTimeout(function () {
                    var _a, _b, _c, _d, _e;
                    var top = view.coordsAtPos(view.state.selection.$head.pos).top - ((_b = (_a = options === null || options === void 0 ? void 0 : options.scrollerElement) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect().top) !== null && _b !== void 0 ? _b : 0);
                    var scrollTop = (options === null || options === void 0 ? void 0 : options.computeScrollTop) ? options.computeScrollTop()
                        : (_e = (_d = (_c = options === null || options === void 0 ? void 0 : options.scrollerElement) === null || _c === void 0 ? void 0 : _c.scrollTop) !== null && _d !== void 0 ? _d : (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop)) !== null && _e !== void 0 ? _e : -1;
                    if (scrollTop === -1) {
                        (options === null || options === void 0 ? void 0 : options.debugMode) && console.error("The plugin could not determine scrollTop");
                        return;
                    }
                    var offBottom = top + offsetBottom - scrollerHeight;
                    if (offBottom > 0) {
                        scrollTo(0, scrollTop + offBottom + scrollDistance);
                        return;
                    }
                    var offTop = top - offsetTop;
                    if (offTop < 0) {
                        scrollTo(0, scrollTop + offTop - scrollDistance);
                    }
                }, (_a = options === null || options === void 0 ? void 0 : options.delay) !== null && _a !== void 0 ? _a : DEFAULT_DELAY);
                return true;
            }
        }
    });
};
