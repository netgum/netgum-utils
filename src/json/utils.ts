import BN, { IBN } from 'bn.js';
import { JsonTypes } from './constants';

/**
 * json replacer
 * @param key
 * @param value
 */
export function jsonReplacer(key: string, value: any): any {
  const data = this[key];

  if (data instanceof Date) {
    value = {
      type: JsonTypes.Date,
      data: data.getTime(),
    };
  } else if (Buffer.isBuffer(data)) {
    value = {
      type: JsonTypes.Buffer,
      data: (data as Buffer).toString('hex'),
    };
  } else if (BN.isBN(data)) {
    value = {
      type: JsonTypes.BN,
      data: (data as IBN).toString(16),
    };
  }

  return value;
}

/**
 * json reviver
 * @param key
 * @param value
 */
export function jsonReviver(key: any, value: any): any {
  if (
    value &&
    typeof value === 'object' &&
    value.type
  ) {
    switch (value.type) {
      case JsonTypes.Buffer:
        value = Buffer.from(value.data, 'hex');
        break;
      case JsonTypes.BN:
        value = new BN(value.data, 16);
        break;
      case JsonTypes.Date:
        value = new Date(value.data);
        break;
    }
  }
  return value;
}
