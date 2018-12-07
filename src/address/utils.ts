import { publicKeyConvert } from 'secp256k1';
import { sha3 } from '../crypto';
import { privateToPublicKey, verifyPublicKey } from '../ecdsa';
import { anyToHex } from '../hex';
import { ZERO_ADDRESS } from './constatnts';

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
 * prepares address
 * @param address
 */
export function prepareAddress(address: string | Buffer): string {
  let result = anyToHex(address, {
    add0x: true,
    length: 40,
  });

  if (result === ZERO_ADDRESS) {
    result = null;
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
      result = anyToHex(sha3(publicKey.slice(1)).slice(-20), {
        add0x: true,
      });
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
