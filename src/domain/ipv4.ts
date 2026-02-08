import type {IPv4Input} from "@pfeiferio/ipv4";

/**
 * Supported IPv4 input formats.
 *
 * - string: dotted-decimal notation ("192.168.0.1")
 * - number: unsigned 32-bit integer
 */
export type IPv4Address = IPv4Input


/**
 * List of IPv4 addresses accepted by the aggregator.
 */
export type IPv4AddressList = IPv4Address[]
