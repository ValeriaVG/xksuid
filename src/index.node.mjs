import { webcrypto } from 'crypto'

if (!global.crypto) {
  Object.defineProperty(global, 'crypto', {
    get() {
      return webcrypto
    },
    enumerable: true,
    configurable: true,
  })
}

export * from './index.js'
