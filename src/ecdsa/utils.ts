import { randomBytes } from 'crypto';
import { publicKeyVerify, privateKeyVerify, publicKeyCreate } from 'secp256k1';

/**
 * verifies public key
 * @param publicKey
 */
export function verifyPublicKey(publicKey: Buffer): boolean {
  return (
    publicKey &&
    Buffer.isBuffer(publicKey) &&
    publicKeyVerify(publicKey)
  );
}

/**
 * verifies private key
 * @param privateKey
 */
export function verifyPrivateKey(privateKey: Buffer): boolean {
  return (
    privateKey &&
    Buffer.isBuffer(privateKey) &&
    privateKeyVerify(privateKey)
  );
}

/**
 * converts private To public key
 * @param privateKey
 */
export function privateToPublicKey(privateKey: Buffer): Buffer {
  let result: Buffer = null;

  if (verifyPrivateKey(privateKey)) {
    result = publicKeyCreate(privateKey, false);
  }

  return result;
}

/**
 * generates random private key
 */
export function generateRandomPrivateKey(): Buffer {
  let result: Buffer;
  for (; ;) {
    result = randomBytes(32) as Buffer;
    if (verifyPrivateKey(result)) {
      break;
    }
  }

  return result;
}
