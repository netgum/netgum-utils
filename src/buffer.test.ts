import BN from 'bn.js';
import { randomBytes } from 'crypto';
import { anyToBuffer } from './buffer';

describe('buffer', () => {

  describe('anyToBuffer()', () => {

    it('should converts number to buffer', () => {
      const buff = anyToBuffer(256);
      expect(buff.equals(Buffer.from([0x01, 0x00]))).toBeTruthy();
    });

    it('should converts number to buffer with size 3', () => {
      const buff = anyToBuffer(256, {
        size: 3,
      });
      expect(buff.equals(Buffer.from([0x00, 0x01, 0x00]))).toBeTruthy();
    });

    it('should converts hex to buffer', () => {
      const buff = anyToBuffer('0x010203');
      expect(buff.equals(Buffer.from([0x01, 0x02, 0x03]))).toBeTruthy();
    });

    it('should converts string to buffer', () => {
      const buff = anyToBuffer('ABC');
      expect(buff.equals(Buffer.from([0x41, 0x42, 0x43]))).toBeTruthy();
    });

    it('should converts bn to buffer', () => {
      const buff = anyToBuffer(new BN(256, 10));
      expect(buff.equals(Buffer.from([0x01, 0x00]))).toBeTruthy();
    });

    it('should converts buffer to buffer', () => {
      const data = randomBytes(10);
      const buff = anyToBuffer(data);
      expect(buff.equals(data)).toBeTruthy();
    });

    it('should converts undefined to buffer', () => {
      const buff = anyToBuffer();
      expect(buff.equals(Buffer.alloc(0))).toBeTruthy();
    });
  });
});
