import { publicKeyConvert } from 'secp256k1';
import { abiEncodePacked } from '../abi';
import { anyToBuffer } from '../buffer';
import { sha3 } from '../crypto';
import { privateToPublicKey, verifyPublicKey } from '../ecdsa';
import { ZERO_ADDRESS } from './constatnts';

/**
 * to checksum address
 * @param address
 */
export function toChecksumAddress(address: string): string {
  address = address.toLowerCase();

  if (address.startsWith('0x')) {
    address = address.slice(2);
  }

  const hash = sha3(address).toString('hex');
  const chars = address
    .split('')
    .map((char, index) => parseInt(hash[index], 16) >= 8
      ? char.toUpperCase()
      : char,
    );
  return `0x${chars.join('')}`;
}

/**
 * converts buffer to address
 * @param buff
 */
export function bufferToAddress(buff: Buffer): string {
  return toChecksumAddress(buff.toString('hex'));
}

/**
 * computes CREATE2 address
 * @param deployer
 * @param salt
 * @param byteCodeHash
 */
export function computeCreate2Address(deployer: string, salt: string | number | Buffer, byteCodeHash: Buffer | string): string {
  const payload = abiEncodePacked(
    'bytes',
    'address',
    'bytes32',
    'bytes',
  )(
    '0xff',
    deployer,
    salt,
    byteCodeHash,
  );

  return bufferToAddress(sha3(payload).slice(-20));
}

/**
 * verifies address
 * @param address
 * @param checksum
 */
export function verifyAddress(address: string, checksum: boolean = true): boolean {
  let result: boolean = false;

  if (
    address &&
    /^(0x)?[0-9a-fA-F]{40}$/i.test(address) &&
    address !== ZERO_ADDRESS
  ) {
    if (checksum) {
      result = address === toChecksumAddress(address);
    } else {
      result = true;
    }
  }

  return result;
}

/**
 * converts target to address
 * @param target
 */
export function targetToAddress(target: any): string {
  let result: string = null;

  switch (typeof target) {
    case 'string':
      result = (target as string) || null;
      break;

    case 'object':
      if (target && typeof target.address === 'string') {
        result = target.address || null;
      }
      break;
  }

  return result;
}

/**
 * convert address
 * @param address
 */
export function convertAddress(address: string): string {
  let result: string = null;

  const buff = anyToBuffer(address);

  if (buff && buff.length === 20) {
    result = bufferToAddress(buff);
  }

  return result;
}

/**
 * converts public key to address
 * @param publicKey
 */
export function publicKeyToAddress(publicKey: Buffer): string {
  let result: string = null;

  try {
    publicKey = publicKeyConvert(publicKey, false);
    if (verifyPublicKey(publicKey)) {
      result = bufferToAddress(sha3(publicKey.slice(1)).slice(-20));
    }

  } catch (err) {
    result = null;
  }

  return result;
}

/**
 * converts private key to address
 * @param privateKey
 */
export function privateKeyToAddress(privateKey: Buffer): string {
  let result: string = null;

  try {
    const publicKey = privateToPublicKey(privateKey);

    if (publicKey) {
      result = publicKeyToAddress(publicKey);
    }

  } catch (err) {
    result = null;
  }

  return result;
}
