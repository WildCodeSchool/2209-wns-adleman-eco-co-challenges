describe("Dumb Tests", () => {
  describe("1 is egal to 1", () => {
    it("should return true", async () => {
      expect(1).toBe(1);
      expect(2).not.toBe(1);
    });
  });
});
