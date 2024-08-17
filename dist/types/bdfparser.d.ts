export type Headers = {
    bdfversion: number;
    fontname: string;
    pointsize: number;
    xres: number;
    yres: number;
    fbbx: number;
    fbby: number;
    fbbxoff: number;
    fbbyoff: number;
    swx0?: number;
    swy0?: number;
    dwx0?: number;
    dwy0?: number;
    swx1?: number;
    swy1?: number;
    dwx1?: number;
    dwy1?: number;
    vvectorx?: number;
    vvectory?: number;
    metricsset?: number;
    contentversion?: number;
    comment?: string[];
};
export type Props = Record<string, string | null> & {
    comment?: string[];
};
export type GlyphMetaInFont = [
    string,
    number,
    number,
    number,
    number,
    number,
    // bbyoff
    number | null,
    // swx0
    number | null,
    // swy0
    number | null,
    // dwx0
    number | null,
    // dwy0
    number | null,
    // swx1
    number | null,
    // swy1
    number | null,
    // dwx1
    number | null,
    // dwy1
    number | null,
    // vvectorx
    number | null,
    string[]
];
export type GlyphMeta = {
    glyphname: GlyphMetaInFont[0];
    codepoint: GlyphMetaInFont[1];
    bbw: GlyphMetaInFont[2];
    bbh: GlyphMetaInFont[3];
    bbxoff: GlyphMetaInFont[4];
    bbyoff: GlyphMetaInFont[5];
    swx0: GlyphMetaInFont[6];
    swy0: GlyphMetaInFont[7];
    dwx0: GlyphMetaInFont[8];
    dwy0: GlyphMetaInFont[9];
    swx1: GlyphMetaInFont[10];
    swy1: GlyphMetaInFont[11];
    dwx1: GlyphMetaInFont[12];
    dwy1: GlyphMetaInFont[13];
    vvectorx: GlyphMetaInFont[14];
    vvectory: GlyphMetaInFont[15];
    hexdata: GlyphMetaInFont[16];
};
export type TodataFuncRetType<T> = T extends undefined ? string[] : T extends 0 ? string : T extends 1 ? string[] : T extends 2 ? number[][] : T extends 3 ? number[] : T extends 4 ? string[] : T extends 5 ? number[] : never;
export type CodepointRangeType = number | [number, number] | [number, number][];
export type OrderType = -1 | 0 | 1 | 2;
export type GlyphDrawModeType = -1 | 0 | 1 | 2;
type CanvasContext = {
    fillStyle: any;
    fillRect: any;
};
declare const DIRE_SHORTCUT_MAP: {
    readonly lr: "lrtb";
    readonly rl: "rltb";
    readonly tb: "tbrl";
    readonly bt: "btrl";
    readonly lrtb: undefined;
    readonly lrbt: undefined;
    readonly rltb: undefined;
    readonly rlbt: undefined;
    readonly tbrl: undefined;
    readonly tblr: undefined;
    readonly btrl: undefined;
    readonly btlr: undefined;
};
declare const DIRE_MAP: {
    readonly lr: 1;
    readonly rl: 2;
    readonly tb: 0;
    readonly bt: -1;
};
export type DirectionType = keyof typeof DIRE_SHORTCUT_MAP;
export type DirectionNumberType = typeof DIRE_MAP[keyof typeof DIRE_MAP];
/**
 * `Font` object
 *
 * @see online docs: {@link https://font.tomchen.org/bdfparser_js/font}
 */
