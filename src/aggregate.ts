import {
  getCommonPrefixLength,
  getNetworkAddress,
  intToIp,
  ipV4
} from "@pfeiferio/ipv4";

import type {IPv4AddressList} from "./domain/ipv4.js";

export type AggregateOptions = {
  groupPrefix: number
}

type NetworkRange = {
  minAddress: number
  maxAddress: number
}

/**
 * Aggregate IPv4 addresses into minimal CIDR blocks.
 *
 * IP addresses are first grouped by a fixed prefix (`groupPrefix`).
 * Within each group, the smallest possible CIDR block covering all
 * addresses in that group is calculated.
 *
 * @param ipAddresses
 *   List of IPv4 addresses in dotted-decimal notation or as 32-bit integers.
 * @param options
 * @param options.groupPrefix
 *   CIDR prefix length used to group IP addresses before aggregation (0–32).
 * @returns
 *   Array of aggregated CIDR blocks in the form "x.x.x.x/prefix".
 * @throws {TypeError}
 *   If `ipAddresses` is not an array or `groupPrefix` is not a number.
 */
export const aggregateIps = (
  ipAddresses: IPv4AddressList,
  {groupPrefix}: AggregateOptions
): string[] => {

  if (!Array.isArray(ipAddresses)) {
    throw new TypeError('ipAddresses must be an array')
  }
  if (typeof groupPrefix !== 'number') {
    throw new TypeError('groupPrefix must be a number')
  }

  const networkRanges: Record<string, NetworkRange> = {}
  const result: string[] = []

  for (const ip of ipAddresses) {
    const ipInt = ipV4(ip).toInteger()
    const networkKey = getNetworkAddress(ipInt, groupPrefix).toString()
    const networkRange = networkRanges[networkKey]

    if (!networkRange) {
      networkRanges[networkKey] = {
        minAddress: ipInt,
        maxAddress: ipInt
      }
    } else {
      if (ipInt < networkRange.minAddress) {
        networkRange.minAddress = ipInt
      }
      if (ipInt > networkRange.maxAddress) {
        networkRange.maxAddress = ipInt
      }
    }
  }

  for (const {minAddress, maxAddress} of Object.values(networkRanges)) {
    const cidrPrefix = getCommonPrefixLength(minAddress, maxAddress)
    const networkAddress = getNetworkAddress(minAddress, cidrPrefix)
    result.push(`${intToIp(networkAddress)}/${cidrPrefix}`)
  }

  return result
}
