import { Font, Glyph } from '../src/index'
import readlineiter from 'readlineiter'
import { unifont_path, glyph_a_meta, missing_glyph_meta } from './info'

describe('Font loading', () => {
  let font

  beforeEach(() => {
    font = new Font()
  })

  test('load_filelines', async () => {
    const lineIter = readlineiter(unifont_path)
    expect(await font.load_filelines(lineIter)).toBeInstanceOf(Font)
  })
})

describe('Font', () => {
  let font

  beforeEach(() => {
    font = new Font()
    return font.load_filelines(readlineiter(unifont_path))
  })

  describe('basic', () => {
    test('init', () => {
      expect(font).toBeInstanceOf(Font)
    })

    test('headers', () => {
      expect(font.headers).toEqual({
        bdfversion: 2.1,
        fontname:
          '-gnu-Unifont-Medium-R-Normal-Sans-16-160-75-75-c-80-iso10646-1',
        pointsize: 16,
        xres: 75,
        yres: 75,
        fbbx: 16,
        fbby: 16,
        fbbxoff: 0,
        fbbyoff: -2,
        comment: [
          'Generated by fontforge, http://fontforge.sourceforge.net',
          '(C)Copyright',
        ],
        metricsset: 0,
      })
    })

    test('props', () => {
      expect(font.props).toEqual({
        add_style_name: 'Sans Serif',
        average_width: '80',
        cap_height: '10',
        charset_encoding: '1',
        charset_registry: 'ISO10646',
        copyright:
          'Copyright (C) 1998-2020 Roman Czyborra, Paul Hardy, Qianqian Fang, Andrew Miller, Johnnie Weaver, David Corbett, Rebecca Bettencourt, et al. License: SIL Open Font License version 1.1 and GPLv2+: GNU GPL version 2 or later <http://gnu.org/licenses/gpl.html> with the GNU Font Embedding Exception.',
        default_char: '65533',
        family_name: 'Unifont',
        font_ascent: '14',
        font_descent: '2',
        font_type: 'Bitmap',
        font_version: '13.0.04',
        foundry: 'GNU',
        pixel_size: '16',
        point_size: '160',
        resolution_x: '75',
        resolution_y: '75',
        setwidth_name: 'Normal',
        slant: 'R',
        spacing: 'C',
        underline_position: '-2',
        underline_thickness: '1',
        weight_name: 'Medium',
        x_height: '8',
      })
    })

    test('glyphs_a', () => {
      // prettier-ignore
      expect(font.glyphs.get(97)).toEqual([
        'U+0061', 97, 8, 16, 0, -2, 500, 0, 8, 0,
        null, null, null, null, null, null,
        ['00','00','00','00','00','00','3C','42','02','3E','42','42','46','3A','00','00'],
      ])
    })

    test('glyphs_len', () => {
      expect(font.glyphs.size).toEqual(font.length)
    })

    test('length', () => {
      expect(font.length).toBe(849)
    })
  })

  describe('iter', () => {
    test('itercps_list_len', () => {
      expect(font.itercps().length).toEqual(font.length)
    })

    test('itercps_cp_first', () => {
      expect(font.itercps()[0]).toEqual(0)
    })

    test('itercps_cp_reversed_first', () => {
      expect(font.itercps(2)[0]).toEqual(30340)
    })

    test('itercps_file_first', () => {
      expect(font.itercps(0)[0]).toEqual(1)
    })

    test('itercps_file_reversed_first', () => {
      expect(font.itercps(-1)[0]).toEqual(1790)
    })

    test('itercps_range', () => {
      const r128 = font.itercps(null, 128)
      const r0x100 = font.itercps(null, 0x100)
      expect(r128.length).toEqual(128)
      expect(r0x100.length).toEqual(256)
      expect(font.itercps(null, [0, 127])).toEqual(r128)
      expect(font.itercps(null, [0, 0xff])).toEqual(r0x100)
    })

    test('itercps_range2', () => {
      const r_numbers = font.itercps(null, [48, 57])
      const r_reversed_uppers = font.itercps(2, [65, 90])
      const r_letters_with_nonexistent_range = font.itercps(null, [
        [65, 90],
        [97, 122],
        [0x20000, 0x3134f],
      ])
      // prettier-ignore
      expect(r_numbers).toEqual([48, 49, 50, 51, 52, 53, 54, 55, 56, 57])
      // prettier-ignore
      expect(r_reversed_uppers).toEqual([90, 89, 88, 87, 86, 85, 84, 83, 82, 81, 80, 79, 78, 77, 76, 75, 74, 73, 72, 71, 70, 69, 68, 67, 66, 65])
      // prettier-ignore
      expect(r_letters_with_nonexistent_range).toEqual([65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122])
    })

    test('iterglyphs_list_len', () => {
      expect([...font.iterglyphs()].length).toEqual(font.length)
    })

    test('iterglyphs_cp_first', () => {
      const first_cp_glyph = font.iterglyphs().next().value
      expect(first_cp_glyph).toBeInstanceOf(Glyph)
      expect(first_cp_glyph.meta['glyphname']).toEqual('U+0000')
    })
  })

  describe('get glyph', () => {
    test('glyphbycp_a', () => {
      expect(font.glyphbycp(97).meta).toEqual(glyph_a_meta)
    })

    test('glyph_a', () => {
      expect(font.glyph('a').meta).toEqual(glyph_a_meta)
    })

    test('glyphbycp_nonexistent', () => {
      expect(font.glyphbycp(22909)).toEqual(null)
    })

    test('glyph_nonexistent', () => {
      expect(font.glyph('好')).toEqual(null)
    })

    test('lacksglyphs', () => {
      expect(font.lacksglyphs('Bé H好Δi的')).toEqual(['好', 'Δ'])
    })

    test('lacksglyphs_none', () => {
      expect(font.lacksglyphs('Bé Hi的')).toEqual(null)
    })
  })

  describe('draw', () => {
    test('drawcps', () => {
      expect(font.drawcps([66, 100, 102, 32, 72, 105]).bindata).toEqual([
        '00000000000000000000000000000000000000000000000000000000',
        '00000000000000000000000000000000000000000000000000000000',
        '00000000000000000000000000000000000000000000000000000000',
        '00000000000000100000110000000000000000000000100000000000',
        '01111100000000100001000000000000010000100000100000000000',
        '01000010000000100001000000000000010000100000000000000000',
        '01000010001110100001000000000000010000100001100000000000',
        '01000010010001100111110000000000010000100000100000000000',
        '01111100010000100001000000000000011111100000100000000000',
        '01000010010000100001000000000000010000100000100000000000',
        '01000010010000100001000000000000010000100000100000000000',
        '01000010010000100001000000000000010000100000100000000000',
        '01000010010001100001000000000000010000100000100000000000',
        '01111100001110100001000000000000010000100011111000000000',
        '00000000000000000000000000000000000000000000000000000000',
        '00000000000000000000000000000000000000000000000000000000',
      ])
    })

    test('draw_default', () => {
      expect(font.draw('Bdf Hi').bindata).toEqual([
        '00000000000000000000000000000000000000000000000000000000',
        '00000000000000000000000000000000000000000000000000000000',
        '00000000000000000000000000000000000000000000000000000000',
        '00000000000000100000110000000000000000000000100000000000',
        '01111100000000100001000000000000010000100000100000000000',
        '01000010000000100001000000000000010000100000000000000000',
        '01000010001110100001000000000000010000100001100000000000',
        '01000010010001100111110000000000010000100000100000000000',
        '01111100010000100001000000000000011111100000100000000000',
        '01000010010000100001000000000000010000100000100000000000',
        '01000010010000100001000000000000010000100000100000000000',
        '01000010010000100001000000000000010000100000100000000000',
        '01000010010001100001000000000000010000100000100000000000',
        '01111100001110100001000000000000010000100011111000000000',
        '00000000000000000000000000000000000000000000000000000000',
        '00000000000000000000000000000000000000000000000000000000',
      ])
    })

    test('draw_mode0', () => {
      expect(font.draw('Bdf Hi', { mode: 0 }).bindata).toEqual([
        '000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
        '000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
        '000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
        '000000000000000000000010000000000000110000000000000000000000000000000000000000000000100000000000',
        '011111000000000000000010000000000001000000000000000000000000000001000010000000000000100000000000',
        '010000100000000000000010000000000001000000000000000000000000000001000010000000000000000000000000',
        '010000100000000000111010000000000001000000000000000000000000000001000010000000000001100000000000',
        '010000100000000001000110000000000111110000000000000000000000000001000010000000000000100000000000',
        '011111000000000001000010000000000001000000000000000000000000000001111110000000000000100000000000',
        '010000100000000001000010000000000001000000000000000000000000000001000010000000000000100000000000',
        '010000100000000001000010000000000001000000000000000000000000000001000010000000000000100000000000',
        '010000100000000001000010000000000001000000000000000000000000000001000010000000000000100000000000',
        '010000100000000001000110000000000001000000000000000000000000000001000010000000000000100000000000',
        '011111000000000000111010000000000001000000000000000000000000000001000010000000000011111000000000',
        '000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
        '000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
      ])
    })

    test('draw_rl', () => {
      expect(font.draw('مرحبا', { direction: 'rl' }).bindata).toEqual([
        '000000000000000000000000000000000000000000000000',
        '000000000000000000000000000000000000000000000000',
        '000000000000000000000000000000000000000000000000',
        '000010000000000000000000000000000000000000000000',
        '000010000000000000000000000000000000000000000000',
        '000010000000000000000000000000000000000000000000',
        '000010000000000000000000000000000000000000000000',
        '000010000000010000000000000000000000000000000000',
        '000010000010001001111110000001000001110000000000',
        '000010000100001000010000000000100000011000000000',
        '000010000011110000100000000000100001111000000000',
        '000000000000000001000000000000100010000000000000',
        '000000000000000001000000000001000010000000000000',
        '000000000000100001000000010010000010000000000000',
        '000000000000000000100010001100000010000000000000',
        '000000000000000000011100000000000010000000000000',
      ])
    })

    test('draw_lrbt_linelimit30', () => {
      expect(
        font.draw('Bdf Hi', { linelimit: 30, direction: 'lrbt' }).bindata
      ).toEqual([
        '00000000000000000000000000000000',
        '00000000000000000000000000000000',
        '00000000000000000000000000000000',
        '00000000000000000000100000000000',
        '00000000010000100000100000000000',
        '00000000010000100000000000000000',
        '00000000010000100001100000000000',
        '00000000010000100000100000000000',
        '00000000011111100000100000000000',
        '00000000010000100000100000000000',
        '00000000010000100000100000000000',
        '00000000010000100000100000000000',
        '00000000010000100000100000000000',
        '00000000010000100011111000000000',
        '00000000000000000000000000000000',
        '00000000000000000000000000000000',
        '00000000000000000000000000000000',
        '00000000000000000000000000000000',
        '00000000000000000000000000000000',
        '00000000000000100000110000000000',
        '01111100000000100001000000000000',
        '01000010000000100001000000000000',
        '01000010001110100001000000000000',
        '01000010010001100111110000000000',
        '01111100010000100001000000000000',
        '01000010010000100001000000000000',
        '01000010010000100001000000000000',
        '01000010010000100001000000000000',
        '01000010010001100001000000000000',
        '01111100001110100001000000000000',
        '00000000000000000000000000000000',
        '00000000000000000000000000000000',
      ])
    })

    test('draw_tbrl_linelimit40', () => {
      expect(
        font.draw('Bdf Hi', { linelimit: 40, direction: 'tbrl' }).bindata
      ).toEqual([
        '000000000000000000000000000000000000000000000000',
        '000000000000000000000000000000000000000000000000',
        '000000000000000000000000000000000000000000000000',
        '000000000000000000001100000000000000000000000000',
        '010000100000000000010000000000000111110000000000',
        '010000100000000000010000000000000100001000000000',
        '010000100000000000010000000000000100001000000000',
        '010000100000000001111100000000000100001000000000',
        '011111100000000000010000000000000111110000000000',
        '010000100000000000010000000000000100001000000000',
        '010000100000000000010000000000000100001000000000',
        '010000100000000000010000000000000100001000000000',
        '010000100000000000010000000000000100001000000000',
        '010000100000000000010000000000000111110000000000',
        '000000000000000000000000000000000000000000000000',
        '000000000000000000000000000000000000000000000000',
        '000000000000000000000000000000000000000000000000',
        '000000000000000000000000000000000000000000000000',
        '000000000000000000000000000000000000000000000000',
        '000010000000000000000000000000000000001000000000',
        '000010000000000000000000000000000000001000000000',
        '000000000000000000000000000000000000001000000000',
        '000110000000000000000000000000000011101000000000',
        '000010000000000000000000000000000100011000000000',
        '000010000000000000000000000000000100001000000000',
        '000010000000000000000000000000000100001000000000',
        '000010000000000000000000000000000100001000000000',
        '000010000000000000000000000000000100001000000000',
        '000010000000000000000000000000000100011000000000',
        '001111100000000000000000000000000011101000000000',
        '000000000000000000000000000000000000000000000000',
        '000000000000000000000000000000000000000000000000',
      ])
    })

    test('draw_rl_without_ucgs', () => {
      expect(font.draw('a的', { direction: 'rl' }).bindata).toEqual([
        '000100000100000000000000',
        '000100000100000000000000',
        '001000000100000000000000',
        '011111100111110000000000',
        '010000101000010000000000',
        '010000101000010000000000',
        '010000110011110000000000',
        '010000100100011000000000',
        '011111100010011000000000',
        '010000100011111000000000',
        '010000100100011000000000',
        '010000100100011000000000',
        '010000100100011000000000',
        '011111100011111000000000',
        '010000100010100000000000',
        '000000000001000000000000',
      ])
    })

    test('draw_rl_with_ucgs', () => {
      expect(
        font.draw('a的', { direction: 'rl', usecurrentglyphspacing: true })
          .bindata
      ).toEqual([
        '00010000010000000000000000000000',
        '00010000010000000000000000000000',
        '00100000010000000000000000000000',
        '01111110011111000000000000000000',
        '01000010100001000000000000000000',
        '01000010100001000000000000000000',
        '01000011000001000011110000000000',
        '01000010010001000100001000000000',
        '01111110001001000000001000000000',
        '01000010001001000011111000000000',
        '01000010000001000100001000000000',
        '01000010000001000100001000000000',
        '01000010000001000100011000000000',
        '01111110000001000011101000000000',
        '01000010001010000000000000000000',
        '00000000000100000000000000000000',
      ])
    })

    test('draw_btlr_linelimit40', () => {
      expect(
        font.draw('Bdf的 Hi', { linelimit: 40, direction: 'btlr' }).bindata
      ).toEqual([
        '0000000000000000000100000100000000000000000000000000000000000000',
        '0000000000000000000100000100000000000000000000000000000000000000',
        '0000000000000000001000000100000000000000000000000000000000000000',
        '0000001000000000011111100111110000000000000000000000000000000000',
        '0000001000000000010000101000010001000010000000000000000000000000',
        '0000001000000000010000101000010001000010000000000000000000000000',
        '0011101000000000010000110000010001000010000000000000000000000000',
        '0100011000000000010000100100010001000010000000000000000000000000',
        '0100001000000000011111100010010001111110000000000000000000000000',
        '0100001000000000010000100010010001000010000000000000000000000000',
        '0100001000000000010000100000010001000010000000000000000000000000',
        '0100001000000000010000100000010001000010000000000000000000000000',
        '0100011000000000010000100000010001000010000000000000000000000000',
        '0011101000000000011111100000010001000010000000000000000000000000',
        '0000000000000000010000100010100000000000000000000000000000000000',
        '0000000000000000000000000001000000000000000000000000000000000000',
        '0000000000000000000000000000000000000000000000000000000000000000',
        '0000000000000000000000000000000000000000000000000000000000000000',
        '0000000000000000000000000000000000000000000000000000000000000000',
        '0000000000000000000011000000000000000000000000000000100000000000',
        '0111110000000000000100000000000000000000000000000000100000000000',
        '0100001000000000000100000000000000000000000000000000000000000000',
        '0100001000000000000100000000000000000000000000000001100000000000',
        '0100001000000000011111000000000000000000000000000000100000000000',
        '0111110000000000000100000000000000000000000000000000100000000000',
        '0100001000000000000100000000000000000000000000000000100000000000',
        '0100001000000000000100000000000000000000000000000000100000000000',
        '0100001000000000000100000000000000000000000000000000100000000000',
        '0100001000000000000100000000000000000000000000000000100000000000',
        '0111110000000000000100000000000000000000000000000011111000000000',
        '0000000000000000000000000000000000000000000000000000000000000000',
        '0000000000000000000000000000000000000000000000000000000000000000',
      ])
    })

    test('draw_nonexistent_default', () => {
      expect(font.draw('Bé H好Δi的').bindata).toEqual([
        '00000000000000000000000000000000000000000001000001000000',
        '00000000000000000000000000000000000000000001000001000000',
        '00000000000011000000000000000000000000000010000001000000',
        '00000000001100000000000000000000000010000111111001111100',
        '01111100000000000000000001000010000010000100001010000100',
        '01000010000000000000000001000010000000000100001010000100',
        '01000010001111000000000001000010000110000100001100000100',
        '01000010010000100000000001000010000010000100001001000100',
        '01111100010000100000000001111110000010000111111000100100',
        '01000010011111100000000001000010000010000100001000100100',
        '01000010010000000000000001000010000010000100001000000100',
        '01000010010000000000000001000010000010000100001000000100',
        '01000010010000100000000001000010000010000100001000000100',
        '01111100001111000000000001000010001111100111111000000100',
        '00000000000000000000000000000000000000000100001000101000',
        '00000000000000000000000000000000000000000000000000010000',
      ])
    })

    test('draw_nonexistent_mode0_linelimit80', () => {
      expect(
        font.draw('Bé H好Δi的', { linelimit: 80, mode: 0 }).bindata
      ).toEqual([
        '00000000000000000000000000000000000000000000000000000000000000000000000000000000',
        '00000000000000000000000000000000000000000000000000000000000000000000000000000000',
        '00000000000000000000110000000000000000000000000000000000000000000000000000000000',
        '00000000000000000011000000000000000000000000000000000000000000000000000000000000',
        '01111100000000000000000000000000000000000000000001000010000000000000000000000000',
        '01000010000000000000000000000000000000000000000001000010000000000000000000000000',
        '01000010000000000011110000000000000000000000000001000010000000000000000000000000',
        '01000010000000000100001000000000000000000000000001000010000000000000000000000000',
        '01111100000000000100001000000000000000000000000001111110000000000000000000000000',
        '01000010000000000111111000000000000000000000000001000010000000000000000000000000',
        '01000010000000000100000000000000000000000000000001000010000000000000000000000000',
        '01000010000000000100000000000000000000000000000001000010000000000000000000000000',
        '01000010000000000100001000000000000000000000000001000010000000000000000000000000',
        '01111100000000000011110000000000000000000000000001000010000000000000000000000000',
        '00000000000000000000000000000000000000000000000000000000000000000000000000000000',
        '00000000000000000000000000000000000000000000000000000000000000000000000000000000',
        '00000000000000000000000000000000000100000100000000000000000000000000000000000000',
        '00000000000000000000000000000000000100000100000000000000000000000000000000000000',
        '00000000000000000000000000000000001000000100000000000000000000000000000000000000',
        '00000000000000000000100000000000011111100111110000000000000000000000000000000000',
        '00000000000000000000100000000000010000101000010000000000000000000000000000000000',
        '00000000000000000000000000000000010000101000010000000000000000000000000000000000',
        '00000000000000000001100000000000010000110000010000000000000000000000000000000000',
        '00000000000000000000100000000000010000100100010000000000000000000000000000000000',
        '00000000000000000000100000000000011111100010010000000000000000000000000000000000',
        '00000000000000000000100000000000010000100010010000000000000000000000000000000000',
        '00000000000000000000100000000000010000100000010000000000000000000000000000000000',
        '00000000000000000000100000000000010000100000010000000000000000000000000000000000',
        '00000000000000000000100000000000010000100000010000000000000000000000000000000000',
        '00000000000000000011111000000000011111100000010000000000000000000000000000000000',
        '00000000000000000000000000000000010000100010100000000000000000000000000000000000',
        '00000000000000000000000000000000000000000001000000000000000000000000000000000000',
      ])
    })

    test('draw_nonexistent_tb_linelimit40', () => {
      expect(
        font.draw('Bé H好Δi的', { linelimit: 40, direction: 'tb' }).bindata
      ).toEqual([
        '000000000000000000000000000000000000000000000000',
        '000000000000000000000000000000000000000000000000',
        '000000000000000000000000000000000000000000000000',
        '000010000000000000000000000000000000000000000000',
        '000010000000000000000000000000000111110000000000',
        '000000000000000000000000000000000100001000000000',
        '000110000000000000000000000000000100001000000000',
        '000010000000000000000000000000000100001000000000',
        '000010000000000000000000000000000111110000000000',
        '000010000000000000000000000000000100001000000000',
        '000010000000000000000000000000000100001000000000',
        '000010000000000000000000000000000100001000000000',
        '000010000000000000000000000000000100001000000000',
        '001111100000000000000000000000000111110000000000',
        '000000000000000000000000000000000000000000000000',
        '000000000000000000000000000000000000000000000000',
        '000100000100000000000000000000000000000000000000',
        '000100000100000000000000000000000000000000000000',
        '001000000100000000000000000000000000110000000000',
        '011111100111110000000000000000000011000000000000',
        '010000101000010001000010000000000000000000000000',
        '010000101000010001000010000000000000000000000000',
        '010000110000010001000010000000000011110000000000',
        '010000100100010001000010000000000100001000000000',
        '011111100010010001111110000000000100001000000000',
        '010000100010010001000010000000000111111000000000',
        '010000100000010001000010000000000100000000000000',
        '010000100000010001000010000000000100000000000000',
        '010000100000010001000010000000000100001000000000',
        '011111100000010001000010000000000011110000000000',
        '010000100010100000000000000000000000000000000000',
        '000000000001000000000000000000000000000000000000',
        '000000000000000000000000000000000000000000000000',
        '000000000000000000000000000000000000000000000000',
        '000000000000000000000000000000000000000000000000',
        '000000000000000000000000000000000000000000000000',
        '000000000000000000000000000000000000000000000000',
        '000000000000000000000000000000000000000000000000',
        '000000000000000000000000000000000000000000000000',
        '000000000000000000000000000000000000000000000000',
        '000000000000000000000000000000000000000000000000',
        '000000000000000000000000000000000000000000000000',
        '000000000000000000000000000000000000000000000000',
        '000000000000000000000000000000000000000000000000',
        '000000000000000000000000000000000000000000000000',
        '000000000000000000000000000000000000000000000000',
        '000000000000000000000000000000000000000000000000',
        '000000000000000000000000000000000000000000000000',
      ])
    })

    test('draw_nonexistent_default_withmissingglyphobj', () => {
      expect(
        font.draw('Bé H好Δi的', {
          missing: new Glyph(missing_glyph_meta, font),
        }).bindata
      ).toEqual([
        '0000000000000000000000000000000000000000000000000000000000000000000000000001000001000000',
        '0000000000000000000000000000000000000000000000000000000000000000000000000001000001000000',
        '0000000000001100000000000000000000000000000000000000000000000000000000000010000001000000',
        '0000000000110000000000000000000000111111111110000011111111111000000010000111111001111100',
        '0111110000000000000000000100001000110000000110000011000000011000000010000100001010000100',
        '0100001000000000000000000100001000101000001010000010100000101000000000000100001010000100',
        '0100001000111100000000000100001000100100010010000010010001001000000110000100001100000100',
        '0100001001000010000000000100001000100010100010000010001010001000000010000100001001000100',
        '0111110001000010000000000111111000100001000010000010000100001000000010000111111000100100',
        '0100001001111110000000000100001000100010100010000010001010001000000010000100001000100100',
        '0100001001000000000000000100001000100100010010000010010001001000000010000100001000000100',
        '0100001001000000000000000100001000101000001010000010100000101000000010000100001000000100',
        '0100001001000010000000000100001000110000000110000011000000011000000010000100001000000100',
        '0111110000111100000000000100001000111111111110000011111111111000001111100111111000000100',
        '0000000000000000000000000000000000000000000000000000000000000000000000000100001000101000',
        '0000000000000000000000000000000000000000000000000000000000000000000000000000000000010000',
      ])
    })

    test('draw_nonexistent_default_withmissingglyphmeta', () => {
      expect(
        font.draw('Bé H好Δi的', { missing: missing_glyph_meta }).bindata
      ).toEqual([
        '0000000000000000000000000000000000000000000000000000000000000000000000000001000001000000',
        '0000000000000000000000000000000000000000000000000000000000000000000000000001000001000000',
        '0000000000001100000000000000000000000000000000000000000000000000000000000010000001000000',
        '0000000000110000000000000000000000111111111110000011111111111000000010000111111001111100',
        '0111110000000000000000000100001000110000000110000011000000011000000010000100001010000100',
        '0100001000000000000000000100001000101000001010000010100000101000000000000100001010000100',
        '0100001000111100000000000100001000100100010010000010010001001000000110000100001100000100',
        '0100001001000010000000000100001000100010100010000010001010001000000010000100001001000100',
        '0111110001000010000000000111111000100001000010000010000100001000000010000111111000100100',
        '0100001001111110000000000100001000100010100010000010001010001000000010000100001000100100',
        '0100001001000000000000000100001000100100010010000010010001001000000010000100001000000100',
        '0100001001000000000000000100001000101000001010000010100000101000000010000100001000000100',
        '0100001001000010000000000100001000110000000110000011000000011000000010000100001000000100',
        '0111110000111100000000000100001000111111111110000011111111111000001111100111111000000100',
        '0000000000000000000000000000000000000000000000000000000000000000000000000100001000101000',
        '0000000000000000000000000000000000000000000000000000000000000000000000000000000000010000',
      ])
    })

    test('drawall', () => {
      const drawall_bitmap_bindata = font.drawall({ linelimit: 700 }).bindata
      expect(drawall_bitmap_bindata[0].length).toEqual(688)
      expect(drawall_bitmap_bindata.length).toEqual(320)
    })
  })
})
