import { verifyAddress, convertAddress, ZERO_ADDRESS } from './address';

describe('address', () => {

  const address = '0x26f4138c2474ecc5595e315500a15ed6fb2acde4';
  const addressWithChecksum = '0x26F4138C2474Ecc5595E315500A15ed6Fb2ACdE4';

  describe('verifyAddress()', () => {
    it('expect return true when address is valid', () => {
      expect(verifyAddress(address, false))
        .toBeTruthy();
      expect(verifyAddress(addressWithChecksum, true))
        .toBeTruthy();
    });

    it('expect return false when address is invalid', () => {
      expect(verifyAddress(ZERO_ADDRESS))
        .toBeFalsy();
      expect(verifyAddress(address, true))
        .toBeFalsy();
    });
  });

  describe('convertAddress()', () => {
    it('should convert address', () => {
      expect(convertAddress(address))
        .toBe(addressWithChecksum);
    });
  });
});
