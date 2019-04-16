import BN, { IBN } from 'bn.js';
import { prepareHex } from '../hex';
import { IAnyToBNOptions } from './interfaces';

/**
 * converts any to BN
 * @param data
 * @param options
 */
export function anyToBN(data: any = 0, options: IAnyToBNOptions = {}): IBN {
  options = {
    defaults: null,
    ...options,
  };

  let result: IBN = options.defaults;

  switch (typeof data) {
    case 'number':
      result = new BN(data as number, 10);
      break;

    case 'string':
      const hex = prepareHex(data as string);
      if (hex) {
        result = new BN(hex, 16);
      }
      break;

    case 'object':
      if (BN.isBN(data)) {
        result = data;
      } else if (Buffer.isBuffer(data)) {
        result = new BN((data as Buffer).toString('hex'), 16);
      }
      break;
  }

  return result;
}
