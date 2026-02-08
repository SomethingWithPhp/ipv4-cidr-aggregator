# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [1.3.0] - 2026-02-08

### Changed

* **Breaking**: Refactored core logic to use `@pfeiferio/ipv4` as a dependency.
* Internal utility functions in `src/utils.ts` are now re-exported from the core library.
* Improved IP normalization: Input strings with leading zeros or CIDR suffixes are now handled more robustly via the new core parser.
* Updated development workflow: Switched to native `node --test` coverage and added `.nvmrc` for Node 18.

### Added

* Exported `ipV4` factory and `IPv4Address` types from the main entry point.
* Added `test:coverage` script for native V8 coverage reports.

## [1.2.0] - 2026-01-24

### Changed
- Migrated codebase from JavaScript to TypeScript without functional changes
- Introduced explicit public types for IPv4 input (`IPv4Address`, `IPv4AddressList`)
- Switched package to strict ESM-only exports

### Fixed
- None

### Added
- None

## [1.1.1] - 2025-12-12

### Changed
- Optimized `getCommonPrefixLength` using bitwise XOR and `Math.clz32`

## [1.1.0] - 2025-12-12

### Added
- Stateful `Ipv4CidrAggregator` class for incremental IP aggregation
- Subpath export `ipv4-cidr-aggregator/utils` exposing low-level IPv4 helpers
- Advanced TypeScript typings for utility functions

### Changed
- None

### Fixed
- None

## [1.0.0] - 2025-12-12

### Added
- Initial release of `ipv4-cidr-aggregator`
- Range-based IPv4 CIDR aggregation
- Support for string and numeric IPv4 input
- TypeScript typings
- Test suite using `node:test`
