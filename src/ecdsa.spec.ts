import { generateRandomPrivateKey } from "./ecdsa";
import { privateKeyVerify } from "secp256k1";

describe("ecdsa", () => {

  describe("generateRandomPrivateKey()", () => {

    it("should generates random private key", () => {
      const privateKey = generateRandomPrivateKey();

      expect(privateKey.length).toBe(32);
      expect(privateKeyVerify(privateKey)).toBeTruthy();
    });
  });
});
