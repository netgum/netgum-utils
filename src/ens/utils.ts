import 'unorm';
import { toAscii } from 'idna-uts46-hx';
import { sha3 } from '../crypto';
import { anyToHex } from '../hex';
import { ENS_NAME_SEPARATOR } from './constatnts';
import { IEnsNameInfo } from './interfaces';

/**
 * normalizes ens name
 * @param parts
 */
export function normalizeEnsName(...parts: string[]): string {
  let result: string = null;

  let name = parts
    .filter(part => !!part)
    .join(ENS_NAME_SEPARATOR)
    .split(ENS_NAME_SEPARATOR)
    .map(part => part.toLowerCase().trim())
    .filter(part => !!part)
    .join(ENS_NAME_SEPARATOR);

  if (name) {
    try {
      name = toAscii(name.toLowerCase(), {
        transitional: true,
        useStd3ASCII: true,
      });
    } catch (err) {
      name = null;
    }

    if (name) {
      result = name;
    }
  }

  return result;
}

/**
 * get ens mame info
 * @param parts
 */
export function getEnsNameInfo(...parts: string[]): IEnsNameInfo {
  let result: IEnsNameInfo = null;

  const name = normalizeEnsName(...parts);

  if (name) {

    result = {
      name,
      nameHash: getEnsNameHash(name),
      label: null,
      labelHash: null,
      rootNode: null,
    };

    const parts = name.split(ENS_NAME_SEPARATOR);

    if (parts.length > 1) {
      const label = parts[0];
      const name = parts.slice(1).join(ENS_NAME_SEPARATOR);

      if (label && name) {
        result = {
          ...result,
          label,
          labelHash: getEnsLabelHash(label),
          rootNode: {
            name,
            nameHash: getEnsNameHash(name),
          },
        };
      }
    }
  }

  return result;
}

/**
 * gets ens name hash
 * @param name
 */
export function getEnsNameHash(name: string): string {
  let result: string = null;

  if (name) {
    let node = Buffer.alloc(32, 0);
    const parts = name
      .split(ENS_NAME_SEPARATOR)
      .map(part => sha3(part))
      .reverse();

    for (const part of parts) {
      node = sha3(node, part);
    }

    result = anyToHex(node, { add0x: true });
  }

  return result;
}

/**
 * gets ens label hash
 * @param label
 */
export function getEnsLabelHash(label: string): string {
  let result: string = null;

  if (label) {
    result = anyToHex(sha3(label), { add0x: true });
  }

  return result;
}
