import { prettify } from 'tiny-jest'
import ksuid from './ksuid.test.js'
import sequence from './sequence.test.js'

let passed = true
for (const test of [...ksuid, ...sequence]) {
    console.log(test.title)
    const results = await test.run()
    prettify(results)
    passed &= results.every(test => test.passed === true)
}
if (!passed) {
    console.error("Test run failed")
    process.exit(1)
}

