import * as BN from 'bn.js';
import { randomBytes } from 'crypto';
import { anyToHex } from './hex';

describe('hex', () => {

  describe('anyToHex()', () => {

    it('should converts number to hex', () => {
      const hex = anyToHex(256);
      expect(hex).toBe('100');
    });

    it('should converts number to hex with length 3', () => {
      const hex = anyToHex(256, {
        length: 6,
      });
      expect(hex.endsWith('100')).toBeTruthy();
      expect(hex.length).toBe(6);
    });

    it('should converts number to hex with 0x prefix', () => {
      const hex = anyToHex(256, {
        add0x: true,
      });
      expect(hex).toBe('0x100');
    });

    it('should converts hex to hex', () => {
      const hex = anyToHex('0x010203');
      expect(hex).toBe('010203');
    });

    it('should converts string to hex', () => {
      const hex = anyToHex('ABC');
      expect(hex).toBe('414243');
    });

    it('should converts bn to hex', () => {
      const hex = anyToHex(new BN(256, 10));
      expect(hex).toBe('100');
    });

    it('should converts buffer to hex', () => {
      const data = randomBytes(10);
      const hex = anyToHex(data);
      expect(hex).toBe(data.toString('hex'));
    });

    it('should converts undefined to hex', () => {
      const hex = anyToHex();
      expect(hex).toBe('');
    });
  });
});