export declare class Font {
    headers: Headers | undefined;
    private __headers;
    props: Props;
    glyphs: Map<number, GlyphMetaInFont>;
    private __glyph_count_to_check;
    private __curline_startchar;
    private __curline_chars;
    private __f?;
    /**
     * Load the BDF font file (file line async iterator).
     *
     * @param filelines - Asynchronous iterable iterator containing each line in string text from the font file
     *
     * @returns The current `Font` object
     *
     * @see online docs: {@link https://font.tomchen.org/bdfparser_js/font#load_filelines}
     */
    load_filelines(filelines: AsyncIterableIterator<string>): Promise<this>;
    private __parse_headers;
    private __parse_headers_after;
    private __parse_props;
    private __parse_glyph_count;
    private __prepare_glyphs;
    private __prepare_glyphs_after;
    /**
     * Same as `.length()`
     * Returns how many glyphs actually exist in the font.
     *
     * @returns Actual glyph count in the font
     *
     * @see online docs: {@link https://font.tomchen.org/bdfparser_js/font#length}
     */
    get length(): number;
    /**
     * Similar to `.iterglyphs()`, except it returns an `array` of glyph codepoints instead of an `iterator` of `Glyph` objects.
     *
     * @param order  - Order
     * @param r  - Codepoint range
     *
     * @returns An iterator of the codepoints of glyphs
     *
     * @see online docs: {@link https://font.tomchen.org/bdfparser_js/font#itercps}
     */
    itercps(order?: OrderType | null, r?: number | [number, number] | [number, number][] | null): number[];
    /**
     * Returns an iterator of all the glyphs (as `Glyph` objects) in the font (default) or in the specified codepoint range in the font, sorted by the specified order (or by the ascending codepoint order by default).
     *
     * @param order  - Order
     * @param r  - Codepoint range
     *
     * @returns An iterator of glyphs as `Glyph` objects. Missing glyphs are replaced by `null`
     *
     * @see online docs: {@link https://font.tomchen.org/bdfparser_js/font#iterglyphs}
     */
    iterglyphs(order?: OrderType | null, r?: CodepointRangeType | null): IterableIterator<Glyph | null>;
    /**
     * Get a glyph (as Glyph Object) by its codepoint.
     *
     * @param codepoint - Codepoint
     *
     * @returns `Glyph` object, or `null` if the glyph does not exist in the font
     *
     * @see online docs: {@link https://font.tomchen.org/bdfparser_js/font#glyphbycp}
     */
    glyphbycp(codepoint: number): Glyph | null;
    /**
     * Get a glyph (as `Glyph` object) by its character.
     *
     * @param character - Character
     *
     * @returns `Glyph` object, or `null` if the glyph does not exist in the font
     *
     * @see online docs: {@link https://font.tomchen.org/bdfparser_js/font#glyph}
     */
    glyph(character: string): Glyph | null;
    /**
     * Check if there is any missing glyph and gets these glyphs' character.
     *
     * @param str - string to check
     *
     * @returns List of missing glyph(s)' characters, or `null` if all the glyphs in your string exist in the font
     *
     * @see online docs: {@link https://font.tomchen.org/bdfparser_js/font#lacksglyphs}
     */
    lacksglyphs(str: string): null | string[];
    /**
     * Draw the glyphs of the specified codepoints, to a `Bitmap` object.
     *
     * @param cps - Array of codepoints to draw
     * @param options.linelimit - Maximum pixels per line
     * @param options.mode - Mode
     * @param options.direction - Writing direction
     * @param options.usecurrentglyphspacing - Use current glyph spacing
     * @param options.missing - Missing glyph replacement
     * @param options.bb - Bounding box
     *
     * @returns `Bitmap` object
     *
     * @see online docs: {@link https://font.tomchen.org/bdfparser_js/font#drawcps}
     */
    drawcps(cps: number[], options?: {
        linelimit?: number | null;
        mode?: -1 | 0 | 1 | null;
        direction?: DirectionType | null;
        usecurrentglyphspacing?: boolean | null;
        missing?: Glyph | GlyphMeta | null;
        bb?: [number, number, number, number] | null;
    }): Bitmap;
    /**
     * Draw (render) the glyphs of the specified words / setences / paragraphs (as a `string`), to a `Bitmap` object.
     *
     * @param str - String to draw
     * @param options.linelimit - Maximum pixels per line
     * @param options.mode - Mode
     * @param options.direction - Writing direction
     * @param options.usecurrentglyphspacing - Use current glyph spacing
     * @param options.missing - Missing glyph replacement
     * @param options.bb - Bounding box
     *
     * @returns `Bitmap` object
     *
     * @see online docs: {@link https://font.tomchen.org/bdfparser_js/font#draw}
     */
    draw(str: string, options?: {
        linelimit?: number | null;
        mode?: -1 | 0 | 1 | null;
        direction?: DirectionType | null;
        usecurrentglyphspacing?: boolean | null;
        missing?: Glyph | GlyphMeta | null;
        bb?: [number, number, number, number] | null;
    }): Bitmap;
    /**
     * Draw all the glyphs in the font (default) or in the specified codepoint range in the font, sorted by the specified order (or by the ascending codepoint order by default), to a `Bitmap` object.
     *
     * @param options.order - Order
     * @param options.r - Codepoint range
     * @param options.linelimit - Maximum pixels per line
     * @param options.mode - Mode
     * @param options.direction - Writing direction
     * @param options.usecurrentglyphspacing - Use current glyph spacing
     *
     * @returns `Bitmap` object
     *
     * @see online docs: {@link https://font.tomchen.org/bdfparser_js/font#drawall}
     */
    drawall(options?: {
        order?: OrderType;
        r?: CodepointRangeType;
        linelimit?: number | null;
        mode?: 0 | 1 | null;
        direction?: DirectionType | null;
        usecurrentglyphspacing?: boolean | null;
    }): Bitmap;
}
/**
 * `Glyph` object
 *
 * @see online docs: {@link https://font.tomchen.org/bdfparser_js/glyph}
 */
