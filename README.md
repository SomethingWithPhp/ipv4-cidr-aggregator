# ipv4-cidr-aggregator

Aggregate IPv4 addresses into minimal CIDR blocks using efficient range-based grouping.

## Features

- IPv4-only (no ambiguity)
- Deterministic aggregation
- Efficient range-based algorithm (O(n))
- No external dependencies
- ES Module compatible
- Suitable for large input sets

---

## Installation

```bash
npm install ipv4-cidr-aggregator
````

---

## Usage

```js
import {aggregateIps} from 'ipv4-cidr-aggregator'

const result = aggregateIps(
  [
    '1.2.3.4',
    '1.2.3.2',
    '1.2.3.8',
    '1.2.3.230',
    '5.6.7.8',
    '10.0.0.0',
    '10.0.0.1',
    '10.0.1.1'
  ],
  {groupPrefix: 16}
)

console.log(result)
// [
//   '1.2.3.0/24',
//   '5.6.7.8/32',
//   '10.0.0.0/16'
// ]
```

---

## API

### `aggregateIps(ipAddresses, options)`

Aggregate IPv4 addresses into CIDR blocks.

#### Parameters

* `ipAddresses`
  `Array<string | number>`
  IPv4 addresses as dotted-decimal strings (`"192.168.0.1"`) or 32-bit integers.

* `options.groupPrefix`
  `number`
  CIDR prefix length used to group addresses before aggregation (`0–32`).

#### Returns

* `string[]`
  An array of CIDR blocks in the form `"x.x.x.x/prefix"`.

#### Throws

* `TypeError` if `ipAddresses` is not an array
* `TypeError` if `groupPrefix` is not a number

---

## How it works (short)

1. IPs are grouped by a fixed CIDR prefix (`groupPrefix`)
2. For each group, only the minimum and maximum IP are tracked
3. The smallest possible CIDR block covering the full range is calculated

This avoids pairwise merging and unnecessary sorting.

---

## Notes

* This library **does not validate** IPv4 input format
* Aggregation may include addresses not present in the input (normal CIDR behavior)
* `/0` networks are allowed if produced by the algorithm

---

## License

MIT
