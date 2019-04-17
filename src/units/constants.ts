import BN from 'bn.js';

export enum Units {
  Wei = 'Wei',
  Kwei = 'Kwei',
  Mwei = 'Mwei',
  Gwei = 'Gwei',
  Szabo = 'Szabo',
  Finney = 'Finney',
  Ether = 'Ether',
}

const base = new BN(10);

export const unitsPow: { [key: string]: BN } = {
  [Units.Wei]: new BN(1),
  [Units.Kwei]: base.pow(new BN(3)),
  [Units.Mwei]: base.pow(new BN(6)),
  [Units.Gwei]: base.pow(new BN(9)),
  [Units.Szabo]: base.pow(new BN(12)),
  [Units.Finney]: base.pow(new BN(15)),
  [Units.Ether]: base.pow(new BN(18)),
};
