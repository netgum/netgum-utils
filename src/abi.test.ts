import { abiEncodePacked } from './abi';

describe('abi', () => {

  describe('abiEncodePacked()', () => {

    it('should returns valid message', () => {
      const message = abiEncodePacked('bool', 'uint256', 'uint32')(true, 10, 12);

      expect(message.toString('hex'))
        .toBe('01000000000000000000000000000000000000000000000000000000000000000a0000000c');
    });
  });
});
