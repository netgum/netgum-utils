import * as BN from "bn.js";
import { IAnyToHexOptions, IPrepareHexOptions } from "./interfaces";

/**
 * converts any to hex
 * @param data
 * @param options
 */
export function anyToHex(data: any = Buffer.alloc(0), options: IAnyToHexOptions = {}): string {
  options = {
    length: 0,
    add0x: false,
    autoStringDetect: false,
    evenLength: false,
    defaults: null,
    ...options,
  };

  let result: string = options.defaults;

  if (data) {
    switch (typeof data) {
      case "number":
        result = (data as number).toString(16);
        break;

      case "string":
        result = ((data as string).startsWith("0x") || options.autoStringDetect)
          ? prepareHex(data)
          : null;

        if (!result) {
          result = Buffer.from(data, "utf8").toString("hex");
        }
        break;

      case "boolean":
        result = data ? "1" : "0";
        break;

      case "object":
        if (Buffer.isBuffer(data)) {
          result = (data as Buffer).toString("hex");
        } else if (BN.isBN(data)) {
          result = (data as BN.IBN).toString(16);
        } else if (data instanceof Uint8Array) {
          result = Buffer.from([
            ...data,
          ]).toString("hex");
        }
        break;
    }
  }

  if (typeof result === "string") {
    result = result.toLowerCase();

    if (options.length > result.length) {
      result = `${"0".repeat(options.length - result.length)}${result}`;
    }

    if (options.evenLength && result.length % 2) {
      result = `0${result}`;
    }

    if (options.add0x) {
      result = `0x${result}`;
    }
  }

  return result;
}

/**
 * prepares hex
 * @param hex
 * @param options
 */
export function prepareHex(hex: string, options: IPrepareHexOptions = {}): string {
  options = {
    evenLength: false,
    add0x: false,
    ...options,
  };

  let result: string = null;

  hex = hex.toLowerCase();

  if (hex.startsWith("0x")) {
    hex = hex.slice(2);
  }

  try {
    const data = (hex.length % 2) ? `0${hex}` : hex;
    if (Buffer.from(data, "hex")) {
      result = options.evenLength ? data : hex;
    }
  } catch (err) {
    result = null;
  }

  if (
    typeof result === "string" &&
    options.add0x
  ) {
    result = `0x${result}`;
  }

  return result;
}
