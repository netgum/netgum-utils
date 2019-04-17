# NetGum utilities

[![NPM version][npm-image]][npm-url]
[![CircleCI](https://circleci.com/gh/netgum/utils.svg?style=svg)](https://circleci.com/gh/netgum/utils)
 
## Installation

```bash
  $ npm i @netgum/utils -S
```

## API

### ABI

* `abiEncodePacked(...types: string[]): (...args: any[]) => Buffer`

### Address

* `toChecksumAddress(address: string): string`
* `bufferToAddress(buff: Buffer): string`
* `computeCreate2Address(deployer: string, salt: string | number | Buffer, byteCodeHash: Buffer | string): string`
* `verifyAddress(address: string, checksum: boolean = true): boolean`
* `targetToAddress(target: any): string`
* `convertAddress(address: string): string`
* `publicKeyToAddress(publicKey: Buffer): string`
* `privateKeyToAddress(privateKey: Buffer): string`

### BN

* `anyToBN(data: any = 0, options: IAnyToBNOptions = {}): BN`

### Buffer

* `anyToBuffer(data: any = Buffer.alloc(0), options: IAnyToBufferOptions = {}): Buffer`

### Crypto

* `sha3(...args: any[]): Buffer`

### ECDSA

* `verifyPublicKey(publicKey: Buffer): boolean`
* `verifyPrivateKey(privateKey: Buffer): boolean`
* `privateToPublicKey(privateKey: Buffer): Buffer`
* `generateRandomPrivateKey(): Buffer`

### ENS

* `normalizeEnsName(...parts: string[]): string`
* `getEnsNameInfo(...parts: string[]): IEnsNameInfo`
* `getEnsNameHash(name: string): string`
* `getEnsLabelHash(label: string): string`

### Hex

* `anyToHex(data: any = Buffer.alloc(0), options: IAnyToHexOptions = {}): string`
* `prepareHex(hex: string, options: IPrepareHexOptions = {}): string`

### JSON

* `jsonReplacer(key: string, value: any): any`
* `jsonReviver(key: any, value: any): any`

### Signing

* `hashPersonalMessage(message: Buffer | string): Buffer`
* `signPersonalMessage(message: Buffer | string, privateKey: Buffer): Buffer`
* `recoverPublicKeyFromPersonalMessage(message: Buffer | string, signature: Buffer | string): Buffer`
* `recoverAddressFromPersonalMessage(message: Buffer | string, signature: Buffer | string): string`
* `getMethodSignature(name: string, ...args: string[]): Buffer`

### Units

* `convertUnit(value: number | BN, from: Units = Units.Wei, to: Units = Units.Ether): BN`
* `ethToWei(value: number): BN`
* `weiToEth(value: BN): number`

## License

The MIT License

[npm-image]: https://badge.fury.io/js/%40netgum%2Futils.svg
[npm-url]: https://npmjs.org/package/@netgum/utils

