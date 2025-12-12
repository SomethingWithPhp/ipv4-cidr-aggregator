import test from 'node:test'
import assert from 'node:assert/strict'

import {getCommonPrefixLength, ipToInt} from '../src/utils.js'

test('returns 32 for identical IP addresses', () => {
  const ip = ipToInt('192.168.0.1')

  const result = getCommonPrefixLength(ip, ip)

  assert.equal(result, 32)
})

test('returns correct prefix for IPs in same /24 network', () => {
  const a = ipToInt('192.168.1.10')
  const b = ipToInt('192.168.1.200')

  const result = getCommonPrefixLength(a, b)

  assert.equal(result, 24)
})

test('returns correct prefix across /24 boundary', () => {
  const a = ipToInt('10.0.0.0')
  const b = ipToInt('10.0.1.1')

  const result = getCommonPrefixLength(a, b)

  assert.equal(result, 23)
})

test('returns correct prefix for distant addresses', () => {
  const a = ipToInt('1.2.3.4')
  const b = ipToInt('5.6.7.8')

  const result = getCommonPrefixLength(a, b)

  assert.equal(result, 5)
})

test('returns 0 when no common prefix exists', () => {
  const a = ipToInt('0.0.0.0')
  const b = ipToInt('255.255.255.255')

  const result = getCommonPrefixLength(a, b)

  assert.equal(result, 0)
})
test('uses bitwise logic for prefix calculation', () => {
  const a = 0b10101010_00000000_00000000_00000000 >>> 0
  const b = 0b10101011_00000000_00000000_00000000 >>> 0

  const result = getCommonPrefixLength(a, b)

  assert.equal(result, 7)
})
