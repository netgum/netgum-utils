import { sha3 } from './crypto';

describe('crypto', () => {

  describe('sha3()', () => {

    it('should hash one arg', () => {
      const buff = Buffer.from([0x01, 0x01]);
      const hash = sha3(buff);
      expect(hash.equals(Buffer.from('4535a04e923af75e64a9f6cdfb922004b40beec0649d36cf6ea095b7c4975cae', 'hex'))).toBeTruthy();
    });

    it('should hash many args', () => {
      const buff1 = Buffer.from([0x01, 0x02]);
      const buff2 = Buffer.from([0x03, 0x04]);
      const hash = sha3(buff1, buff2);

      expect(hash.equals(Buffer.from('a6885b3731702da62e8e4a8f584ac46a7f6822f4e2ba50fba902f67b1588d23b', 'hex'))).toBeTruthy();
    });
  });
});