export declare class Glyph {
    meta: GlyphMeta;
    font: Font;
    /**
     * `Glyph` object constructor
     *
     * @param meta_obj - Meta information
     * @param font - The font the glyph belongs to
     *
     * @see online docs: {@link https://font.tomchen.org/bdfparser_js/glyph}
     */
    constructor(meta_obj: GlyphMeta, font: Font);
    /**
     * Gets a human-readable (multi-line) `string` representation of the `Glyph` object.
     *
     * @returns String representation
     *
     * @see online docs: {@link https://font.tomchen.org/bdfparser_js/glyph#tostring}
     */
    toString(): string;
    /**
     * Gets a programmer-readable `string` representation of the `Glyph` object.
     *
     * @returns String representation
     *
     * @see online docs: {@link https://font.tomchen.org/bdfparser_js/glyph#repr}
     */
    repr(): string;
    /**
     * Get the codepoint of the glyph.
     *
     * @returns Codepoint of the glyph
     *
     * @see online docs: {@link https://font.tomchen.org/bdfparser_js/glyph#cp}
     */
    cp(): number;
    /**
     * Get the character of the glyph.
     *
     * @returns Character (one character string) of the glyph
     *
     * @see online docs: {@link https://font.tomchen.org/bdfparser_js/glyph#chr}
     */
    chr(): string;
    /**
     * Draw the glyph to a `Bitmap` object.
     *
     * @param mode - Mode
     * @param bb - Bounding box
     *
     * @returns `Bitmap` object
     *
     * @see online docs: {@link https://font.tomchen.org/bdfparser_js/glyph#draw}
     */
    draw(mode?: GlyphDrawModeType | null, bb?: [number, number, number, number] | null): Bitmap;
    private __draw_user_specified;
    private __draw_original;
    private __draw_bb;
    private __draw_fbb;
    /**
     * Get the relative position (displacement) of the origin from the left bottom corner of the bitmap drawn by the method `.draw()`, or vice versa.
     *
     * @param options.mode - Mode
     * @param options.fromorigin - From or to the origin
     * @param options.xoff - X offset
     * @param options.yoff - Y offset
     *
     * @returns The relative position (displacement) represented by `[x, y]` array / tuple (where right and top directions are positive)
     *
     * @see online docs: {@link https://font.tomchen.org/bdfparser_js/glyph#origin}
     */
    origin(options?: {
        mode?: GlyphDrawModeType | null;
        fromorigin?: boolean | null;
        xoff?: number | null;
        yoff?: number | null;
    }): [number, number];
}
/**
 * `Bitmap` object
 *
 * @see online docs: {@link https://font.tomchen.org/bdfparser_js/bitmap}
 */
