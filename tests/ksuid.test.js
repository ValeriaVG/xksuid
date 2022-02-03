import { Test, expect } from 'tiny-jest'
import { fromEpoch, toEpoch, base62, debase62, generate, parse } from '../src/index.node.mjs'

const epoch = new Test('toEpoch / fromEpoch')
epoch.it('converts ASC toEpoch & fromEpoch', () => {
    const ts = Date.now()
    const ats = toEpoch(ts)
    expect(ts - fromEpoch(ats)).toBeLessThan(1_000)
})
epoch.it('DESC toEpoch & fromEpoch', () => {
    const ts = Date.now()
    const dts = toEpoch(ts, true)
    expect(ts - fromEpoch(dts)).toBeLessThan(1_000)
})

const base = new Test('Base62')
base.it('converts zero base62', () => {
    const zeros = new DataView(new ArrayBuffer(20))
    expect(base62(zeros)).toBe('000000000000000000000000000')
})
base.it('converts to and from base62', () => {
    const view = new DataView(new Uint8Array([14, 137, 246, 83, 82, 29, 65, 15, 51, 143, 62, 100, 98, 197, 78, 32, 36, 57, 253, 183]).buffer)
    const ksuid = '24cGZKULER6NTNOmpJpJ5LUDsYB'
    expect(base62(view)).toBe(ksuid)
    const result = debase62(ksuid)
    for (let i = 0; i < 20; i++) {
        expect(result[i]).toBe(view.getUint8(i))
    }
})

const gen = new Test('Generate/Decode')

gen.it('KSUID', () => {
    // ASC
    const ts = Date.now()
    const ksuid = generate(false)
    expect(typeof ksuid).toBe('string')
    expect(ksuid.length).toBe(27)
    const result = parse(ksuid)
    expect(ts - result.ts.getTime()).toBeLessThan(1_000)
})

gen.it('xKSUID', () => {
    // DESC
    const ts = Date.now()
    const ksuid = generate(true)
    expect(typeof ksuid).toBe('string')
    expect(ksuid.length).toBe(28)
    expect(ksuid[0]).toBe('z')
    const result = parse(ksuid)
    expect(ts - result.ts.getTime()).toBeLessThan(1_000)
})

export default [epoch, base, gen]