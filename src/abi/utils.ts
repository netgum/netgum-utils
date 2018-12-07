import { anyToBuffer } from '../buffer';

/**
 * abi encode packed
 * @param types
 */
export function abiEncodePacked(...types: string[]): (...args: any[]) => Buffer {
  return (...args) => {
    if (types.length !== args.length) {
      return null;
    }

    const buffers: Buffer[] = [];

    for (const index in types) {
      if (typeof args[index] !== 'undefined') {
        const type = types[index];
        const arg = args[index];
        switch (type) {
          case 'bool':
            buffers.push(anyToBuffer(!!arg));
            break;

          case 'address':
            buffers.push(anyToBuffer(arg, {
              size: 20,
            }));
            break;

          case 'bytes':
          case 'string':
            buffers.push(anyToBuffer(arg));
            break;

          default:
            const matched = type.match(/\d+/g);
            let size = Array.isArray(matched) && matched.length
              ? parseInt(matched[0], 10)
              : 0;

            if (
              size &&
              size % 8 === 0
            ) {
              size = parseInt(matched[0], 10) / 8;

              buffers.push(anyToBuffer(arg, {
                size,
              }));
            } else {
              return null;
            }
        }

      } else {
        return null;
      }
    }

    return Buffer.concat(buffers);
  };
}
