/**
 * Convert an IPv4 address from dotted-decimal notation to a 32-bit integer.
 *
 * @param {string} ip - IPv4 address (e.g. "192.168.0.1")
 * @returns {number} Unsigned 32-bit integer representation
 */
export const ipToInt = ip =>
  ip.split('.').reduce((a, o) => (a << 8) + Number(o), 0) >>> 0

/**
 * Convert a 32-bit integer to an IPv4 address in dotted-decimal notation.
 *
 * @param {number} int - Unsigned 32-bit integer
 * @returns {string} IPv4 address (e.g. "192.168.0.1")
 */
export const intToIp = int =>
  [24, 16, 8, 0].map(s => (int >> s) & 255).join('.')


/**
 * Calculate the network address for an IPv4 address and CIDR prefix.
 *
 * @param {string|number} ip - IPv4 address or its 32-bit integer representation
 * @param {number} prefix - CIDR prefix length (0–32)
 * @returns {number} Network address as unsigned 32-bit integer
 */
export const getNetworkAddress = (ip, prefix) => {
  const int = typeof ip === 'number' ? ip : ipToInt(ip)
  const mask = (~0 << (32 - prefix)) >>> 0
  return int & mask
}

/**
 * Determine the longest common CIDR prefix length shared by two IPv4 addresses.
 *
 * @param {number} a - First IPv4 address as 32-bit integer
 * @param {number} b - Second IPv4 address as 32-bit integer
 * @returns {number} Common prefix length (0–32)
 */
export const getCommonPrefixLength = (a, b) => {
  let prefix = 32
  while (prefix > 0) {
    const mask = (~0 << (32 - prefix)) >>> 0
    if ((a & mask) === (b & mask)) {
      return prefix
    }
    prefix--
  }
  return 0
}

