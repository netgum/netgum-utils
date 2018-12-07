import { publicKeyToAddress } from './address';
import { anyToBuffer } from './buffer';
import { privateToPublicKey } from './ecdsa';
import {
  signPersonalMessage,
  recoverAddressFromPersonalMessage,
  recoverPublicKeyFromPersonalMessage,
} from './signing';

describe('signing', () => {

  const privateKey = anyToBuffer('0x550af64623d8e67007e4d098a9616edf4c873129f9581763947eca2e8a07ba0c');
  const publicKey = privateToPublicKey(privateKey);
  const address = publicKeyToAddress(publicKey);

  const message = anyToBuffer('0x010203');
  const signature = anyToBuffer(
    '0xa7c69c39e7b7276fb76c1b452e5e6f33a37ce82a16b9b2963acd2af0bc18742b78a24319c9eca86168725a442da14b8f81d53a7056f2970c66525044c9973c131c',
  );

  describe('signPersonalMessage()', () => {

    it('should sign personal message', () => {
      expect(signPersonalMessage(message, privateKey)).toEqual(signature);
    });
  });

  describe('recoverAddressFromPersonalMessage()', () => {

    it('should recover address from personal message', () => {
      expect(recoverAddressFromPersonalMessage(message, signature)).toBe(address);
    });
  });

  describe('recoverPublicKeyFromPersonalMessage()', () => {

    it('should recover public key from personal message', () => {
      expect(recoverPublicKeyFromPersonalMessage(message, signature)).toEqual(publicKey);
    });
  });
});