export declare class Bitmap {
    bindata: string[];
    /**
     * Initialize a `Bitmap` object. Load binary bitmap data (`array` of `string`s).
     *
     * @param bin_bitmap_list - Binary bitmap data
     *
     * @see online docs: {@link https://font.tomchen.org/bdfparser_js/bitmap}
     */
    constructor(bin_bitmap_list: string[]);
    /**
     * Gets a human-readable (multi-line) `string` representation of the `Bitmap` object.
     *
     * @returns String representation
     *
     * @see online docs: {@link https://font.tomchen.org/bdfparser_js/bitmap#tostring}
     */
    toString(): string;
    /**
     * Gets a programmer-readable (multi-line) `string` representation of the `Bitmap` object.
     *
     * @returns String representation
     *
     * @see online docs: {@link https://font.tomchen.org/bdfparser_js/bitmap#repr}
     */
    repr(): string;
    /**
     * Get the width of the bitmap.
     *
     * @returns Width of the bitmap
     *
     * @see online docs: {@link https://font.tomchen.org/bdfparser_js/bitmap#width}
     */
    width(): number;
    /**
     * Get the height of the bitmap.
     *
     * @returns Height of the bitmap
     *
     * @see online docs: {@link https://font.tomchen.org/bdfparser_js/bitmap#height}
     */
    height(): number;
    /**
     * Get a deep copy / clone of the `Bitmap` object.
     *
     * @returns A deep copy of the original `Bitmap` object
     *
     * @see online docs: {@link https://font.tomchen.org/bdfparser_js/bitmap#clone}
     */
    clone(): Bitmap;
    private static __crop_string;
    private static __string_offset_concat;
    private static __listofstr_offset_concat;
    private static __crop_bitmap;
    /**
     * Crop and/or extend the bitmap.
     *
     * @param w - Width
     * @param h - Height
     * @param xoff - X offset
     * @param yoff - Y offset
     *
     * @returns The `Bitmap` object itself, which now has only the specified area as its `.bindata`
     *
     * @see online docs: {@link https://font.tomchen.org/bdfparser_js/bitmap#crop}
     */
    crop(w: number, h: number, xoff?: number | null, yoff?: number | null): this;
    /**
     * Overlay another bitmap over the current one.
     *
     * @param bitmap - The incoming bitmap to overlay over the current one
     *
     * @returns The `Bitmap` object itself, which now has the combined bitmap as its `.bindata`
     *
     * @see online docs: {@link https://font.tomchen.org/bdfparser_js/bitmap#overlay}
     */
    overlay(bitmap: Bitmap): this;
    /**
     * Concatenate all `Bitmap` objects in an `array`.
     *
     * @param bitmaplist - List of bitmaps to concatenate
     * @param options.direction - Direction
     * @param options.align - Align
     * @param options.offsetlist - List of spacing offsets between every two glyphs
     *
     * @returns `Bitmap` object
     *
     * @see online docs: {@link https://font.tomchen.org/bdfparser_js/bitmap#bitmapconcatall}
     */
    static concatall(bitmaplist: Bitmap[], options?: {
        direction?: DirectionNumberType | null;
        align?: 0 | 1 | null;
        offsetlist?: number[] | null;
    }): Bitmap;
    /**
     * Concatenate another `Bitmap` objects to the current one.
     *
     * @param bitmap - Bitmap to concatenate
     * @param options.direction - Direction
     * @param options.align - Align
     * @param options.offset - Spacing offset between the glyphs
     *
     * @returns The `Bitmap` object itself, which now has the combined bitmap as its `.bindata`
     *
     * @see online docs: {@link https://font.tomchen.org/bdfparser_js/bitmap#concat}
     */
    concat(bitmap: Bitmap, options?: {
        direction?: DirectionNumberType | null;
        align?: 0 | 1 | null;
        offset?: number | null;
    }): this;
    private static __enlarge_bindata;
    /**
     * Enlarge a `Bitmap` object, by multiplying every pixel in x (right) direction and in y (top) direction.
     *
     * @param x - Multiplier in x (right) direction
     * @param y - Multiplier in y (top) direction
     *
     * @returns The `Bitmap` object itself, which now has the enlarged bitmap as its `.bindata`
     *
     * @see online docs: {@link https://font.tomchen.org/bdfparser_js/bitmap#enlarge}
     */
    enlarge(x?: number, y?: number): this;
    /**
     * Replace a string by another in the bitmap.
     *
     * @param substr - Substring to be replaced
     * @param newsubstr - New substring as the replacement
     *
     * @returns The `Bitmap` object itself, which now has the altered bitmap as its `.bindata`
     *
     * @see online docs: {@link https://font.tomchen.org/bdfparser_js/bitmap#replace}
     */
    replace(substr: string | number, newsubstr: string | number): this;
    /**
     * Add shadow to the shape in the bitmap.
     *
     * The shadow will be filled by `'2'`s.
     *
     * @param xoff - Shadow's offset in x (right) direction
     * @param yoff - Shadow's offset in y (top) direction
     *
     * @returns The `Bitmap` object itself, which now has a bitmap of the original shape with its shadow as the `Bitmap` object's `.bindata`
     *
     * @see online docs: {@link https://font.tomchen.org/bdfparser_js/bitmap#shadow}
     */
    shadow(xoff?: number | null, yoff?: number | null): this;
    /**
     * Add glow effect to the shape in the bitmap.
     *
     * The glowing area is one pixel up, right, bottom and left to the original pixels (corners will not be filled in default mode 0 but will in mode 1), and will be filled by `'2'`s.
     *
     * @param mode - Mode
     *
     * @returns The `Bitmap` object itself, which now has a bitmap of the original shape with glow effect as the `Bitmap` object's `.bindata`
     *
     * @see online docs: {@link https://font.tomchen.org/bdfparser_js/bitmap#glow}
     */
    glow(mode?: 0 | 1 | null): this;
    /**
     * Pad each line (row) to multiple of 8 (or other numbers) bits/pixels, with `'0'`s.
     *
     * Do this before using the bitmap for a glyph in a BDF font.
     *
     * @param bits - Each line should be padded to multiple of how many bits/pixels
     *
     * @returns The `Bitmap` object itself, which now has the altered bitmap as its `.bindata`
     *
     * @see online docs: {@link https://font.tomchen.org/bdfparser_js/bitmap#bytepad}
     */
    bytepad(bits?: number | null): this;
    /**
     * Get the bitmap's data in the specified type and format.
     *
     * @param datatype - Output data type
     *
     * @returns Bitmap data in the specified type (list or string) and format
     *
     * @see online docs: {@link https://font.tomchen.org/bdfparser_js/bitmap#todata}
     */
    todata<T extends 0 | 1 | 2 | 3 | 4 | 5 | null>(datatype?: T): TodataFuncRetType<T>;
    /**
     * Draw the bitmap to HTML canvas
     *
     * @param context - Canvas 2D context (`canvas.getContext("2d")`)
     * @param pixelcolors - Object mapping `'0'`/`'1'`/`'2'` in the bitmap data to color
     *
     * @returns The `Bitmap` object itself
     *
     * @see online docs: {@link https://font.tomchen.org/bdfparser_js/bitmap#draw2canvas}
     */
    draw2canvas(context: CanvasContext, pixelcolors?: Record<'0' | '1' | '2', string | null> | null): this;
}
/**
 * Shortcut for `new Font().load_filelines(filelines)` so you don't need to write `new` and `.load_filelines`
 *
 * @param filelines - Asynchronous iterator containing each line in string text from the font file
 *
 * @returns The newly instantiated `Font` object that's loaded the font file
 */
export declare const $Font: (filelines: AsyncIterableIterator<string>) => Promise<Font>;
/**
 * Shortcut for `new Glyph(meta_obj, font)` so you don't need to write `new`
 *
 * @param meta_obj - Meta information
 * @param font - The font the glyph belongs to
 *
 * @returns The newly instantiated `Glyph` object
 */
export declare const $Glyph: (meta_obj: GlyphMeta, font: Font) => Glyph;
/**
 * Shortcut for `new Bitmap(bin_bitmap_list)` so you don't need to write `new`
 *
 * @param bin_bitmap_list - Binary bitmap data
 *
 * @returns The newly instantiated `Bitmap` object
 */
export declare const $Bitmap: (bin_bitmap_list: string[]) => Bitmap;
export {};
