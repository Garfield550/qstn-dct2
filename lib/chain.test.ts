import { describe, expect, test } from 'vitest'

import { parseNear, truncateEthAddress } from './chain'

describe('Test truncateEthAddress function', () => {
  test('truncateEthAddress should return empty string if address is undefined', () => {
    expect(truncateEthAddress()).toBe('')
  })

  test('truncateEthAddress should return empty string if address is empty string', () => {
    expect(truncateEthAddress('')).toBe('')
  })

  test('truncateEthAddress should return empty string if address is not a valid eth address', () => {
    expect(truncateEthAddress('not a valid eth address')).toBe('')
  })

  test('truncateEthAddress should return truncated address if address is a valid eth address', () => {
    expect(
      truncateEthAddress('0x1875fcC416a92e04Ee23d2077203B02f3a51D0C0')
    ).toBe('0x1875••••D0C0')
  })

  test('truncateEthAddress should return truncated address with custom separator', () => {
    expect(
      truncateEthAddress('0x1875fcC416a92e04Ee23d2077203B02f3a51D0C0', '...')
    ).toBe('0x1875...D0C0')
  })
})

describe('Test parseNear function', () => {
  test('parse zero near should be 0.0', () => {
    const zeroNear = BigInt(0)
    expect(parseNear(zeroNear)).toBe('0.0')
  })

  test('parse one near should be 1.0', () => {
    const oneNear = BigInt('1000000000000000000000000')
    expect(parseNear(oneNear)).toBe('1.0')
  })

  test('parse 424242424242424242424242424242n should be 42.424242424242424242424242', () => {
    const near = BigInt('42424242424242424242424242')
    expect(parseNear(near)).toBe('42.424242424242424242424242')
  })
})
