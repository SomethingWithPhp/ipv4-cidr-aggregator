import type {IPv4Address} from "./domain/ipv4.js";

/**
 * Convert an IPv4 address from dotted-decimal notation to a 32-bit integer.
 *
 * @param ip - IPv4 address (e.g. "192.168.0.1")
 * @returns Unsigned 32-bit integer representation
 */
export const ipToInt = (ip: string): number =>
  ip.split('.').reduce((a, o) => (a << 8) + Number(o), 0) >>> 0

/**
 * Convert a 32-bit integer to an IPv4 address in dotted-decimal notation.
 *
 * @param int - Unsigned 32-bit integer
 * @returns IPv4 address (e.g. "192.168.0.1")
 */
export const intToIp = (int: number): string =>
  [24, 16, 8, 0].map(s => (int >> s) & 255).join('.')

/**
 * Calculate the network address for an IPv4 address and CIDR prefix.
 *
 * @param ip - IPv4 address or its 32-bit integer representation
 * @param prefix - CIDR prefix length (0–32)
 * @returns Network address as unsigned 32-bit integer
 */
export const getNetworkAddress = (
  ip: IPv4Address,
  prefix: number
): number => {
  const int = typeof ip === 'number' ? ip : ipToInt(ip)
  const mask = (~0 << (32 - prefix)) >>> 0
  return int & mask
}

/**
 * Determine the longest common CIDR prefix length shared by two IPv4 addresses.
 *
 * @param a - First IPv4 address as 32-bit integer
 * @param b - Second IPv4 address as 32-bit integer
 * @returns Common prefix length (0–32)
 */
export const getCommonPrefixLength = (a: number, b: number): number =>
  Math.clz32((a ^ b) >>> 0)
