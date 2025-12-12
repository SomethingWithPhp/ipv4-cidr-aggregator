export interface AggregateIpsOptions {
  /**
   * CIDR prefix length used to group IPv4 addresses before aggregation.
   * Valid range: 0–32
   */
  groupPrefix: number
}

/**
 * Aggregate IPv4 addresses into minimal CIDR blocks.
 *
 * @param ipAddresses
 *   IPv4 addresses as dotted-decimal strings ("192.168.0.1")
 *   or unsigned 32-bit integers.
 *
 * @param options
 *   Aggregation options.
 *
 * @returns
 *   An array of CIDR blocks in the form "x.x.x.x/prefix".
 */
export function aggregateIps(
  ipAddresses: Array<string | number>,
  options: AggregateIpsOptions
): string[]

/**
 * Convert an IPv4 address from dotted-decimal notation to a 32-bit integer.
 *
 * @param {string} ip IPv4 address (e.g. "192.168.0.1")
 * @returns {number} Unsigned 32-bit integer representation
 */
export function ipToInt(ip: string): number

/**
 * Convert a 32-bit integer to an IPv4 address in dotted-decimal notation.
 *
 * @param {number} value Unsigned 32-bit integer
 * @returns {string} IPv4 address (e.g. "192.168.0.1")
 */
export function intToIp(value: number): string

/**
 * Calculate the network address for an IPv4 address and CIDR prefix.
 *
 * @param {string|number} ip - IPv4 address or its 32-bit integer representation
 * @param {number} prefix - CIDR prefix length (0–32)
 * @returns {number} Network address as unsigned 32-bit integer
 */
export function getNetworkAddress(ip: string | number, prefix: number): number

/**
 * Determine the longest common CIDR prefix length shared by two IPv4 addresses.
 *
 * @param {number} a - First IPv4 address as 32-bit integer
 * @param {number} b - Second IPv4 address as 32-bit integer
 * @returns {number} Common prefix length (0–32)
 */
export function getCommonPrefixLength(a: number, b: number): number
