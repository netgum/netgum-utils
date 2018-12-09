import { publicKeyConvert } from 'secp256k1';
import { sha3 } from '../crypto';
import { abiEncodePacked } from '../abi';
import { privateToPublicKey, verifyPublicKey } from '../ecdsa';
import { anyToHex } from '../hex';
import { ZERO_ADDRESS } from './constatnts';

/**
 * computes CREATE2 address
 * @param deployer
 * @param salt
 * @param byteCode
 */
export function computeCreate2Address(deployer: string, salt: string | number | Buffer, byteCode: Buffer | string): string {
  const payload = abiEncodePacked(
    'bytes',
    'address',
    'bytes32',
    'bytes',
  )(
    '0xFF',
    deployer,
    salt,
    sha3(byteCode),
  );

  return anyToHex(sha3(payload).slice(-20), {
    add0x: true,
  });
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
