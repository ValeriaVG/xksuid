import { Test, expect } from 'tiny-jest'
import { generate } from '../src/index.node.mjs'

const now = Date.now()
const s = new Set()
const N = 10_000
const asc = new Test(`Generating ${N * 2} ascending numbers`)
asc.it('does not repeat & in acsending order', () => {
    for (let i = 0; i < N; i++) {
        const a = generate(false, now + i * 1_000)
        expect(s.has(a)).toBe(false)
        const b = generate(false, now + (i + 1) * 1_000)
        expect(s.has(b)).toBe(false)
        s.add(a)
        s.add(b)
        expect(b).toBeGreaterThan(a)
    }
})

const desc = new Test(`Generating ${N * 2} descending numbers`)
desc.it('does not repeat & in descending order', () => {
    for (let i = 0; i < N; i++) {
        const a = generate(true, now + i * 1_000)
        expect(s.has(a)).toBe(false)
        const b = generate(true, now + (i + 1) * 1_000)
        expect(s.has(b)).toBe(false)
        s.add(a)
        s.add(b)
        expect(a).toBeGreaterThan(b)
    }
})

export default [asc, desc]