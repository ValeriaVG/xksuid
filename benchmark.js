import os from 'os'
import { generate } from './src/index.node.mjs'

const cpus = os.cpus()
console.info(cpus.length, 'x', cpus[0].model)
console.log()
// Benchmark
const start = performance.now()
const n = 100_000
console.log("Running", n, "ops")
console.log()
for (let i = 0; i < n; i++) {
    generate()
}
const diff = performance.now() - start
console.info(diff, 'ms', diff * 1000 / n, 'ns/op', n / (diff / 1000), 'ops/sec')
console.log()