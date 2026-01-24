import test from 'node:test'
import assert from 'node:assert/strict'

import {aggregateIps} from '../dist/index.js'

test('accepts mixed IPv4AddressList (string + number)', () => {
  const result = aggregateIps(
    [
      '192.168.1.1',
      0xC0A80102, // 192.168.1.2
      '192.168.1.3'
    ],
    {groupPrefix: 24}
  )

  assert.deepEqual(result, ['192.168.1.0/30'])
})

test('accepts IPv4AddressList with only numeric addresses', () => {
  const result = aggregateIps(
    [
      0x0A000000, // 10.0.0.0
      0x0A000001, // 10.0.0.1
      0x0A000002  // 10.0.0.2
    ],
    {groupPrefix: 24}
  )

  assert.deepEqual(result, ['10.0.0.0/30'])
})

test('returns empty array for empty IPv4AddressList', () => {
  const result = aggregateIps([], {groupPrefix: 24})
  assert.deepEqual(result, [])
})
