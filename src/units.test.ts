import { Units, convertUnit } from './units';

describe('units', () => {

  describe('convertUnit()', () => {

    it('should converts Wei to Kwei', () => {
      expect(convertUnit(2123, Units.Wei, Units.Kwei).toNumber()).toBe(2);
    });

    it('should converts Ether to Szabo', () => {
      expect(convertUnit(1, Units.Ether, Units.Szabo).toNumber()).toBe(1000000);
    });
  });
});
