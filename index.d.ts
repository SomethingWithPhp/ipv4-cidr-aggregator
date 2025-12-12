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

