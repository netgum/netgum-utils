import { recover, publicKeyVerify, sign } from "secp256k1";
import { publicKeyToAddress } from "../address";
import { anyToBuffer } from "../buffer";
import { sha3 } from "../crypto";

/**
 * hashes personal message
 * @param message
 */
export function hashPersonalMessage(message: Buffer | string): Buffer {
  return sha3(
    anyToBuffer("\x19Ethereum Signed Message:\n32"),
    sha3(message),
  );
}

/**
 * signs personal message
 * @param message
 * @param privateKey
 */
export function signPersonalMessage(message: Buffer | string, privateKey: Buffer): Buffer {
  const hash = hashPersonalMessage(message);
  const { recovery, signature } = sign(hash, privateKey);

  return Buffer.concat([
    signature,
    anyToBuffer(recovery + 27),
  ]);
}

/**
 * recovers public key from personal message
 * @param message
 * @param signature
 */
export function recoverPublicKeyFromPersonalMessage(message: Buffer | string, signature: Buffer | string): Buffer {
  const hash = hashPersonalMessage(message);
  const signatureBuff = anyToBuffer(signature);
  const s = signatureBuff.slice(0, -1);
  const r = signatureBuff[ signatureBuff.length - 1 ] - 27;

  let result: Buffer = null;

  try {
    const publicKey = recover(
      hash,
      s,
      r,
      false,
    );

    result = publicKeyVerify(publicKey) ? publicKey : null;
  } catch (err) {
    result = null;
  }

  return result;
}

/**
 * recovers address from personal message
 * @param message
 * @param signature
 */
export function recoverAddressFromPersonalMessage(message: Buffer | string, signature: Buffer | string): string {
  const publicKey = recoverPublicKeyFromPersonalMessage(message, signature);
  return publicKey ? publicKeyToAddress(publicKey) : null;
}

/**
 * gets method signature
 * @param name
 * @param args
 */
export function getMethodSignature(name: string, ...args: string[]): Buffer {
  return sha3(`${name}(${args.join(",")})`).slice(0, 4);
}
