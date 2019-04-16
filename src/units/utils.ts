import BN, { IBN } from 'bn.js';
import { Units, unitsPow } from './constants';

/**
 * converts unit
 * @param value
 * @param from
 * @param to
 */
export function convertUnit(value: number | IBN, from: Units = Units.Wei, to: Units = Units.Ether): IBN {
  let result: IBN = null;

  if (typeof value === 'number') {
    value = new BN(value, 10);
  }

  if (from === to) {
    result = value;
  } else {

    try {
      const fromPow = unitsPow[from];
      const toPow = unitsPow[to];

      if (fromPow.gt(toPow)) {
        result = value.mul(fromPow.div(toPow));
      } else {
        result = value.div(toPow.div(fromPow));
      }
    } catch (err) {
      result = null;
    }

  }

  return result;
}

/**
 * converts eth to wei
 * @param value
 */
export function ethToWei(value: number): IBN {
  value = Math.floor(value * Math.pow(10, 6));
  return convertUnit(value, Units.Szabo, Units.Wei);
}

/**
 * converts wei to eth
 * @param value
 */
export function weiToEth(value: IBN): number {
  value = convertUnit(value, Units.Wei, Units.Szabo);
  return value.toNumber() / Math.pow(10, 6);
}
