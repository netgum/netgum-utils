import { Buffer } from 'buffer';
import * as BN from 'bn.js';
import { jsonReplacer, jsonReviver, JsonTypes } from './json';

describe('json', () => {

  describe('jsonReplacer()', () => {

    it('should replace Buffer, BN, Date objects', () => {
      const now = Date.now();
      const json = JSON.stringify({
        a: Buffer.alloc(1, 0x31),
        b: new BN(0x123),
        c: new Date(now),
      }, jsonReplacer);

      const data = JSON.parse(json);

      expect(data.a.type).toBe(JsonTypes.Buffer);
      expect(data.a.data).toBe('31');
      expect(data.b.type).toBe(JsonTypes.BN);
      expect(data.b.data).toBe('123');
      expect(data.c.type).toBe(JsonTypes.Date);
      expect(data.c.data).toBe(now);
    });
  });

  describe('jsonReviver()', () => {

    it('should encode Buffer, BN, Date objects', () => {
      const json = `{"a":{"type":"Buffer","data":"31"},"b":{"type":"BN","data":"123"},"c":{"type":"Date","data":1537529109025}}`;

      const data = JSON.parse(json, jsonReviver);

      expect(Buffer.isBuffer(data.a));
      expect(BN.isBN(data.b));
      expect(data.c).toBeInstanceOf(Date);
    });
  });
});
