# Scroll2Cursor - A ProseMirror Plugin

Scroll2Cursor is a [prosemirror](https://prosemirror.net/) plugin. It makes sure
the cursor is always visible and at the position that is comfortable for typing,
not too low at the bottom or too high at the top;

## Demo

![Demo
GIF](https://raw.githubusercontent.com/kongdivin/prosemirror-scroll2cursor/master/demo/scroll2cursor.gif)

## Usage

```js
import { newScroll2CursorPlugin } from 'prosemirror-scroll2cursor';

new newScroll2CursorPlugin({ offsetBottom: 64, offsetTop: 128 });
```

## Configurations

```typescript
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
```

## Contributing

If you spot any bugs or want to request a new feature, please use [Issue
Tracker](https://github.com/kongdivin/prosemirror-scroll2cursor/issues). Or if
you want to add a new feature directly, please create a [Pull
Request](https://github.com/kongdivin/prosemirror-scroll2cursor/pulls).

## License

Licensed under [The MIT
License](https://github.com/kongdivin/prosemirror-scroll2cursor/blob/master/LICENSE).