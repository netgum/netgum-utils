import * as BN from "bn.js";
import { prepareHex } from "../hex";
import { IAnyToBufferOptions } from "./interfaces";

/**
 * converts any to buffer
 * @param data
 * @param options
 */
export function anyToBuffer(data: any = Buffer.alloc(0), options: IAnyToBufferOptions = {}): Buffer {
  options = {
    size: 0,
    autoStringDetect: false,
    defaults: Buffer.alloc(0),
    ...options,
  };

  let result: Buffer = options.defaults;

  switch (typeof data) {
    case "number": {
      let hex = (data as number).toString(16);
      if (hex.length % 2) {
        hex = `0${hex}`;
      }
      result = Buffer.from(hex, "hex");
      break;
    }

    case "string":
      const hex = ((data as string).startsWith("0x") || options.autoStringDetect)
        ? prepareHex(data, { evenLength: true })
        : null;

      if (hex) {
        result = Buffer.from(hex, "hex");
      } else {
        result = Buffer.from(data, "utf8");
      }
      break;

    case "boolean":
      result = Buffer.alloc(1, data ? 1 : 0);
      break;

    case "object":
      if (Buffer.isBuffer(data)) {
        result = data;
      } else if (BN.isBN(data)) {
        const hex = prepareHex((data as BN.IBN).toString(16), { evenLength: true });
        result = Buffer.from(hex, "hex");
      } else if (data instanceof Uint8Array) {
        result = Buffer.from([
          ...data,
        ]);
      }
      break;
  }

  if (
    Buffer.isBuffer(result) &&
    options.size > result.length
  ) {
    result = Buffer.concat([
      Buffer.alloc(options.size - result.length, 0),
      result,
    ]);
  }

  return result;
}
