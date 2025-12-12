import test from 'node:test'
import assert from 'node:assert/strict'

import {aggregateIps} from '../src/index.js'

test('aggregates IPs within the same groupPrefix', () => {
  const result = aggregateIps(
    [
      '1.2.3.4',
      '1.2.3.2',
      '1.2.3.8',
      '1.2.3.230'
    ],
    {groupPrefix: 16}
  )

  assert.deepEqual(result, ['1.2.3.0/24'])
})

test('keeps unrelated IPs separate', () => {
  const result = aggregateIps(
    [
      '1.2.3.4',
      '5.6.7.8'
    ],
    {groupPrefix: 16}
  )

  assert.deepEqual(
    result.sort(),
    ['1.2.3.4/32', '5.6.7.8/32'].sort()
  )
})

test('aggregates across /24 boundaries when allowed', () => {
  const result = aggregateIps(
    [
      '10.0.0.0',
      '10.0.0.1',
      '10.0.1.1'
    ],
    {groupPrefix: 16}
  )

  assert.deepEqual(result, ['10.0.0.0/23'])
})

test('works with numeric IPv4 input', () => {
  const result = aggregateIps(
    [
      0x0A000000, // 10.0.0.0
      0x0A000001  // 10.0.0.1
    ],
    {groupPrefix: 24}
  )

  assert.deepEqual(result, ['10.0.0.0/31'])
})

test('allows very large networks', () => {
  const result = aggregateIps(
    [
      '1.2.3.4',
      '5.6.7.8',
      '10.0.0.1'
    ],
    {groupPrefix: 4}
  )

  assert.ok(result.includes('0.0.0.0/4'))
})

test('throws on invalid arguments', () => {
  assert.throws(
    () => aggregateIps('not-an-array', {groupPrefix: 16}),
    TypeError
  )

  assert.throws(
    () => aggregateIps([], {groupPrefix: '16'}),
    TypeError
  )
})
