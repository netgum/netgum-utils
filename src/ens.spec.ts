import { getEnsNameInfo, getEnsNameHash, getEnsLabelHash } from "./ens";

describe("ens", () => {

  describe("getEnsNameInfo()", () => {

    it("should returns valid name info", () => {
      const info = getEnsNameInfo("example.block.eth");
      expect(info.name).toBe("example.block.eth");
      expect(info.label).toBe("example");
      expect(info.rootNode.name).toBe("block.eth");
    });
  });

  describe("getEnsNameHash()", () => {

    it("should returns valid hash", () => {
      expect(getEnsNameHash("block.eth"))
        .toBe("0xc34238dd60f46fdcf06e8f1ed5fd0502afdbbaf752a705ce0f2716e5ed831554");
    });

    it("should returns null for empty name", () => {
      expect(getEnsNameHash(""))
        .toBeNull();
    });
  });

  describe("getEnsLabelHash()", () => {

    it("should returns valid hash", () => {
      expect(getEnsLabelHash("block"))
        .toBe("0x20b53acf0daefc8c6ad68c861fb3b543ca541abd101abc1edfcbf6606b838ef4");
    });

    it("should returns valid hash for empty name", () => {
      expect(getEnsLabelHash(""))
        .toBeNull();
    });
  });
});
